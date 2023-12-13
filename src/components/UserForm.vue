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
        <v-breadcrumbs-item class="link-item"> CREATE USER </v-breadcrumbs-item>
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
    <form
      ref="form"
      class="body ms-3 pt-0 dashboard-form pe-3 pe-md-0 pe-sm-3 pe-lg-0"
      lazy-validation
      @submit.prevent="onSubmit"
    >
      <h5 class="text-h5 fw-normal my-3 mb-4 text-white">Register Users</h5>

      <v-row
        class="row d-flex flex-column flex-md-col flex-lg-row flex-sm-column align-sm-center"
      >
        <SnackBar
          :text="text"
          :snackbar.sync="snackbar"
          :color="color"
          :timeout="2000"
        />

        <v-col class="col" cols="12" md="6" sm="12">
          <v-row class="row">
            <v-col class="col pb-0">
              <v-text-field
                label="First Name"
                outlined
                :rules="[rules.required]"
                prepend-inner-icon="mdi-account"
                v-model="firstName"
                :error-messages="error ? message : null"
                dark
                type="text"
                light
                color="#E8eaf6"
              ></v-text-field>
            </v-col>
            <v-col class="col pb-0">
              <v-text-field
                label="Last Name"
                :error-messages="error ? message : null"
                outlined
                :rules="[rules.required]"
                type="text"
                prepend-inner-icon="mdi-account"
                v-model="lastName"
                dark
                light
                color="#E8eaf6"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="row">
            <v-col class="col pb-0">
              <v-text-field
                label="Email Address"
                outlined
                :rules="[rules.required]"
                :error-messages="error ? message : null"
                type="email"
                prepend-inner-icon="mdi-email"
                v-model="email"
                dark
                light
                color="#E8eaf6"
              ></v-text-field>
            </v-col>
            <v-col class="col pb-0">
              <v-text-field
                label="Age"
                outlined
                prepend-inner-icon="mdi-numeric"
                :rules="[rules.required]"
                v-model="age"
                :min="0"
                :error-messages="error ? message : null"
                :max="125"
                dark
                light
                hint="Must be a number"
                type="number"
                color="#E8eaf6"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="row">
            <v-col class="col">
              <v-text-field
                label="Job Title"
                :error-messages="error ? message : null"
                outlined
                :rules="[rules.required]"
                type="text"
                prepend-inner-icon="mdi-clipboard-account"
                v-model="jobTitle"
                dark
                light
                color="#E8eaf6"
              ></v-text-field>
            </v-col>
            <v-col class="col">
              <v-text-field
                label="Country"
                outlined
                :rules="[rules.required]"
                prepend-inner-icon="mdi-map-marker"
                v-model="country"
                dark
                type="text"
                :error-messages="error ? message : null"
                light
                color="#E8eaf6"
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="button">
            <v-btn color="#1a202e" class="btn px-3" type="submit"
              >Create User</v-btn
            >
          </div>
        </v-col>
      </v-row>
      <v-row
        class="d-none d-md-flex d-lg-flex d-sm-flex flex-column-reverse flex-sm-column-reverse flex-md-row flex-lg-row align-center"
      >
        <v-col class="col p-0" cols="12" md="6" lg="6" sm="12"></v-col>
        <v-col
          class="col d-flex justify-center justify-sm-center justify-end justify-md-center justify-lg-centers pt-0"
          cols="12"
          lg="6"
          md="6"
          sm="12"
        >
          <img src="../assets/svg/form.svg" width="55%" alt="" />
        </v-col>
      </v-row>
    </form>
  </div>
</template>

<script>
import SidebarList from "./SidebarList.vue";
import SnackBar from "./SnackBar.vue";
export default {
  name: "UserForm",
  components: { SidebarList, SnackBar },
  data() {
    return {
      drawer: false,
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      error: false,
      jobTitle: "",
      country: "",
      rules: {
        required: (value) => !!value || "Required.",
        // min: (v) => v.length >= 8 || "Min 8 characters",
        isNumber: (value) =>
          typeof Number(value) === Number(value) || "Must be a number",
        emailMatch: () => `The email and password you entered don't match`,
      },

      snackbar: false,
      text: "",
      timeout: 2000,
      color: "",
    };
  },
  methods: {
    async handleLogout() {
      await this.$store.dispatch("logout");
      this.$router.push("/");
    },
    onSubmit() {
      try {
        if (
          this.firstName === "" ||
          this.lastName === "" ||
          this.email === "" ||
          this.age === null ||
          this.jobTitle === "" ||
          this.country === ""
        ) {
          this.error = true;
          this.message = "Required";
        } else {
          if (this.$store.state.users.length === 0) {
            this.$store.dispatch("addUser", {
              id: this.$store.state.users.length + 1,
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              age: this.age,
              jobTitle: this.jobTitle,
              country: this.country,
              createdAt: new Date(),
              updatedAt: null,
            });
            this.$refs.form.reset();
            this.$store.getters.getUsers;
          } else if (this.$store.state.users.length > 0) {
            let existEmail;
            const isExist = this.$store.state.users.filter((user) => {
              if (user.email === this.email) {
                existEmail = user.email;
              }
            });
            if (existEmail === this.email) {
              this.text = "User Already exist";
              this.snackbar = true;
              this.color = "red";
            } else {
              const usersClone = JSON.parse(
                JSON.stringify(this.$store.state.users)
              );
              usersClone.sort((a, b) => b.id - a.id);
              this.$store.dispatch("addUser", {
                id: usersClone[0].id + 1,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                age: this.age,
                jobTitle: this.jobTitle,
                country: this.country,
                createdAt: new Date(),
                updatedAt: null,
              });
              this.text = "User created Successfully.";
              this.snackbar = true;
              this.color = "#1a202e";

              this.$refs.form.reset();
            }
          }
        }
      } catch (error) {
        alert(error);
      }
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

.dashboard-form {
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
.col {
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.main {
  background: #232b3e;
}
.form-label {
  color: #1a202e;
}
.sidebar-nav {
  background: #1a202e;
}
</style>
