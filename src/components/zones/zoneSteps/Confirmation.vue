<template>
  <div class="stepsdemo-content">
    <Card>
      <template #title>
        Confirmation
      </template>
      <template #content>
        <div class="field col-12">
          <label for="class">Bölge yetkili kişi: </label>
          <b>{{ formData.firstname ? formData.firstname : '-' }}</b>
        </div>
        <div class="field col-12">
          <label for="Age">Alan Şehir: </label>
          <b>{{ formData.city ? formData.city.name : '-' }}</b>
        </div>
        <div class="field col-12">
          <label for="Age">Bölge yetkili kişi: </label>
          <b>{{ formData.areaAuthName ? formData.areaAuthName : '-' }}</b>
        </div>
        <div class="field col-12">
          <label for="Age">Bölge İlçe</label>
          <b>{{ formData.District ? formData.District : '-' }}</b>
        </div>
        <div class="field col-12">
          <label for="Age">Bölge enlem: </label>
          <b>{{ formData.latitude ? formData.latitude : '-' }}</b>
        </div>
        <div class="field col-12">
          <label for="Age">Bölge Boylam</label>
          <b>{{ formData.longitude ? formData.longitude : '-' }}</b>
        </div>
        <div class="field col-12">
          <label for="Age">Card Number</label>
          <b>{{ formData.cardholderNumber ? formData.cardholderNumber : '-' }}</b>
        </div>
        <div class="field col-12">
          <label for="Age">Date</label>
          <b>{{ formData.date ? formData.date : '-' }}</b>
        </div>
        <div class="field col-12">
          <label for="Age">CVV</label>
          <b>{{ formData.cvv && formData.cvv.length === 3 ? '**' + formData.cvv[2] : '-' }}</b>
        </div>
      </template>
      <template #footer>
        <div class="grid grid-nogutter justify-content-between">
          <Button label="Back" @click="prevPage()" icon="pi pi-angle-left"/>
          <Button label="Complete" @click="complete()" icon="pi pi-check" iconPos="right" class="p-button-success"/>
        </div>
      </template>
    </Card>
  </div>
</template>
<script>
export default {
  props: {
    formData: Object
  },
  methods: {
    prevPage() {
      this.$emit('prevPage', {pageIndex: 3});
    },
    complete() {
      this.$emit('complete');
    }
  },
}

</script>