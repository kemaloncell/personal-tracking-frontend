<template>

  <bank-list
      :data="list"
  />

</template>

<script>
import BankList from "@/components/bank/BankList";
import bankMixins from "../../components/bank/mixins/bankMixins";

export default {
  mixins: [bankMixins],
  components: {
    BankList
  },
}
</script>