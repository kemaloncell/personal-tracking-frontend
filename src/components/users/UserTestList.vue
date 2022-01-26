<template>
  <div class="p-col-6">
    <Card>
      <template #title>
        <h3 class="p-d-flex p-justify-center">Test Kullanıcı Ekle</h3>
      </template>
      <template #content>

        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-6">
            <label for="firstname6">Kullanıcı Adı</label>
            <InputText id="firstname6" type="text" />
          </div>
          <div class="p-field p-col-12 p-md-6">
            <label for="lastname6">Kullanıcı Soyadı</label>
            <InputText id="lastname6" type="text" />
          </div>
          <div class="p-field p-col-12 p-md-6">
            <label for="eposta">Kullanıcı Eposta</label>
            <InputText id="eposta" type="text" />
          </div>
          <div class="p-field p-col-12 p-md-3">
            <label for="password">Kullanıcı Şifre</label>
            <InputText id="password" type="text" />
          </div>
          <div class="p-field p-col-12 p-md-3">
            <label for="confirm_password">Kullanıcı Şifre Tekrar</label>
            <InputText id="confirm_password" type="text" />
          </div>
          <div class="p-field p-col-12 p-md-6">
            <label for="eposta">Mobil Telefon Numaranız</label>
            <InputText id="phone" type="text" />
          </div>
          <div class="p-field p-col-12 p-md-3">
            <label for="code">Kullanıcı Kod</label>
            <InputText id="code" type="text" />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="p-d-flex p-justify-center">
          <Button icon="pi pi-check" label="Save" />
          <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
        </div>
      </template>
    </Card>

  </div>
</template>
<script>

export default {
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