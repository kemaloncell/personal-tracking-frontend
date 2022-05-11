<template>
  <default-layout>
    <div slot="content">
      <user-list
          :data="list"
      />
    </div>
  </default-layout>
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
