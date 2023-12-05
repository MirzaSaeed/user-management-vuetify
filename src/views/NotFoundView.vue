<template>
  <div class="main d-flex justify-center align-center flex-column">
    <NotFound />
    <v-btn color="#1a202e" class="btn px-3" to="/">Go to Home</v-btn>
  </div>
</template>

<script>
import NotFound from "@/components/NotFound.vue";
export default {
  components: { NotFound },
};
</script>

<style scoped>
.btn {
  color: white !important;
}
</style>
