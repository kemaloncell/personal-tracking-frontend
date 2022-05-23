<template>
  <Calendar
      id="range"
      ref="showCalendar"
      @input="() => onSelectDate()"
      v-model="date"
      :maxDate="maxDate"
      :minDate="minDate"
      :manualInput="false"
      :showIcon="true"
      placeholder="gg/aa/yyyy"
  >
  </Calendar>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      date: null,
      maxDate: null,
      minDate: null
    }
  },
  methods: {
    onSelectDate() {
      this.$emit('onSelect', moment(this.date).format('YYYY-MM-DD'))
    }
  },
  watch: {
    defaultValue(val) {
      if (val) {
        this.date = moment(val).format('DD/MM/YYYY')
      } else {
        return
      }
    },
    defaultMaxDate(val) {
      if (val) {
        this.maxDate = val
      } else {
        return
      }
    },
    defaultMinDate(val) {
      if (val) {
        this.minDate = val
      } else {
        return
      }
    }
  },
  props: {
    defaultMaxDate: {
      default: () => 0,
      type: [Number, String, Date]
    },
    defaultMinDate: {
      default: () => 0,
      type: [Number, String, Date]
    },
    defaultValue: {
      default: () => 0,
      type: [Number, String, Date]
    }
  },
  mounted() {
    if (!this.defaultValue) {
      this.date = this.defaultValue
    } else {
      this.date = moment(this.defaultValue).format('DD/MM/YYYY')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .p-datepicker table td {
  padding: 0 !important;
}

::v-deep .p-datepicker table td > span {
  width: 2rem !important;
  height: 2rem !important;
}

::v-deep .p-datepicker-calendar thead {
  color: #bebebe !important;
}

::v-deep .p-datepicker {
  min-width: 0 !important;
}
</style>