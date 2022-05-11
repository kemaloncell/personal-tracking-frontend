<template>
  <default-layout>
    <div slot="content">
      <PaymentList
          :data="list"
      />
    </div>
  </default-layout>
</template>

<script>
import PaymentList from "@/components/finances/PaymentList";
import financeMixins from "@/components/finances/mixins/financeMixins";

export default {
  mixins: [financeMixins],
  components: {
    PaymentList,
  },
}
</script>