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
        <h2 class="text-lg font-bold mb-4">Waktu Sholat (Jam | Menit menuju Iqomah)</h2>
        <form @submit.prevent="submitFormSholat">
          <div>
            <label
              for="subuh"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Subuh</label
            >
            <div class="flex items-center gap-2">
              <input
                type="text"
                id="subuh"
                v-model="sholat.fajr"
                class="w-full h-10 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Waktu dengan format HH:MM"
              />
              <input
                type="text"
                id="iqomahsubuh"
                v-model="iqomah.fajr"
                class="w-full h-10 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Waktu dengan format HH:MM"
              />
            </div>
          </div>
          <div>
            <label
              for="syuruq"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Syuruq</label
            >
            <input
              type="text"
              id="syuruq"
              v-model="sholat.sunrise"
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
            <div class="flex items-center gap-2">
              <input
                type="text"
                id="dzuhur"
                v-model="sholat.dhuhr"
                class="w-full h-10 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Waktu dengan format HH:MM"
              />
              <input
                type="text"
                id="iqomahdzuhur"
                v-model="iqomah.dhuhr"
                class="w-full h-10 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Waktu dengan format HH:MM"
              />
            </div>
          </div>
          <div>
            <label
              for="ashar"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Ashar</label
            >
            <div class="flex items-center gap-2">
              <input
                type="text"
                id="ashar"
                v-model="sholat.asr"
                class="w-full h-10 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Waktu dengan format HH:MM"
              />
              <input
                type="text"
                id="iqomahashar"
                v-model="iqomah.asr"
                class="w-full h-10 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Waktu dengan format HH:MM"
              />
            </div>
          </div>
          <div>
            <label
              for="maghrib"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Maghrib</label
            >
            <div class="flex items-center gap-2">
              <input
                type="text"
                id="maghrib"
                v-model="sholat.maghrib"
                class="w-full h-10 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Waktu dengan format HH:MM"
              />
              <input
                type="text"
                id="iqomahmaghrib"
                v-model="iqomah.maghrib"
                class="w-full h-10 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Waktu dengan format HH:MM"
              />
            </div>
          </div>
          <div>
            <label for="isya" class="block text-gray-700 text-sm font-bold mb-2"
              >Isya</label
            >
            <div class="flex items-center gap-2">
              <input
                type="text"
                id="isya"
                v-model="sholat.isha"
                class="w-full h-10 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Waktu dengan format HH:MM"
              />
              <input
                type="text"
                id="iqomahisya"
                v-model="iqomah.isha"
                class="w-full h-10 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Waktu dengan format HH:MM"
              />
            </div>
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
        <h2 class="text-lg font-bold mb-4">Information</h2>
        <form @submit.prevent="submitFormInformation">
          <div v-for="(info, index) in this.information" :key="index">
            <label
              :for="info.key"
              class="block text-gray-700 text-sm font-bold mb-2"
              >{{ info.info }}</label
            >
            <input
              type="text"
              :id="info.key"
              v-model="info.detail"
              class="w-full h-10 px-3 border rounded-lg focus:outline-none focus:border-blue-500"
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
    </div>

    <!-- Editable table -->
    <div class="bg-white p-4 rounded shadow-md w-full flex gap-4 mb-4">
      <div class="w-full">
        <h2 class="text-lg font-bold mb-4">{{ ceramah_title }}</h2>
        <table class="w-full">
          <thead>
            <tr>
              <th class="py-2">Penceramah | Imam</th>
              <th class="py-2">Waktu</th>
              <th class="py-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(entry, index) in schedule_main" :key="index">
              <td>
                <input v-model="entry.lecturer" class="w-full border px-2" />
              </td>
              <td>
                <input v-model="entry.date" class="w-full border px-2" />
              </td>
              <td>
                <button
                  @click="editEntryMain(entry.id, entry.lecturer, entry.date)"
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
                  @click="editEntryJumat(entry.id, entry.lecturer, entry.date)"
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

    <div class="bg-white p-4 rounded shadow-md w-full flex gap-4">
      <div class="w-full">
        <h2 class="text-lg font-bold mb-4">Hadits</h2>
        <div v-for="(entry, index) in hadits" :key="index">
          <div>
            <textarea v-model="entry.hadits" class="w-full border px-2" />
          </div>
        </div>
        <button @click="updateHadits()" class="text-blue-500">Ubah</button>
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
      information: [],
      hadits: [],
      sholat: {
        fajr: "",
        sunrise: "",
        dhuhr: "",
        asr: "",
        maghrib: "",
        isha: "",
      },
      iqomah: {
        fajr: "",
        sunrise: "",
        dhuhr: "",
        asr: "",
        maghrib: "",
        isha: "",
      },
      // Add more data properties as needed
      schedule_main: [{ id: "", lecturer: "", date: "" }],
      schedule_jumah: [{ id: "", lecturer: "", date: "" }],
      ceramah_title: process.env.VUE_APP_CERAMAH_MAIN || "Penceramah Subuh",
    };
  },
  mounted() {
    this.getPenceramahMain();
    this.getPenceramahJumat();
    this.getSholat();
    this.getInformation();
    this.getHadits();
  },
  methods: {
    getPenceramahMain: async function () {
      let { data } = await this.$store.state.database
        .from("penceramah_subuh")
        .select("*")
        .order("id");
      this.schedule_main = data;
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
        sunrise: data[1].exact_time,
        dhuhr: data[3].exact_time,
        asr: data[4].exact_time,
        maghrib: data[5].exact_time,
        isha: data[6].exact_time,
      };
      this.iqomah = {
        fajr: data[2].iqomah,
        sunrise: data[1].iqomah,
        dhuhr: data[3].iqomah,
        asr: data[4].iqomah,
        maghrib: data[5].iqomah,
        isha: data[6].iqomah,
      };
    },
    getInformation: async function () {
      let { data } = await this.$store.state.database
        .from("information")
        .select("*")
        .order("id");
      this.information = data;
    },
    getHadits: async function () {
      let { data } = await this.$store.state.database
        .from("hadits")
        .select("*")
        .order("id");
      this.hadits = data;
    },
    updatePenceramahMain: async function (id, lecturer, date) {
      const { error } = await this.$store.state.database
        .from("penceramah_subuh")
        .update({ lecturer, date })
        .eq("id", id)
        .select();
      if (error) {
        this.toast.error(error);
      } else {
        await this.getPenceramahMain();
        this.toast.success("Sukses merubah data");
      }
    },
    updatePenceramahJumat: async function (id, lecturer, date) {
      const { error } = await this.$store.state.database
        .from("penceramah_jumat")
        .update({ lecturer, date })
        .eq("id", id)
        .select();
      if (error) {
        this.toast.error(error);
      } else {
        await this.getPenceramahJumat();
        this.toast.success("Sukses merubah data");
      }
    },
    updateHadits: async function () {
      for (let ha of this.hadits) {
        const { error } = await this.$store.state.database
          .from("hadits")
          .update({ hadits: ha.hadits })
          .eq("id", ha.id)
          .select();
        if (error) {
          this.toast.error(error);
        }
      }
      await this.getHadits();
      this.toast.success("Sukses merubah data");
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
    addEntry() {
      this.schedule_main.push({ lecturer: "", time: "" });
    },
    async editEntryMain(index, lecturer, date) {
      await this.updatePenceramahMain(index, lecturer, date);
    },
    async editEntryJumat(index, lecturer, date) {
      await this.updatePenceramahJumat(index, lecturer, date);
    },
    async submitFormSholat() {
      let errorMessage = "";
      for (let s in this.sholat) {
        const { error } = await this.$store.state.database
          .from("pray_time")
          .update({ exact_time: this.sholat[s], iqomah: this.iqomah[s] })
          .eq("time", s)
          .select();
        if (error) {
          errorMessage = error;
        }
      }

      if (errorMessage) {
        this.toast.error(errorMessage);
      } else {
        this.toast.success("Berhasil Merubah Data");
        this.getSholat();
      }
    },
    async submitFormInformation() {
      let errorMessage = "";
      for (let s in this.information) {
        const { error } = await this.$store.state.database
          .from("information")
          .update({ detail: this.information[s].detail })
          .eq("key", this.information[s].key)
          .select();
        if (error) {
          errorMessage = error;
        }
      }

      if (errorMessage) {
        this.toast.error(errorMessage);
      } else {
        this.toast.success("Berhasil Merubah Data");
        this.getSholat();
      }
    },
  },
};
</script>

<style scoped></style>
