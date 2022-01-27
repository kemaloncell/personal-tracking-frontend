<template>
  <default-layout>
  <div slot="content">
    <user-list-detail/>
  </div>
  </default-layout>
</template>

<script>

import UserListDetail from "@/components/users/UserListDetail";
import usersMixins from "@/components/users/mixins/usersMixins";

export default {
  mixins: [usersMixins],
  components: {
    UserListDetail
  }

}
</script>