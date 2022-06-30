<template>

  <div class="stepsdemo-content">
    <Card>
      <template #title>
        Alan Bilgileri
      </template>
      <template #subtitle>
        Alan bilgilerinizi giriniz.
      </template>
      <template #content>
        <div class="p-fluid formgrid grid">
          <div class="field col-12">
            <label for="class">Yetkili kişi</label>
            <InputText type="text" class="p-inputtext-sm" v-model="areaAuthName"/>
          </div>

          <div class="field  col-8">
            <label for="class">İlçe</label>
            <j-district
                required
                @onSelectDistrict="onSelectDistrict"
                :defaultCity="formData.city.id "
                :defaultDistrict="District"
                v-model="District"
            />
          </div>

          <div class="field col-2">
            <label id="date" for="date">Enlem</label>
            <InputText id="date" placeholder="38.37" class="p-inputtext-sm" v-model="latitude"/>
          </div>
          <div class="field col-2">
            <label for="cvv">Boylam</label>
            <InputText id="cvv" placeholder="30.37" class="p-inputtext-sm" unmask v-model="longitude"/>

          </div>
        </div>

      </template>
      <template #footer>
        <div class="grid grid-nogutter justify-content-between">
          <Button label="Geri" @click="prevPage()" icon="pi pi-angle-left"/>
          <Button label="İleri" @click="nextPage()" icon="pi pi-angle-right" iconPos="right"/>

        </div>
      </template>
    </Card>
  </div>

</template>
<script>
export default {
  data() {
    return {
      areaAuthName: '',
      District: '',
      latitude: '',
      longitude: '',
    }
  },

  props: {
    formData: Object
  },

  methods: {

    nextPage() {
      this.$emit('nextPage', {
        formData: {
          areaAuthName: this.areaAuthName,
          district: this.District,
          latitude: this.latitude,
          longitude: this.longitude,
        }, pageIndex: 1
      });
    },
    prevPage() {
      this.$emit('prevPage', {pageIndex: 1});
    },

    onSelectDistrict(district) {
      if (district) {
        this.District = district
      }
    },

  },

}
</script>