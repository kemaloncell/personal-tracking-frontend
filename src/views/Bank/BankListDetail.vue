<template>
  <default-layout>
  <div slot="content">
    <bank-list-detail/>
  </div>
  </default-layout>
</template>

<script>
import BankListDetail from "@/components/bank/BankListDetail";
export default {
  components: {
    BankListDetail
  }

}
</script>