<template>
  <div class="sidebar-nav">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h5 text pt-1 ps-2">
          Title
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav dark light>
      <v-list-item
        link
        class="sidebar-list"
        to="/dashboard/create-user"
        exact-active-class="link-active"
      >
        <v-list-item-icon>
          <v-icon class="li-icon">mdi-account-plus</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="li-item">Create User</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        class="sidebar-list"
        to="/dashboard/user-list"
        exact-active-class="link-active"
      >
        <v-list-item-icon>
          <v-icon class="li-icon">mdi-account-details</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="li-item">User List</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        class="sidebar-list"
        to="/dashboard/fetch-users"
        exact-active-class="link-active"
      >
        <v-list-item-icon>
          <v-icon class="li-icon">mdi-account-group</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="li-item">Fetched Users</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
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
