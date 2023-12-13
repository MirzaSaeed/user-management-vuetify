<template>
  <div class="main border-0">
    <v-breadcrumbs dark divider="/" class="navbar-title ps-3">
      <template>
        <v-btn
          icon
          color="#1a202e"
          elevation="0"
          class="link-btn btn my-2"
          id="sidebar-menu"
        >
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon
        ></v-btn>
        <v-breadcrumbs-item class="link-item">
          FETCHED USERS
        </v-breadcrumbs-item>
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
      class="body pt-0 mt-3 mx-3 dashboard-form pe-3 pe-md-0 pe-sm-3 pe-lg-0"
    >
      <div
        v-if="!loading && this.users?.data?.length === 0"
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

      <!-- Table List -->
      <v-data-table
        :headers="headers"
        dark
        :items-per-page="6"
        :loading="loading"
        :options.sync="pagination"
        :items="users?.data"
        no-data-text="No User Exist"
        class="elevation-1 pb-3"
        :server-items-length="pagination.totalItems"
      >
        <template v-slot:top>
          <v-toolbar flat color="#1a202e">
            <v-toolbar-title>Users</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:[`item.avatar`]="{ item }">
          <v-avatar size="30px">
            <img alt="Avatar" :src="item.avatar" />
          </v-avatar> </template
        ><template v-slot:[`item.action`]="{ item }">
          <v-btn
            icon
            depressed
            class="btn list-button btn-sm text-info"
            @click="viewUser(item.id)"
          >
            <v-icon small>mdi-eye</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <DialogBox
        :dialog.sync="dialog"
        :user="user"
        :profileLoad="profileLoad"
      />
    </div>
  </div>
</template>

<script>
import { HTTP } from "../helper/http-config";
import DialogBox from "./DialogBox.vue";
import SidebarList from "./SidebarList.vue";
export default {
  name: "FetchUsers",
  components: { SidebarList, DialogBox },

  data() {
    return {
      drawer: false,
      users: [],
      user: {},
      page: 1,
      dialog: false,
      loading: false,
      profileLoad: false,
      inject: {
        theme: {
          default: { isDark: false },
        },
      },
      headers: [
        {
          text: "Id",
          value: "id",
        },
        { text: "Avatar", value: "avatar" },
        { text: "First Name", value: "first_name" },
        { text: "Last Name", value: "last_name" },
        { text: "Email Address", value: "email" },
        { text: "Action", value: "action" },
      ],
      pagination: {
        descending: true,
        page: 1,
        rowsPerPage: 6,
        totalItems: 0,
      },
    };
  },
  watch: {
    pagination: {
      handler: "handlePaginationChange",
      deep: true,
    },
  },
  methods: {
    async handleLogout() {
      await this.$store.dispatch("logout");
      this.$router.push("/");
    },

    async viewUser(id) {
      try {
        this.dialog = true;
        this.profileLoad = true;

        await HTTP.get(`/users/${id}`).then(
          (res) => (this.user = res.data.data)
        );

        this.user;
        this.profileLoad = false;
      } catch (error) {}
    },
    async handlePaginationChange() {
      await this.handlePaggination(this.pagination.page);
    },

    async handlePaggination(pageNo) {
      try {
        this.page = pageNo;
        this.loading = true;

        const response = await HTTP.get(`users?page=${pageNo}`);
        this.users = response.data;

        this.pagination.page = this.users.page;
        this.pagination.rowsPerPage = this.users.per_page;
        this.pagination.totalItems = this.users.total;

        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
  },
  async created() {
    try {
      this.loading = true;
      await HTTP.get(`users?page=${this.page}`)
        .then((res) => {
          if (res.status === 200) {
            this.users = res.data;
            this.page = this.users.page;
          }
        })
        .catch((error) => {});
      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
@media (min-width: 992px) {
  #sidebar-menu {
    display: none;
  }
}

.main,
.pulse {
  background: #232b3e !important;
}
.form-label {
  color: #1a202e;
}
.btn,
.elevation-1 {
  color: white !important;
  background: #1a202e;
}
.text-info {
  color: rgb(249, 255, 255);
}
.text-danger {
  color: red;
}

.list-button {
  background: none !important;
}
.list-button:hover {
  color: #5c72a5 !important;
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

#no-data {
  transition: all ease-in-out 0.5s;
  animation: fadeIn 1s;
}
.dashboard-list {
  animation: fadeIn 1s;
  overflow: auto;
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
