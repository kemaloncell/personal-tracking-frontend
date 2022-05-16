<template>

  <SupplierList
      :data="list"
  />

</template>

<script>
import SupplierList from "@/components/suppliers/SupplierList";
import supplierMixin from "@/components/suppliers/mixins/supplierMixins";

export default {
  mixins: [supplierMixin],
  components: {
    SupplierList,
  },
}
</script>