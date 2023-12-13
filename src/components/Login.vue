<template>
  <div class="d-flex flex-column justify-center align-center flex-grow-1">
    <v-container class="container">
      <v-main>
        <v-card elevation="12" outlined color="#1e2535">
          <v-row
            class="d-flex align-center justify-center flex-sm-row flex-column flex-md-row flex-lg-row"
          >
            <v-col
              class="d-none d-sm-flex d-md-flex d-lg-flex align-center justify-md-end justify-lg-end justify-center mb-0 mb-md-0 px-5 pb-0"
            >
              <v-img
                src="../assets/svg/login-svg.svg"
                class="mx-3 mx-md-0 mx-lg-0 mt-lg-3 mt-0 mt-md-3 mt-lg-3"
                alt=""
              />
            </v-col>
            <v-col class="py-5 pt-md-0 pt-lg-0 pt-sm-1">
              <v-form
                class="px-5 pb-5 mt-sm-5"
                id="login-card"
                @submit.prevent="onSubmit"
              >
                <h1 class="pb-5 heading">Login</h1>

                <v-text-field
                  label="Email Address"
                  outlined
                  :rules="[rules.required]"
                  prepend-inner-icon="mdi-email"
                  v-model="email"
                  dark
                  :error-messages="error ? message : null"
                  :success-messages="success ? 'Logged in successfully' : null"
                  light
                  required
                  color="#E8eaf6"
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  outlined
                  color="#E8eaf6"
                  light
                  dark
                  required
                  prepend-inner-icon="mdi-lock"
                  :success-messages="success ? 'Logged in successfully' : null"
                  :error-messages="error ? message : null"
                  @click:append="show1 = !show1"
                ></v-text-field>

                <div class="button">
                  <v-btn class="btn mt-1" type="submit">Login</v-btn>
                </div>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
      </v-main>
    </v-container>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      email: "",
      error: false,
      password: "",
      success: false,
      rules: {
        required: (value) => !!value || "Required",
        min: (v) => v.length >= 3 || "Min 3 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    async onSubmit() {
      if (this.email === "" || this.password === "") {
        this.error = true;
        this.message = "Required";
      } else {
        this.error = false;
        this.success = true;
        const isLogin = await this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        });
        if (isLogin) {
          await this.$router.push("/dashboard");
        } else {
          this.error = true;
          this.message = "Invalid credentials";
        }
      }
    },
  },
};
</script>

<style scoped>
@media (min-width: 992px) {
  #login-card {
    max-width: 80%;
  }
}
.form-label {
  color: #1a202e;
}
.heading {
  font-weight: 400;
  font-size: 2.125rem;
  letter-spacing: 0.00073529412em;
  color: white;
}
.button .btn {
  color: white;
  background: #1a202e;
}
.button .btn:hover {
  color: #5c72a5;
}
.card {
  border: 1px solid #5c72a53f;
  background: #1e2535;
  color: white;
}
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
.container {
  transition: all 0.5s ease;
  max-width: 1200px;
  width: 100%;
}
</style>
