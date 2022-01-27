<template>
  <default-layout>
  <div class="main" slot="content">
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
<style scoped lang="scss">
.main{
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 1rem 15rem 0 0;
}
</style>