<template>
  <div class="stepsdemo-content">
    <Card>
      <template #title>
        Confirmation
      </template>
      <template #content>
        <div class="field col-12">
          <label class="mr-1" for="class">Bölge yetkili kişi: </label>
          <b>{{ formData.firstname ? formData.firstname : '-' }}</b>
        </div>
        <div class="field col-12">
          <label class="mr-1" for="Age">Alan Şehir: </label>
          <b>{{ formData.city ? formData.city.name : '-' }}</b>
        </div>
        <div class="field col-12">
          <label class="mr-1" for="Age">Alan yetkili kişi: </label>
          <b>{{ formData.areaAuthName ? formData.areaAuthName : '-' }}</b>
        </div>
        <div class="field col-12">
          <label class="mr-1" for="Age">Bölge İlçe:</label>
          <b>{{ formData.district.name ? formData.district.name : '-' }}</b>
        </div>
        <div class="field col-12">
          <label class="mr-1" for="Age">Bölge enlem:</label>
          <b>{{ formData.latitude ? formData.latitude : '-' }}</b>
        </div>
        <div class="field col-12">
          <label class="mr-1" for="Age">Bölge Boylam:</label>
          <b>{{ formData.longitude ? formData.longitude : '-' }}</b>
        </div>
        <div class="field col-12">
          <label class="mr-1" for="Age">Bölgeye atanan çalışan:</label>
          <b>{{ formData.employee.name ? formData.employee.name : '-' }}</b>
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