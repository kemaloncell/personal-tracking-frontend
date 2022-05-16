<template>

  <user-list
      :data="list"
  />

</template>

<script>
import UserList from "@/components/users/UserList";
import usersMixins from "@/components/users/mixins/usersMixins";

export default {
  mixins: [usersMixins],
  components: {
    UserList
  },
}
</script>
