<template>
  <default-layout>
    <div slot="content">
      <h2 class="text-center text-2xl font-medium mb-3">İzin / Talep</h2>

      <div
          class="flex mb-3 justify-content-between align-items-center mb-3 filters flex-wrap"
      >
        <div class="flex align-items-center">
          <Button @click="goCreateDemand" class="p-button-primary add-button"
          >İzin Ekle
          </Button
          >

        </div>

      </div>

      <DemandsList
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
import offDayDemandsMixins from "@/components/demands/offDayDemands/mixins/offDayDemandsMixins";
import DemandsList from "@/components/demands/offDayDemands/DemandsList";

export default {
  mixins: [offDayDemandsMixins],
  components: {
    DemandsList,
  },

  methods: {
    goCreateDemand() {
      this.$router.push({name: 'DemandsCreate', params: {type: 'CREATE'}})
    },

    async onUpdate(val) {
      this.formData = val
      await this.$router.push({name: 'DemandsUpdate', params: {id: val.id, data: val, type: 'UPDATE'}})
    },


  },
  created() {
    this.getListOffDayDemands()
  }
}
</script>
