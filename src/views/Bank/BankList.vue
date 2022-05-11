<template>
  <default-layout>
    <div slot="content">
      <bank-list
          :data="list"
      />
    </div>
  </default-layout>
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