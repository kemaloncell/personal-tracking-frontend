<template>

  <Dropdown
      v-model="selectedEmployeeType"
      :options="filteredDocumentType"
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
    },

    category: {
      type: Object,
      default: () => ({})
    },

  },
  data() {
    return {
      selectedEmployeeType: null
    }
  },
  computed: {
    ...mapGetters({
      documentList: 'employeeDocument/documentList',
    }),

    filteredDocumentType: function () {
      return this.documentList.filter(document => document.EmployeeDocumentCategory.id === this.category.id)
    },

    defaultEmployeeDocument2: function () {
      console.log(this.defaultEmployeeDocument, 'defaultEmployeeDocument compoted')
      // return this.defaultEmployeeDocument.filter(document => document.EmployeeDocumentCategory.id === this.category.id)
      return this.defaultEmployeeDocument.EmployeeDocumentCategory.categoryId === this.category.id
    }

  },
  methods: {
    ...mapActions({
      getAllDocTypeList: 'employeeDocument/getAllDocTypeList',
    }),
    setSelectedEmployeeDocument() {
      this.$emit('onEmployeeDocument', this.selectedEmployeeType)
    }
  },
  watch: {
    defaultEmployeeDocument: function (val) {
      if (!val) {
        this.selectedEmployeeType = null
        return
      }

      if (typeof val === 'string') {
        this.selectedEmployeeType = val
      } else {
        this.selectedEmployeeType = val
      }

      this.getAllDocTypeList()

    }
  },
  created() {
    if (!this.documentList.length) {
      console.log('getAllDocTypeList')
      this.getAllDocTypeList()
    }
  },
  mounted() {
    this.getAllDocTypeList()
    if (this.defaultEmployeeDocument) {
      console.log(this.defaultEmployeeDocument, 'defaultEmployeeDocument')
      this.selectedEmployeeType = this.defaultEmployeeDocument
    }
  }
}
</script>
