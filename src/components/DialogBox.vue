<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" max-width="600">
    <template v-slot:default="{ dialog }">
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
          <v-list-item-avatar color="grey darken-3">
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
          <v-btn text @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    user: Object,
    profileLoad: Boolean,
  },
  computed: {
    computedDialog: {
      get: function () {
        return this.dialog;
      },
      set: function (value) {
        this.$emit("update:dialog", value);
      },
    },
  },
  methods: {
    closeDialog() {
      this.computedDialog = false;
    },
  },
};
</script>
