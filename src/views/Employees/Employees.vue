<template>

  <EmployeeList
      :data="list"
  />

</template>

<script>
import EmployeeList from "@/components/employees/EmployeeList";
import employeeMixin from "@/components/employees/mixins/employeeMixins";

export default {
  mixins: [employeeMixin],
  components: {
    EmployeeList,
  },
}
</script>