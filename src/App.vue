<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('login');
  },
};
</script>

<style>
/* Add your styles here */
</style>
