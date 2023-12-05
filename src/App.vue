<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>



<style>
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  height: 100vh;
  background: #232b3e;
}
/* Scroll bar */
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #313847;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #475168;
}
::-webkit-scrollbar-track {
  background-color: #1a202e;
}
</style>
