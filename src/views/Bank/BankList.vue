<template>
  <default-layout>
  <div slot="content">
    <bank-list/>
  </div>
  </default-layout>
</template>

<script>
import BankList from "@/components/bank/BankList";
export default {
  components: {
    BankList
  }

}
</script>