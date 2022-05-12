<template>
  <default-layout>
    <div slot="content">
      <EmployeeManagamentList
          :data="list"
      />
    </div>
  </default-layout>
</template>

<script>
import EmployeeManagamentList from "@/components/employeeManagament/employeeManagamentList";
import employeeMixin from "@/components/employeeManagament/mixins/employeeMixins";

export default {
  mixins: [employeeMixin],
  components: {
    EmployeeManagamentList,
  },
}
</script>