<template>
  <default-layout>
    <div slot="content">
      test
      <FieldList
          :data="list"
      />
    </div>
  </default-layout>
</template>

<script>
import FieldList from "@/components/zones/ZoneList";
import fieldMixin from "@/components/zones/mixins/zoneMixins";

export default {
  mixins: [fieldMixin],
  components: {
    FieldList,
  },
}
</script>