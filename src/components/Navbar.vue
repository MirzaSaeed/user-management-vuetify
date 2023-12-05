<template>
  <div>
    <v-app-bar color="#1a202e" flat>
      <v-toolbar-title class="nav-title">Welcome</v-toolbar-title>
      <v-spacer></v-spacer>

      <router-link class="router-link" to="/">
        <v-btn color="#1a202e"  elevation="0" class="link-btn"> Login </v-btn>
      </router-link>
    </v-app-bar>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.nav-title {
  color: white;
  letter-spacing: 1.5px;
}
.router-link .link-btn {
  text-decoration: none;
  color: white;
}
.router-link:hover .link-btn {
  color: #6373e5;
  background: #1a202e;
}
a.router-link-exact-active {
  color: #ffffff;
  border-bottom: 2px solid #6373e5;
}
</style>
