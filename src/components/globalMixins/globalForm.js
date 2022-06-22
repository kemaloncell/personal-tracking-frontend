const globalFormProps = {
    props: {
        type: {
            type: String,
            default: () => 'CREATE'
        },

        defaultValues: {
            type: Object,
            default: () => {
            }
        }
    },

    watch: {
        defaultValues(val) {
            if (val) {
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
