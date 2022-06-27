<template>
  <default-layout>
    <div slot="content">


      <h2 class="text-center text-2xl font-medium mb-3">Tedarikçiler</h2>

      <div
          class="flex mb-3 justify-content-between align-items-center mb-3 filters flex-wrap"
      >
        <div class="flex align-items-center">
          <Button @click="goCreatePage" class=" add-button"
          >Saha Ekle
          </Button
          >
        </div>

      </div>

      <ZoneList
          :data="list"
          :loading="loading"
          @onUpdate="onUpdate"
          @onDelete="onDelete"
          @onSelection="onSelection"
      />

      <Toast position="top-right"/>

    </div>
  </default-layout>
</template>


<script>

import ZoneList from "@/components/zones/ZoneList";
import zoneMixin from "@/components/zones/mixins/zoneMixins";

export default {
  mixins: [zoneMixin],
  components: {
    ZoneList,
  },

  data() {
    return {
      updateId: null,
    }
  },

  methods: {
    goCreatePage() {
      this.$router.push({name: 'SupplierCreate', params: {type: 'CREATE'}});
    },

    async onUpdate(val) {
      const item = await this.getZonesSingle(val.id)
      await this.$router.push({name: 'SupplierUpdate', params: {id: val.id, data: item.data, type: 'UPDATE'}})

    },
  },
  created() {
    this.getLiseZone()
  }
}
</script>