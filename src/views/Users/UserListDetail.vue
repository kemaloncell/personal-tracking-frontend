<template>
  <default-layout>
  <div slot="content">
    <user-list-detail/>
  </div>
  </default-layout>
</template>

<script>
import UserListDetail from "@/components/users/UserListDetail";
export default {
  components: {
    UserListDetail
  }

}
</script>