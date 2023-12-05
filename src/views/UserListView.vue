<template>
  <div class="dashboard">
    <UserList />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import UserList from "@/components/UserList.vue";
export default {
  name: "UserListView",
  components: {
    Sidebar,
    UserList,
  },
};
</script>

<style scoped>
.dashboard {
  width: 100%;
  overflow: hidden;
}
</style>
