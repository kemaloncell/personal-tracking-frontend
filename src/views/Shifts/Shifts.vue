<template>
  <default-layout>
    <div slot="content">
      test
      <ShiftList
          :data="list"
      />
    </div>
  </default-layout>
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