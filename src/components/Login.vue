<template>
  <div class="flex items-center justify-center bg-gray-100 h-full">
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h1 class="text-2xl font-semibold mb-6">Login</h1>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label
            for="username"
            class="block text-gray-600 text-sm font-medium mb-2"
            >Username:</label
          >
          <input
            v-model="username"
            type="text"
            id="username"
            name="username"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="mb-4">
          <label
            for="password"
            class="block text-gray-600 text-sm font-medium mb-2"
            >Password:</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="mb-4 text-red-500" v-if="errorMessage">
          {{ errorMessage }}
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  mounted() {
    const isLoggedIn = this.$store.state.isLoggedIn;
    if (isLoggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    verifyUser: async function (username, password) {
      let { data } = await this.$store.state.database
        .from("users")
        .select("*")
        .eq("username", username)
        .eq("password", password);

      if (data && data.length) {
        return true;
      }

      return false;
    },
    async login() {
      const verified = await this.verifyUser(this.username, this.password);
      if (verified) {
        localStorage.setItem(
          "token",
          JSON.stringify({ username: this.username })
        );
        this.$router.go();
      } else {
        this.errorMessage = "Incorrect username or password";
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      }
    },
  },
};
</script>

<style scoped></style>
