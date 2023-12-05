<template>
  <div id="sidebar-wrapper">
    <v-navigation-drawer
      height="100vh"
      width="300"
      class="sidebar-nav"
      permanent
    >
      <SidebarList />
    </v-navigation-drawer>
  </div>
</template>

<script>
import SidebarList from "./SidebarList.vue";
export default {
  name: "Sidebar",
  components: { SidebarList },
};
</script>

<style scoped>
@media (min-width: 992px) {
  #sidebar-wrapper {
    width: 300px;
    padding-left: 0px;
  }
}

#sidebar-wrapper {
  display: flex;
  padding-left: 0;
  background: #1a202e;
  transition: all 0.5s ease;
}

@media (max-width: 992px) {
  #sidebar-wrapper {
    display: none;
  }
}

.sidebar-nav {
  background: #1a202e;
}

.text {
  color: white;
}
.text-h5 {
  letter-spacing: 1.5px !important;
  font-family: "Montserrat", sans-serif !important;
}
.li-item {
  font-size: 16px !important;
}

.link-active {
  background: #131822 !important;
  color: #6373e5 !important;
  padding-left: 15px;
}
.sidebar-list {
  font-size: 16px !important;
}
.sidebar-list:hover {
  background: #131822 !important;
  color: #6373e5 !important;
  padding-left: 15px;
  transition: all ease-in-out 0.5s;
}
.sidebar-list:hover .li-icon {
  color: #6373e5 !important;

  transition: all ease-in-out 0.5s;
}
</style>
