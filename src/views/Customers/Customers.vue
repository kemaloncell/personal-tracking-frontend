<template>
  <default-layout>
    <div slot="content">
      test
      <CustomerList
          :data="list"
      />
    </div>
  </default-layout>
</template>

<script>
import CustomerList from "@/components/customers/CustomerList";
import customerMixin from "@/components/customers/mixins/customerMixins";

export default {
  mixins: [customerMixin],
  components: {
    CustomerList,
  },
}
</script>