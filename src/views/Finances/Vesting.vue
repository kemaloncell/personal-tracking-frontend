<template>
  <default-layout>
    <div slot="content">
      <VestingList
          :data="list"
      />
    </div>
  </default-layout>
</template>
<script>
import VestingList from "@/components/finances/VestingList";
import financeMixins from "@/components/finances/mixins/financeMixins";

export default {
  mixins: [financeMixins],
  components: {
    VestingList,
  },
}
</script>