<template>
  <default-layout>
  <div class="main" slot="content">
    <user-list/>
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
created() {
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