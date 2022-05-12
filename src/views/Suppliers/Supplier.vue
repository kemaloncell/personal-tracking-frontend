<template>
  <default-layout>
    <div slot="content">
      <CustomerManagamentList
          :data="list"
      />
    </div>
  </default-layout>
</template>

<script>
import CustomerManagamentList from "@/components/customerManagament/CustomerManagamentList";
import customerMixins from "@/components/customerManagament/mixins/customerMixins";

export default {
  mixins: [customerMixins],
  components: {
    CustomerManagamentList,
  },
}
</script>