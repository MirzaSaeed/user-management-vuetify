<template>
  <v-snackbar
    class="snackbar"
    absolute
    tile
    right
    top
    elevation="24"
    :color="color"
    v-model="computedSnack"
    :timeout="timeout"
  >
    {{ text }}
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  props: {
    snackbar: Boolean,
    timeout: Number,
    text: String,
    color: String,
  },
  computed: {
    computedSnack: {
      get: function () {
        return this.snackbar;
      },
      set: function (value) {
        this.$emit("update:snackbar", value);
      },
    },
  },
  watch: {
    computedSnack: function (newValue) {
      if (newValue) {
        setTimeout(() => {
          this.computedSnack = false;
        }, 2000);
      }
    },
  },
};
</script>

<style scoped>
.snackbar {
  margin-top: 60px;
}
</style>
