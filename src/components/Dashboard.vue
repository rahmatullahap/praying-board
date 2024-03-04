<template>
  <!-- Logout button -->
  <button
    @click="logout"
    class="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600 ml-4"
  >
    Logout
  </button>
  <div class="min-h-screen flex flex-col items-center justify-center p-10">
    <form class="bg-white p-8 rounded shadow-md mb-4 w-full hidden">
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

    <!-- Editable table -->
    <div class="bg-white p-4 rounded shadow-md w-full">
      <h2 class="text-lg font-bold mb-4">Penceramah Subuh</h2>
      <div class="mb-4 text-red-500" v-if="errorMessage">
        {{ errorMessage }}
      </div>
      <div class="mb-4 text-green-500" v-if="successMessage">
        {{ successMessage }}
      </div>
      <table class="w-full">
        <thead>
          <tr>
            <th class="py-2">Penceramah</th>
            <th class="py-2">Waktu</th>
            <th class="py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in schedule" :key="index">
            <td>
              <input
                v-model="entry.lecturer"
                class="w-full border rounded-lg px-2"
              />
            </td>
            <td>
              <input
                v-model="entry.date"
                class="w-full border rounded-lg px-2"
              />
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
</template>

<script>
export default {
  data() {
    return {
      runningText: "",
      // Add more data properties as needed
      schedule: [
        { id: "", lecturer: "", date: "" },
        // Add more entries as needed
      ],
      errorMessage: "",
      successMessage: "",
    };
  },
  mounted() {
    this.getPenceramahSubuh();
  },
  methods: {
    getPenceramahSubuh: async function () {
      let { data: fajr_data } = await this.$store.state.database
        .from("penceramah_subuh")
        .select("*")
        .order("id");
      this.schedule = fajr_data;
    },
    updatePenceramahSubuh: async function (id, lecturer, date) {
      const { error } = await this.$store.state.database
        .from("penceramah_subuh")
        .update({ lecturer, date })
        .eq("id", id)
        .select();
      if (error) {
        this.errorMessage = error;
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      } else {
        await this.getPenceramahSubuh();
        this.successMessage = "Sukses merubah data";
        setTimeout(() => {
          this.successMessage = "";
        }, 5000);
      }
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/admin");
    },
    addEntry() {
      this.schedule.push({ lecturer: "", time: "" });
    },
    async editEntry(index, lecturer, date) {
      await this.updatePenceramahSubuh(index, lecturer, date);
    },
  },
};
</script>

<style scoped></style>
