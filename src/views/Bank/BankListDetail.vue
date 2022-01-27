<template>
  <default-layout>
  <div slot="content">
    <bank-list-detail/>
  </div>
  </default-layout>
</template>

<script>
import BankListDetail from "@/components/bank/BankListDetail";
import bankMixins from "@/components/bank/mixins/bankMixins";

export default {
  mixins: [bankMixins],
  components: {
    BankListDetail
  }

}
</script>