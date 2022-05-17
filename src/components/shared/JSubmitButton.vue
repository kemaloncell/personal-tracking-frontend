<template>
  <SplitButton
      type="submit"
      label="Kaydet"
      :disabled="loading"
      :model="splitButtonItems"
      @click="() => onClick(0)"
  />
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: () => false
    }
  },

  data() {
    return {
      splitButtonItems: [
        {
          label: 'Kaydet Ve Yeni Ekle',
          command: () => {
            this.onClick(1)
          }
        }
      ]
    }
  },

  methods: {
    onClick(type) {
      this.$emit('save', type)
    }
  }
}
</script>

<style></style>
