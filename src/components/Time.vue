<template>
  <div>
    <div
      class="mx-4 p-6 flex flex-col justify-between text-3xl"
      :class="
        active
          ? 'bg-blue-midnight text-white text-5xl border-4 border-gray-900 font-extrabold'
          : 'bg-white border'
      "
    >
      <div class="font-extrabold text-center">{{ label }}</div>
      <div class="text-center">{{ time }} WIB</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Time",
  props: {
    time: String,
    label: String,
    active: Boolean,
  },
};
</script>

<style scoped></style>
