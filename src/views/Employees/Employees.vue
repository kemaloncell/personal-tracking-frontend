<template>
  <default-layout>
    <div slot="content">
      <EmployeeList
          :data="list"
      />
    </div>
  </default-layout>
</template>

<script>
import EmployeeList from "@/components/employees/employeeList";
import employeeMixin from "@/components/employees/mixins/employeeMixins";

export default {
  mixins: [employeeMixin],
  components: {
    EmployeeList,
  },
}
</script>