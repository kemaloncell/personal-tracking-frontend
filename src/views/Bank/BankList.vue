<template>
  <default-layout>
  <div class="main" slot="content">
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

<style scoped lang="scss">
.main{
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 1rem 15rem 0 0;
}
</style>