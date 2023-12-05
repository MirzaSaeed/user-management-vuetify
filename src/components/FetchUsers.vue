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
      <div class="d-flex flex-grow-1 justify-center align-center" id="no-data">
        <v-progress-circular
          :size="50"
          :width="7"
          v-if="loading"
          color="white"
          indeterminate
        ></v-progress-circular>
      </div>
      <!-- <v-simple-table v-if="!loading && 'users.data.length > 0'">
        <thead class="table-head">
          <tr>
            <th scope="col" class="text-left">Id</th>
            <th scope="col" class="text-left">Avatar</th>
            <th scope="col" class="text-left">First</th>
            <th scope="col" class="text-left">Last</th>
            <th scope="col" class="text-left">Email</th>
            <th scope="col" class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="table-body"
            v-for="(user, index) in users?.data"
            :key="user.id"
          >
            <th scope="row" class="text-left">{{ index + 1 }}</th>
            <td class="text-left">
              <v-avatar size="30px">
                <img alt="Avatar" :src="user.avatar" />
              </v-avatar>
            </td>
            <td class="text-left">{{ user.first_name }}</td>
            <td class="text-left">{{ user.last_name }}</td>
            <td class="text-left">{{ user.email }}</td>
            <td class="text-left">
              <v-btn
                icon
                depressed
                class="btn list-button btn-sm text-info"
                @click="viewUser(user.id)"
              >
                <v-icon small>mdi-eye</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table> -->

      <!-- Table List -->
      <v-data-table
        v-if="!loading && 'users.data.length > 0'"
        :headers="headers"
        dark
        items-per-page="6"
        :loading="loading"
        :items="users?.data"
        hide-default-footer
        class="elevation-1 pb-3"
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
      <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:default="dialog">
          <v-card class="mx-auto" color="#293247" dark>
            <v-card-title>
              <span class="text-h6 font-weight-bold">User Profile</span>
            </v-card-title>
            <div v-if="profileLoad" class="py-3 px-5 mx-3">
              <v-progress-circular
                indeterminate
                dark
                color="#5c72a5"
              ></v-progress-circular>
            </div>
            <v-list-item class="grow mx-2" v-else>
              <v-list-item-avatar color="grey darken-3" e>
                <v-img
                  class="elevation-6"
                  :alt="user.first_name"
                  :src="user.avatar"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  >{{ user.first_name }} {{ user.last_name }}</v-list-item-title
                >
                <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions class="justify-end">
              <v-btn text @click="dialog.value = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <!-- Paggination  -->
      <div
        class="text-center mt-3 me-3"
        v-if="!loading && 'users.data.length > 0'"
      >
        <v-row class="my-2" align="center" justify="end">
          <span class="mr-4 grey--text">
            Page {{ page }} of {{ users?.total_pages }}
          </span>
          <v-btn
            :disabled="
              users?.page === users?.total_pages
                ? Boolean(page === users?.page - 1)
                : Boolean(page)
            "
            icon
            dark
            color="#5c72a5"
            class="mr-1"
            @click="handlePaggination(page - 1)"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            :disabled="Boolean(page === users?.total_pages)"
            icon
            dark
            color="#5c72a5"
            class="ml-1"
            @click="handlePaggination(page + 1)"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "../helper/http-config";
import SidebarList from "./SidebarList.vue";
export default {
  name: "FetchUsers",
  components: { SidebarList },

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
    };
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
    async handlePaggination(pageNo) {
      try {
        this.page = pageNo;
        this.loading = true;
        await HTTP.get(`users?page=${pageNo}`)
          .then((res) => {
            this.users = res.data;
            this.page = this.users.page;
          })
          .catch((error) => {});
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
