<template>
  <default-layout>
    <div slot="content">

      <h2 class="text-center text-2xl font-medium mb-3">Talepler</h2>

      <div
          class="flex mb-3 justify-content-between align-items-center mb-3 filters flex-wrap"
      >
        <div class="flex align-items-center">
          <Button @click="goCreateAdvanceDemand" class="p-button-primary add-button"
          >İzin Ekle
          </Button
          >

        </div>

      </div>

      <AdvanceDemandsList
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
import advanceDemandsMixins from "@/components/demands/advanceDemands/mixins/advanceDemandsMixins";
import AdvanceDemandsList from "@/components/demands/advanceDemands/AdvanceDemandsList";

export default {
  mixins: [advanceDemandsMixins],
  components: {
    AdvanceDemandsList,
  },

  methods: {
    goCreateAdvanceDemand() {
      this.$router.push({name: 'AdvanceDemandsCreate', params: {type: 'CREATE'}})
    },

    async submit(data, type) {
      if (this.formType === 'CREATE') {
        console.log(data, type, 'gelid')
        this.createSubmit(data, type)
      }

      if (this.formType === 'UPDATE') {
        this.udpateSubmit(data)
      }
    },

    async onUpdate(val) {
      this.formData = val
      await this.$router.push({name: 'AdvanceDemandsUpdate', params: {id: val.id, data: val, type: 'UPDATE'}})
    },


  },
  created() {
    this.getListAdvanceDemands()
  }
}
</script>
