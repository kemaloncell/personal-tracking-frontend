<template>
  <default-layout>
    <div slot="content">
      <BalanceList
          :data="list"
      />
    </div>
  </default-layout>
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