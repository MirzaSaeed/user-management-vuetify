<template>
  <div class="main d-flex flex-column">
    <Navbar />
    <Login/>
  </div>
</template>

<script>
import Login from '@/components/Login.vue';
import Navbar from "../components/Navbar.vue";
export default {
  name: "LoginView",
  components: {
    Navbar,
    Login
  },

}
    Login;
</script>

<style scoped>
.main {
  animation: fadeIn 1s;
  background: #1e2535;
  height: 100%;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
