import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

const store = new Vuex.Store({
  state() {
    return {
      users: [],
      admin: {
        id: 1,
        email: "admin@test.com",
        password: "123",
        createdAt: new Date(),
      },
      auth: {
        isAuth: false,
        session: "",
        id: "",
        email: "",
      },
      error: "",
    };
  },
  mutations: {
    addUser(state, payload) {
      state.users = [...state.users];
      state.users.push(payload);
    },
    auth(state, payload) {
      const { id } = state.admin;
      state.auth.id = id;
      state.auth.email = payload.email;
      state.auth.session = new Date();
      state.auth.isAuth = true;
    },
    updateAuth(state) {
      state.auth.isAuth = false;
      state.auth.id = null;
      state.auth.email = null;
      state.auth.session = null;
    },
    error(state, payload) {
      state.error = payload;
    },

    deleteUserById(state, payload) {
      let existUser;
      state.users.filter((user) => {
        if (user.id === payload) {
          existUser = user;
        }
      });
      if (existUser.id === payload) {
        state.users.splice(state.users.indexOf(existUser), 1);
      } else {
        alert("User not exist");
      }
    },
  },
  actions: {
    login(context, payload) {
      const { email, password } = payload;
      if (
        context.state.admin.email === email &&
        context.state.admin.password === password
      ) {
        context.commit("auth", payload);
        return true;
      } else {
        return false;
      }
    },
    logout(context) {
      context.commit("updateAuth");
    },
    addUser(context, payload) {
      context.commit("addUser", payload);
    },
    catchError(context, payload) {
      context.commit("error", payload);
    },
    deleteUser(context, payload) {
      context.commit("deleteUserById", payload);
    },
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
    getErrors(state) {
      return state.error;
    },
  },
  plugins: [vuexLocal.plugin],
});
Vue.prototype.$store = store;
export default store;
