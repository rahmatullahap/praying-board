<template>
  <div>
    <div class="mx-4 bg-white">
      <div
        class="text-base xl:text-xl font-extrabold text-center mb-0 px-6 py-3"
      >
        {{ title }}
      </div>
      <div class="divide-y divide-solid text-center">
        <div
          v-for="con of content"
          :key="'lecturer' + con.date"
          class="py-2"
          :class="con.active ? 'bg-orange' : ''"
        >
          <div class="text-base xl:text-xl font-semibold px-6">
            {{ con.day }}, {{ con.date }}
          </div>
          <div class="text-base xl:text-xl px-6">
            {{ con.lecturer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Side",
  props: {
    title: String,
    content: Array,
  },
  methods: {},
};
</script>

<style scoped></style>
