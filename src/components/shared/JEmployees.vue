<template>
  <Dropdown
      v-model="selectedEmployee"
      :options="employeeList"
      optionLabel="name"
      :showClear="true"
      class="w-full h-full city-search p-inputtext-sm"
      @change="setSelectedTEmployee"
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
      selectedEmployee: null
    }
  },
  computed: {
    ...mapGetters({
      employeeList: 'definitions/employeeList'
    }),
  },
  methods: {
    ...mapActions({
      callEmployee: 'definitions/callEmployee'
    }),
    setSelectedTEmployee() {
      this.$emit('onEmployee', this.selectedEmployee)
    }
  },
  watch: {
    defaultEmployee: function (val) {
      if (!val) {
        this.selectedEmployee = null
        return
      }

      if (typeof val === 'string') {
        console.log(val, 'val')
        this.selectedEmployee = val
      } else {
        this.selectedEmployee = val
      }


      this.callEmployee()

    }
  },
  created() {
    if (!this.employeeList.length) {
      this.callEmployee()
    }
  },
  mounted() {
    this.callEmployee()
    console.log('mounted', this.employeeList)

    if (this.defaultEmployee) {
      this.selectedEmployee = this.defaultEmployee.name
    }
  }
}
</script>
