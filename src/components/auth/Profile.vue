<template>
  <default-layout>
    <div slot="content">
      <div class="profile">
        <h3>Profil ayarları</h3>
        <div class="fields ">
          <div class="image flex align-center mb-3 ">
            <label for="inputtext-right" class="mr-3">Profil Resmini değiştir:</label>

            <j-image-upload @uploadFiles="onUpload($event)"></j-image-upload>

          </div>
          <div class="p-inputgroup  p-align-center col-4">
            <label for="inputtext-right" class="mr-3">Şifreni değiştir:</label>
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
  data() {
    return {
      changePassword: null,
    }
  },
  methods: {
    async onChangePasword() {
      try {
        await this.callChangePassword({
          password: this.changePassword
        })
      } catch {
        console.error('logout err')
      }
    },
    async onUpload(req) {
      try {
        if (req[0].file) {
          await this.callUploadFile(req[0].file)
        }
      } catch {
        console.error('upload err')
      }
    },
  }

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