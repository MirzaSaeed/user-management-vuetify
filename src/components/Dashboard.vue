<template>
  <div class="main border-0">
    <v-breadcrumbs dark divider="/" class="navbar-title ps-3">
      <v-btn
        icon
        color="#1a202e"
        elevation="0"
        class="link-btn btn my-2"
        id="sidebar-menu"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon
      ></v-btn>
      <v-breadcrumbs-item>DASHBOARD</v-breadcrumbs-item><v-spacer> </v-spacer>

      <v-btn
        @click="handleLogout"
        color="#1a202e"
        elevation="0"
        class="link-btn btn my-2"
      >
        <span class="material-symbols-outlined"> logout </span>
      </v-btn>
    </v-breadcrumbs>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      class="sidebar-nav"
    >
      <SidebarList />
    </v-navigation-drawer>

    <div class="body pt-0">
      <v-row class="">
        <v-col class="d-flex justify-center align-center col">
          <v-img src="../assets/svg/dashboard.svg" max-width="50%" alt="" />
        </v-col>
      </v-row>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import SidebarList from "./SidebarList.vue";
export default {
  components: { SidebarList },
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    async handleLogout() {
      await this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
@media (min-width: 992px) {
  #sidebar-menu,
  #sidebar-menu-button {
    display: none;
  }
}

.main {
  background: #232b3e;
}
.form-label {
  color: #1a202e;
}
.btn {
  color: white;
  background: #1a202e;
}

.btn:hover {
  color: #5c72a5;
  background: #1a202e;
}
.navbar-title {
  background: #1a202e;
  padding: 4px 0 0;
  display: flex;
  justify-content: space-between;
}
.sidebar-nav {
  background: #1a202e;
}
</style>
