<template>
  <div class="h-full">
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
</style>
