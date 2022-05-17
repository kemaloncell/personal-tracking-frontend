const globalFormProps = {
  props: {
    loading: {
      type: Boolean,
      default: () => false
    },

    type: {
      type: String,
      default: () => 'CREATE'
    },

    defaultValues: {
      type: Object,
      default: () => {}
    }
  },

  watch: {
    defaultValues(val) {
      if (val) {
        console.log(val)
        this.formData = val
      }
    }
  },

  mounted() {
    if (this.defaultValues) {
      this.formData = this.defaultValues
    }
  }
}

export default globalFormProps
