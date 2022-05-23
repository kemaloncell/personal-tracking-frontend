<template>
  <Dropdown
      v-model="selectedEmployeeType"
      :options="employeeTypeList"
      optionLabel="employeeTypeName"
      :showClear="true"
      class="w-full h-full city-search p-inputtext-sm"
      @change="setSelectedTEmpType"
  />
</template>
<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  props: {
    defaultEmployee: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      selectedEmployeeType: null
    }
  },
  computed: {
    ...mapGetters({
      employeeTypeList: 'definitions/employeeTypeList'
    })
  },
  methods: {
    ...mapActions({
      callEmployeeType: 'definitions/callEmployeeType'
    }),
    setSelectedTEmpType() {
      this.$emit('onEmployeeType', this.selectedEmployeeType)
    }
  },
  watch: {
    defaultEmployee: function (val) {
      if (!val) {
        this.selectedEmployeeType = null
        return
      }

      if (typeof val === 'string') {
        this.selectedEmployeeType = val
      } else {
        this.selectedEmployeeType = val
      }
      this.callEmployeeType()

      /*  if (!val) {
       this.selectedTaxOffice = val.name
     }*/

      this.callEmployeeType()

    }
  },
  created() {
    if (!this.employeeTypeList.length) {
      this.callEmployeeType()
    }
  },
  mounted() {
    this.callEmployeeType()


    if (this.defaultEmployee) {
      this.selectedEmployeeType = this.defaultEmployee.name
    }
  }
}
</script>
