<template>
  <Dropdown
      v-model="selectedTaxOffice"
      :options="taxOfficeList"
      optionLabel="name"
      :filter="true"
      :showClear="true"
      class="w-full h-full city-search p-inputtext-sm"
      @change="setSelectedTaxOffice"
  />
</template>
<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  props: {
    defaultTaxoffice: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      selectedTaxOffice: null
    }
  },
  computed: {
    ...mapGetters({
      taxOfficeList: 'definitions/taxOfficeList'
    })
  },
  methods: {
    ...mapActions({
      callTaxOffice: 'definitions/callTaxOffice'
    }),
    setSelectedTaxOffice() {
      this.$emit('onTaxOffice', this.selectedTaxOffice)
    }
  },
  watch: {
    defaultTaxoffice: function (val) {
      if (!val) {
        this.selectedTaxOffice = null
        return
      }

      if (typeof val === 'string') {
        this.selectedTaxOffice = val
      } else {
        this.selectedTaxOffice = val
      }
      this.callTaxOffice()

      /*  if (!val) {
       this.selectedTaxOffice = val.name
     }*/

      this.callTaxOffice()

    }
  },
  created() {
    if (!this.taxOfficeList.length) {
      this.callTaxOffice()
    }
  },
  mounted() {
    this.callTaxOffice()


    if (this.defaultTaxoffice) {
      this.selectedTaxOffice = this.defaultTaxoffice.name
    }
  }
}
</script>
