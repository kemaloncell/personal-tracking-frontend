<template>
  <default-layout>
    <div slot="content">
      <SupplierList
          :data="list"
      />
    </div>
  </default-layout>
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