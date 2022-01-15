<template>
  <div>
    <div class="mx-4 text-xs lg:text-base xl:text-xl bg-white">
      <div class="font-extrabold text-center mb-4 px-6 py-3">{{ title }}</div>
      <div class="divide-y divide-solid">
        <div
          v-for="con of content"
          :key="'lecturer' + con.date"
          class=" py-2"
          :class="con.active ? 'bg-orange' : ''"
        >
          <div class="flex font-semibold px-6">
            {{ con.day }}, {{ con.date }}
          </div>
          <div class="text-xs xl:text-lg px-6">
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
    content: String,
  },
  methods: {},
};
</script>

<style scoped></style>
