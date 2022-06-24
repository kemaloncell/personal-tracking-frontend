<template>
  <default-layout>
    <div slot="content">

      <h2 class="text-center text-2xl font-medium mb-3">Ortak İzin / Talep</h2>

      <div
          class="flex mb-3 justify-content-between align-items-center mb-3 filters flex-wrap"
      >
        <div class="flex align-items-center">
          <Button @click="goCreateCommondDemands" class="p-button-primary add-button"
          >İzin Ekle
          </Button
          >

        </div>

      </div>

      <CommonDemandsList
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
import commonDemandsMixins from "@/components/demands/commonDemands/mixins/commonDemandsMixins";
import CommonDemandsList from "@/components/demands/commonDemands/CommonDemandsList";

export default {
  mixins: [commonDemandsMixins],
  components: {
    CommonDemandsList,
  },

  methods: {
    goCreateCommondDemands() {
      this.$router.push({name: 'CommonDemandsCreate', params: {type: 'CREATE'}})
    },

    async onUpdate(val) {
      val.status = {
        code: val.status
      }
      await this.$router.push({name: 'CommonDemandsUpdate', params: {id: val.id, data: val, type: 'UPDATE'}})
    },


  },
  created() {
    this.getListCommonDemands()
  }
}
</script>
