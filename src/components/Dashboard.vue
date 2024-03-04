<template>
  <div class="flex justify-end">
    <!-- Logout button -->
    <button
      @click="logout"
      class="mt-4 mr-8 bg-red-500 text-white p-2 rounded hover:bg-red-600 ml-4"
    >
      Logout
    </button>
  </div>
  <div class="flex flex-col items-center justify-center p-10">
    <div class="bg-white p-8 rounded shadow-md mb-4 w-full mt-8 flex gap-4">
      <div class="w-full">
        <h2 class="text-lg font-bold mb-4">Waktu Sholat</h2>
        <form @submit.prevent="submitFormSholat">
          <div>
            <label
              for="subuh"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Subuh</label
            >
            <input
              type="text"
              id="subuh"
              v-model="sholat.fajr"
              class="w-full h-10 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Waktu dengan format HH:MM"
            />
          </div>
          <div>
            <label
              for="dzuhur"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Dzuhur</label
            >
            <input
              type="text"
              id="dzuhur"
              v-model="sholat.dhuhr"
              class="w-full h-10 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Waktu dengan format HH:MM"
            />
          </div>
          <div>
            <label
              for="ashar"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Ashar</label
            >
            <input
              type="text"
              id="ashar"
              v-model="sholat.asr"
              class="w-full h-10 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Waktu dengan format HH:MM"
            />
          </div>
          <div>
            <label
              for="maghrib"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Maghrib</label
            >
            <input
              type="text"
              id="maghrib"
              v-model="sholat.maghrib"
              class="w-full h-10 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Waktu dengan format HH:MM"
            />
          </div>
          <div>
            <label for="isya" class="block text-gray-700 text-sm font-bold mb-2"
              >Isya</label
            >
            <input
              type="text"
              id="isya"
              v-model="sholat.isha"
              class="w-full h-10 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Waktu dengan format HH:MM"
            />
          </div>

          <button
            type="submit"
            class="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Ubah
          </button>
        </form>
      </div>
      <div class="w-full">
        <h2 class="text-lg font-bold mb-4">Running Text</h2>
        <form>
          <label
            for="runningText"
            class="block text-gray-700 text-sm font-bold mb-2"
            >Running Text</label
          >
          <input
            type="text"
            id="runningText"
            v-model="runningText"
            class="w-full h-10 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter your running text"
          />

          <!-- Add more form fields as needed -->

          <button
            type="submit"
            class="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>

    <!-- Editable table -->
    <div class="bg-white p-4 rounded shadow-md w-full flex gap-4">
      <div class="w-full">
        <h2 class="text-lg font-bold mb-4">Penceramah Subuh</h2>
        <table class="w-full">
          <thead>
            <tr>
              <th class="py-2">Penceramah</th>
              <th class="py-2">Waktu</th>
              <th class="py-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(entry, index) in schedule_fajr" :key="index">
              <td>
                <input v-model="entry.lecturer" class="w-full border px-2" />
              </td>
              <td>
                <input v-model="entry.date" class="w-full border px-2" />
              </td>
              <td>
                <button
                  @click="editEntry(entry.id, entry.lecturer, entry.date)"
                  class="text-blue-500"
                >
                  Ubah
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="w-full">
        <h2 class="text-lg font-bold mb-4">Penceramah Jumat</h2>
        <table class="w-full">
          <thead>
            <tr>
              <th class="py-2">Penceramah</th>
              <th class="py-2">Waktu</th>
              <th class="py-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(entry, index) in schedule_jumah" :key="index">
              <td>
                <input v-model="entry.lecturer" class="w-full border px-2" />
              </td>
              <td>
                <input v-model="entry.date" class="w-full border px-2" />
              </td>
              <td>
                <button
                  @click="editEntry(entry.id, entry.lecturer, entry.date)"
                  class="text-blue-500"
                >
                  Ubah
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          @click="addEntry"
          class="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 hidden"
        >
          Tambah Baru
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      runningText: "",
      sholat: {
        fajr: "",
        dhuhr: "",
        asr: "",
        maghrib: "",
        isha: "",
      },
      // Add more data properties as needed
      schedule_fajr: [{ id: "", lecturer: "", date: "" }],
      schedule_jumah: [{ id: "", lecturer: "", date: "" }],
    };
  },
  mounted() {
    this.getPenceramahSubuh();
    this.getPenceramahJumat();
    this.getSholat();
  },
  methods: {
    getPenceramahSubuh: async function () {
      let { data } = await this.$store.state.database
        .from("penceramah_subuh")
        .select("*")
        .order("id");
      this.schedule_fajr = data;
    },
    getPenceramahJumat: async function () {
      let { data } = await this.$store.state.database
        .from("penceramah_jumat")
        .select("*")
        .order("id");
      this.schedule_jumah = data;
    },
    getSholat: async function () {
      let { data } = await this.$store.state.database
        .from("pray_time")
        .select("*")
        .order("id");
      this.sholat = {
        fajr: data[2].exact_time,
        dhuhr: data[3].exact_time,
        asr: data[4].exact_time,
        maghrib: data[5].exact_time,
        isha: data[6].exact_time,
      };
    },
    updatePenceramahSubuh: async function (id, lecturer, date) {
      const { error } = await this.$store.state.database
        .from("penceramah_subuh")
        .update({ lecturer, date })
        .eq("id", id)
        .select();
      if (error) {
        this.toast.error(error);
      } else {
        await this.getPenceramahSubuh();
        this.toast.success("Sukses merubah data");
      }
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
    addEntry() {
      this.schedule_fajr.push({ lecturer: "", time: "" });
    },
    async editEntry(index, lecturer, date) {
      await this.updatePenceramahSubuh(index, lecturer, date);
    },
    async submitFormSholat() {
      let errorMessage = "";
      for (let s in this.sholat) {
        console.log(this.sholat[s])
        const { error } = await this.$store.state.database
          .from("pray_time")
          .update({ exact_time: this.sholat[s] })
          .eq("time", s)
          .select();
        if (error) {
          errorMessage = error;
        }
      }

      if (errorMessage) {
        this.toast.error(errorMessage);
      } else {
        this.toast.success('Berhasil Merubah Data')
        this.getSholat();
      }
    },
  },
};
</script>

<style scoped></style>
