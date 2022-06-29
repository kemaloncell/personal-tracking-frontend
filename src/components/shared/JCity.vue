<template>
  <div class="pt-0 pb-0">
    <Dropdown
        v-model="selectedCity"
        :options="cityList"
        optionLabel="name"
        :filter="true"
        :showClear="true"
        class="w-full h-full city-search p-inputtext-sm"
        @change="setSelectedCity"
        filterLocale="tr"
    />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      cityList: 'definitions/cityList',
    })
  },

  props: {
    defaultCity: null,
  },

  data() {
    return {
      selectedCity: null,
    }
  },

  methods: {
    ...mapActions({
      callCityList: 'definitions/callCityList',
    }),

    setSelectedCity() {
      this.$emit('onSelectCity', this.selectedCity)
    },
  },

  mounted() {
    setTimeout(() => {
      if (!this.defaultCity) {
        this.selectedCity = null
        return
      }

      if (this.defaultCity) {
        this.selectedCity = this.defaultCity.id
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
    },

  }
}
</script>
