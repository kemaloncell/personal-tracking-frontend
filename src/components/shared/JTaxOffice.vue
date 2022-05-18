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
      console.log('defaultTaxoffice', val)
      if (!val) {
        this.selectedTaxOffice = val.name
      }
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
<!---
<script>
import { mapActions, mapGetters } from 'vuex'
import EventBus from '@/plugin/eventBus'

export default {
  props: {
    defaultTaxoffice: null
  },

  data() {
    return {
      selectedTaxOffice: null
    }
  },

  computed: {
    ...mapGetters({
      taxOfficeList: 'definitions/taxOfficeList'
    }),

    taxOfficeListFormatter() {
      return this.taxOfficeList.filter((taxOffice) =>
        taxOffice.type === 'MM'
          ? (taxOffice.name = taxOffice.name.toUpperCase() + ' MAL MÜDÜRLÜĞÜ')
          : (taxOffice.name = taxOffice.name.toUpperCase() + ' VERGİ DAİRESİ')
      )
    }
  },

  methods: {
    ...mapActions({
      callTaxOffice: 'definitions/callTaxOffice'
    }),

    setSelectedTaxOffice() {
      this.$emit('onTaxOffice', this.selectedTaxOffice)
    },

    typeFormat(val) {
      if (val.type === 'MM') {
        val.name = val.name.toUpperCase() + ' MAL MÜDÜRLÜĞÜ'
        return val
      } else {
        val.name = val.name.toUpperCase() + ' VERGİ DAİRESİ'
        return val
      }
    }
  },

  watch: {
    defaultTaxoffice(val) {
      if (val) {
        this.selectedTaxOffice = this.typeFormat(val)
      }
    }
  },

  created() {
    if (!this.taxOfficeList.length) {
      this.callTaxOffice()
    }

    EventBus.$on('clearTaxOffice', () => {
      this.selectedTaxOffice = null
    })
  },

  mounted() {
    this.callTaxOffice()

    if (this.defaultTaxoffice) {
      this.selectedTaxOffice = this.typeFormat(this.defaultTaxoffice)
    }
  }
}
</script>
-->
