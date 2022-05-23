<template>

  <Dropdown
      v-model="selectedEducationType"
      :options="educationTypeList"
      optionLabel="educationLevelName"
      :showClear="true"
      class="w-full h-full city-search p-inputtext-sm"
      @change="setSelectedTEducationType"
  />

</template>
<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  props: {
    defaultEducation: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      selectedEducationType: null
    }
  },
  computed: {
    ...mapGetters({
      educationTypeList: 'definitions/educationTypeList'
    })
  },
  methods: {
    ...mapActions({
      callEducationType: 'definitions/callEducationType'
    }),
    setSelectedTEducationType() {
      this.$emit('onEducationType', this.selectedEducationType)
    }
  },
  watch: {
    defaultEducation: function (val) {
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

      this.callEducationType()

    }
  },
  created() {
    if (!this.educationTypeList.length) {
      this.callEducationType()
    }
  },
  mounted() {
    this.callEducationType()

    if (this.defaultEducation) {
      console.log('defaultEducation', this.defaultEducation)
      this.selectedEmployeeType = this.defaultEducation.name
    }
  }
}
</script>
