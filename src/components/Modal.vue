<template>
  <div class="modal-container" v-if="showModal">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <!-- Your modal content goes here -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: true,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.modal-container {
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Dim background */
}

.modal-content {
  z-index: 1;
  background-color: white; /* Modal background color */
  padding: 2rem;
  border-radius: 8px;
  width: 100%; /* Set modal width */
  max-width: 60vw; /* Optional: Set max-width to prevent the modal from becoming too wide */
  max-height: 80vh;
}
</style>
