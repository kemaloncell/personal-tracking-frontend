<template>

  <VestingList
      :data="list"
  />

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