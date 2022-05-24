<template>

  <Dropdown
      v-model="selectedEmployeeDocument"
      :options="employeeDocumentList"
      optionLabel="name"
      :showClear="true"
      class="w-full h-full city-search p-inputtext-sm"
      @change="setSelectedEmployeeDocument"
  />

</template>
<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  props: {
    defaultEmployeeDocument: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      selectedEmployeeDocument: null
    }
  },
  computed: {
    ...mapGetters({
      employeeDocumentList: 'definitions/employeeDocumentList'
    })
  },
  methods: {
    ...mapActions({
      callEmployeeDocumentList: 'definitions/callEmployeeDocumentList'
    }),
    setSelectedEmployeeDocument() {
      this.$emit('onEmployeeDocument', this.selectedEmployeeDocument)
    }
  },
  watch: {
    defaultEmployeeDocument: function (val) {
      console.log(val, 'val')
      if (!val) {
        this.selectedEmployeeType = null
        return
      }

      if (typeof val === 'string') {
        this.selectedEmployeeType = val
      } else {
        this.selectedEmployeeType = val
      }

      this.callEmployeeDocumentList()

    }
  },
  created() {
    if (!this.employeeDocumentList.length) {
      this.callEmployeeDocumentList()
    }
  },
  mounted() {
    this.callEmployeeDocumentList()
    if (this.defaultEmployeeDocument) {
      this.selectedEmployeeType = this.defaultEmployeeDocument.name
    }
  }
}
</script>
