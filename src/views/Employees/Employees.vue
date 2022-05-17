<template>
  <default-layout>
    <div slot="content">
      test
      <EmployeeList
          :data="list"
      />
    </div>
  </default-layout>
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