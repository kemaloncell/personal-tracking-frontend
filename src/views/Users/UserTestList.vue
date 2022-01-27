<template>
  <default-layout>
 <div slot="content">
    <div class="p-d-flex p-justify-center">
      <user-test-list/>
    </div>
 </div>
  </default-layout>
</template>
<script>
import UserTestList from '@/components/users/UserTestList'
export default {
  components: {
    UserTestList
  }
}
</script>