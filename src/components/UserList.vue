<template>
  <div class="main border-0">
    <v-breadcrumbs dark divider="/" class="navbar-title ps-3">
      <template>
        <v-btn icon color="#1a202e" elevation="0" class="link-btn btn my-2"   id="sidebar-menu">
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon
        ></v-btn>
        <v-breadcrumbs-item class="link-item">USER LIST</v-breadcrumbs-item>
      </template>
      <v-spacer></v-spacer>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        
        temporary
        class="sidebar-nav"
      >
        <SidebarList />
      </v-navigation-drawer>

      <v-btn
        @click="handleLogout"
        color="#1a202e"
        elevation="0"
        class="link-btn btn my-2"
      >
        <span class="material-symbols-outlined"> logout </span>
      </v-btn>
    </v-breadcrumbs>
    <div
      class="body mt-md-3 mt-lg-3 mt-sm-3 mt-3 me-2 pb-3 ms-3 pt-0 dashboard-form pe-3 pe-md-0 pe-sm-3 pe-lg-0"
    >
      <div
        v-if="this.$store.getters.getUsers.length === 0"
        class="d-flex flex-grow-1 justify-center align-center"
        id="no-data"
      >
        <div
          class="d-flex justify-center flex-column align-center"
          style="width: 70%"
        >
          <p class="text-h5 mt-3">No User Exist</p>
          <v-img src="../assets/svg/no-list.svg" width="50%" alt="" />
        </div>
      </div>
      <v-simple-table v-else>
        <thead class="table-head">
          <tr>
            <th scope="col" class="text-left">Id</th>
            <th scope="col" class="text-left">First</th>
            <th scope="col" class="text-left">Last</th>
            <th scope="col" class="text-left">Email</th>
            <th scope="col" class="text-left">Age</th>
            <th scope="col" class="text-left">Job Title</th>
            <th scope="col" class="text-left">Country</th>
            <th scope="col" class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-body" v-for="(user, index) in users" :key="user.id">
            <th scope="row" class="text-left">{{ index + 1 }}</th>
            <td class="text-left">{{ user.firstName }}</td>
            <td class="text-left">{{ user.lastName }}</td>
            <td class="text-left">{{ user.email }}</td>
            <td class="text-left">{{ user.age }}</td>
            <td class="text-left">{{ user.jobTitle }}</td>
            <td class="text-left">{{ user.country }}</td>
            <td class="text-left px-0">
              <!-- <v-btn depressed class="btn list-button btn-sm text-info me-1">Edit</v-btn
              > -->
              <v-btn
                depressed
                class="btn list-button btn-sm text-danger"
                @click="deleteUser(user.id)"
              >
                Delete
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import SidebarList from "./SidebarList.vue";

export default {
  name: "UserList",
  components: { SidebarList },
  data() {
    return {
      drawer: false,
      users: this.$store.getters.getUsers,
    };
  },
  methods: {
    async handleLogout() {
      await this.$store.dispatch("logout");
      this.$router.push("/");
    },

    async deleteUser(id) {
      await this.$store.dispatch("deleteUser", id);
      this.$store.getters.getUsers;
    },
  },
};
</script>

<style scoped>
@media (min-width: 992px) {
  #sidebar-menu {
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
.text-info {
  color: aqua;
}
.text-danger {
  color: red;
}
.btn:hover {
  color: #5c72a5;
}
.list-button {
  background: none !important;
}
.list-button:hover {
  background: #1a202e !important;
}
.table-head .text-left {
  background: #1a202e;
  color: white !important;
}
.table-body .text-left {
  background: #293247;
  color: white;
}

.navbar-title {
  background: #1a202e;
  padding: 4px 0 0;
  display: flex;
  justify-content: space-between;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
#nav-bar-list {
  position: sticky;
  top: 0;
}
.sidebar-nav {
  background: #1a202e;
}
</style>
