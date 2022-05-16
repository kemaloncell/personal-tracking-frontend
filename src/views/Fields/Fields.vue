<template>

  <FieldList
      :data="list"
  />

</template>

<script>
import FieldList from "@/components/fields/FieldList";
import fieldMixin from "@/components/fields/mixins/fieldMixins";

export default {
  mixins: [fieldMixin],
  components: {
    FieldList,
  },
}
</script>