<template>
  <div class="dashboard">
    <FetchUsers />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import FetchUsers from "@/components/FetchUsers.vue";
export default {
  name: "UserListView",
  components: {
    Sidebar,
    FetchUsers,
  },
};
</script>

<style scoped>
.dashboard {
  width: 100%;
  overflow: hidden;
}
</style>
