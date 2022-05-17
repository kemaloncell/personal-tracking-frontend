<template>
  <InputMask v-bind="$attrs" @input="onInput"/>
</template>

<script>
export default {
  methods: {
    onInput(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style></style>
