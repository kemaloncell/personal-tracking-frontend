<template>
  <div class="p-grid login">
    <div class="p-col-8">
      <Card class="p-d-flex p-justify-center loginCard">
        <template #title>
          <div>
            <h1>Login</h1>
          </div>
        </template>
        <template #content>
          <div class="p-inputgroup  p-col-12">
            <span class="p-inputgroup-addon"><i class="pi pi-user"></i></span>
            <InputText
                type="email"
                v-model.trim="$v.email.$model"
                placeholder="E-posta"
            />
            <span
                class="p-error text-xs mt-1"
                v-if="!$v.email.required && submitted"
            >
            E-Posta adresi giriniz.
          </span>
            <span
                class="p-error text-xs mt-1"
                v-if="!$v.email.email && submitted"
            >
            Geçersiz E-Posta.
          </span>
          </div>

          <div class="p-inputgroup p-col-12">
            <span class="p-inputgroup-addon"><i class="pi pi-key"></i></span>
            <password
                type="password"
                v-model="$v.password.$model"
                placeholder="Şifre"/>

            <span
                class="p-error text-xs mt-1"
                v-if="!$v.password.required && submitted"
            >
            Parola giriniz.
          </span>
            <span class="p-error text-xs mt-1" v-show="!isUserExist">
            Girdiğiniz E-posta adresi veya parola geçerli değil.
          </span>
          </div>
          <Spinner
              v-if="loading"
              style="width: 30px; height: 30px"
              class="flex justify-content-center mt-2"
          />
        </template>
        <template #footer>
          <div class="p-d-flex p-justify-center mt-5">
            <Button @click="login" :disabled="loading" icon="pi pi-check" label="Giriş yap" class="p-button-lg"/>
            <Button icon="pi pi-times" label="Vazgeç" class="p-button-lg p-button-secondary" style="margin-left: .5em"/>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import authMixin from "./mixins/authMixins";

export default {
  mixins: [authMixin],
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;
}

.loginCard {
  display: flex;
  align-items: center;
  height: 30rem;
}
</style>
