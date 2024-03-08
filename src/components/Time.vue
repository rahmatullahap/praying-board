<template>
  <div>
    <div
      class="p-1 xl:lg:p-8 lg:p-8 flex flex-col justify-between text-xs lg:text-base xl:text-3xl"
      :class="
        active
          ? 'bg-blue-midnight text-white text-base lg:text-xl xl:text-5xl border-1 border-gray-900 font-extrabold'
          : 'bg-gray-800 border text-white'
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
