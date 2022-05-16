<template>

  <ShiftList
      :data="list"
  />

</template>
<script>
import ShiftList from "@/components/shifts/ShiftList";
import shiftMixin from "@/components/shifts/mixins/shiftMixins";

export default {
  mixins: [shiftMixin],
  components: {
    ShiftList,
  },
}
</script>