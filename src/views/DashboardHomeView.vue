<template>
  <div class="dashboard">
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from "../components/Dashboard.vue";
export default {
  name: "CreateUserView",
  components: {
    Dashboard,
  },
};
</script>

<style scoped>
#wrapper {
  padding-left: 0;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

@media (min-width: 992px) {
  #wrapper {
    padding-left: 300px;
  }
}
.navbar-expand-lg {
  background: #1a202e;
}
nav div.container-fluid div ul.d-flex li a {
  color: white;
}
nav div.container-fluid div ul.d-flex li a.hover {
  color: #6373e5;
}
nav div.container-fluid div ul.d-flex li a.router-link-exact-active {
  color: #ffffff;
  border-bottom: 2px solid #6373e5;
}

.dashboard {
  animation: fadeIn 1s;
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
