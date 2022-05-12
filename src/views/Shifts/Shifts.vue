<template>
  <default-layout>
    <div slot="content">
      <ShiftList
          :data="list"
      />
    </div>
  </default-layout>
</template>
<script>
import ShiftList from "@/components/shifts/shiftList";
import shiftMixin from "@/components/shifts/mixins/shiftMixins";

export default {
  mixins: [shiftMixin],
  components: {
    ShiftList,
  },
}
</script>