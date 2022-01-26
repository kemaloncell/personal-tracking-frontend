<template>
  <default-layout>
  <div  slot="content">
    <user-list/>
  </div>
  </default-layout>
</template>

<script>
import UserList from "@/components/users/UserList";
export default {
  components: {
    UserList
  }

}
</script>