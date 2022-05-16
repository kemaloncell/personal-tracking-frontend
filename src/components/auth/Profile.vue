<template>
  <default-layout>
    <div slot="content">

      <div class="profile">
        <h3>Profil ayarları</h3>
        <div class="fields ">
          <div class="image p-d-flex p-align-center p-mb-3 ">
            <label for="inputtext-right" class="p-mr-3">Profil Resmini değiştir:</label>
            <FileUpload @upload="onUpload" mode="basic" name="demo[]" url="./upload" :auto="true" accept="image/*"/>
          </div>
          <div class="p-inputgroup  p-align-center p-col-4">
            <label for="inputtext-right" class="p-mr-3">Şifreni değiştir:</label>
            <InputText v-model="changePassword" placeholder="Keyword"/>
            <Button @click="onChangePasword" icon="pi pi-check" class="p-button-success"/>
          </div>
        </div>

      </div>

    </div>
  </default-layout>
</template>

<script>
import authMixin from "@/components/auth/mixins/authMixins";

export default {
  mixins: [authMixin],
  name: 'profile',
};
</script>

<style>
.profile {
  background-color: #F8F8FF;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
  max-width: 100%;
}
</style>