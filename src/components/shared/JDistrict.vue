<template>
  <div class="pt-0 pb-0">
    <Dropdown
        v-model="selectedDistrict"
        :options="districtList"
        optionLabel="name"
        :filter="true"
        :showClear="true"
        class="w-full h-full city-search p-inputtext-sm"
        @change="setSelectedDistrict"
        filterLocale="tr"
    />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      districtList: 'definitions/districtList'
    })
  },

  props: {
    defaultCity: null,
    defaultDistrict: null,
    required: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      selectedCity: null,
      selectedDistrict: null
    }
  },

  methods: {
    ...mapActions({
      callDistrictList: 'definitions/callDistrictList'
    }),


    setSelectedDistrict() {
      this.$emit('onSelectDistrict', this.selectedDistrict)
    }
  },

  mounted() {
    this.callDistrictList(this.defaultCity)
  },


  watch: {
    defaultCity: function (val) {
      if (!val) {
        this.selectedCity = null
        return
      }

      if (typeof val === 'string') {
        this.selectedCity = val
      } else {
        this.selectedCity = val
      }
      this.callDistrictList(this.selectedCity)
    },

    defaultDistrict: function (val) {
      if (!val) {
        this.selectedDistrict = null
        return
      }

      if (typeof val === 'string') {
        this.selectedDistrict = val
      } else {
        this.selectedDistrict = val
      }
    }
  }
}
</script>
