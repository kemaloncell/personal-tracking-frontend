<template>
  <div class="grid flex align-items-center">
    <div class="col-2 text-sm">
      İl <span v-if="required" class="p-error">*</span>
    </div>
    <div class="col-4 pt-0 pb-0">
      <Dropdown
          v-model="selectedCity"
          :options="cityList"
          optionLabel="name"
          optionValue="id"
          :filter="true"
          :showClear="true"
          class="w-full h-full city-search p-inputtext-sm"
          @change="setSelectedCity"
          filterLocale="tr"
      />
    </div>

    <div class="col-2 text-sm">
      İlçe <span v-if="required" class="p-error">*</span>
    </div>
    <div class="col-4 pt-0 pb-0">
      <Dropdown
          v-model="selectedDistrict"
          :options="districtList"
          optionLabel="name"
          optionValue="id"
          :filter="true"
          :showClear="true"
          class="w-full h-full city-search p-inputtext-sm"
          @change="setSelectedDistrict"
          filterLocale="tr"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      cityList: 'definitions/cityList',
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
      callCityList: 'definitions/callCityList',
      callDistrictList: 'definitions/callDistrictList'
    }),

    setSelectedCity() {
      this.$emit('onSelectCity', this.selectedCity)

      setTimeout(() => {
        this.callDistrictList(this.selectedCity)
        this.selectedDistrict = null
      }, 100)
    },

    setSelectedDistrict() {
      this.$emit('onSelectDistrict', this.selectedDistrict)
      this.$emit('onSelectCity', this.selectedCity)
    }
  },

  mounted() {
    setTimeout(() => {
      if (!this.defaultCity) {
        this.selectedCity = null
        return
      }

      if (!this.defaultDistrict) {
        this.selectedDistrict = null
        return
      }

      if (this.defaultCity) {
        this.selectedCity = this.defaultCity.id

        this.callDistrictList(this.defaultCity.id)
        this.selectedDistrict = this.defaultDistrict.id

        this.$emit('onSelectDistrict', this.selectedDistrict)
        this.$emit('onSelectCity', this.selectedCity)
      }
    }, 250)
  },

  created() {
    if (!this.cityList.length) {
      this.callCityList()
    }
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
