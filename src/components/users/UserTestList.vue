<template>
  <div class="p-col-6">
    <Card>
      <template #title>
        <h3 class="p-d-flex p-justify-center">Test Kullanıcı Ekle</h3>
      </template>
      <template #content>

        <div class="p-fluid p-form grid p-grid">
          <div class="p-field p-col-12 p-md-6">
            <label for="eposta">Kodun Sahibi</label>
            <InputText id="phone" type="text" />
          </div>
          <div class="p-field p-col-12 p-md-3">
            <label for="code">Kullanıcı Kod</label>
            <InputText id="code" type="text" />
          </div>
          <div class="p-field p-col-12 p-md-4">
            <label for="icon"></label>
            <Calendar id="icon" v-model="date3" :showIcon="true" />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="p-d-flex p-justify-center">
          <Button icon="pi pi-check" label="Save" />
        </div>
      </template>
    </Card>

  </div>
</template>
<script>
import usersMixins from "@/components/users/mixins/usersMixins";
export default {
  mixins: [usersMixins],
  data() {
    return {
      selectedState: null,
      states: [
        {name: 'Arizona', code: 'Arizona'},
        {name: 'California', value: 'California'},
        {name: 'Florida', code: 'Florida'},
        {name: 'Ohio', code: 'Ohio'},
        {name: 'Washington', code: 'Washington'}
      ],
      cities1: [],
      cities2: [],
      city1: null,
      city2: null
    }
  }
}
</script>