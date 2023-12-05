<template>
  <div class="dashboard">
    <UserForm />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import UserForm from "@/components/UserForm.vue";
export default {
  name: "CreateUserView",
  components: {
    Sidebar,
    UserForm,
  },
};
</script>

<style scoped>
.dashboard {
  width: 100%;
}
</style>
