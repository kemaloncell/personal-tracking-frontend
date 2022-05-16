<template>

  <BalanceList
      :data="list"
  />

</template>

<script>
import BalanceList from "@/components/finances/BalanceList";
import financeMixins from "@/components/finances/mixins/financeMixins";

export default {
  mixins: [financeMixins],
  components: {
    BalanceList,
  },
}
</script>