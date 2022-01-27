<template>
  <div class="p-grid login">
    <div class="p-col-8">
      <Card class="p-d-flex p-justify-center loginCard">
        <template #title>
          <div>
            <h1>Müşavir Admin Panel </h1>
          </div>
        </template>
        <template #content>

          <div class="p-inputgroup  p-col-12">
            <span class="p-inputgroup-addon"><i class="pi pi-user"></i></span>
            <InputText placeholder="E-posta" />
          </div>

          <div class="p-inputgroup p-col-12">
            <span class="p-inputgroup-addon"><i class="pi pi-key"></i></span>
            <password placeholder="Şifre"  />
          </div>

        </template>
        <template #footer>
          <div class="p-d-flex p-justify-center mt-5">
          <Button icon="pi pi-check" label="Giriş yap"  class="p-button-lg"/>
          <Button icon="pi pi-times" label="Vazgeç" class="p-button-lg p-button-secondary" style="margin-left: .5em" />
          </div>
        </template>
      </Card>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.login{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;
}
.loginCard{
  display: flex;
  align-items: center;
  height: 30rem;
}
</style>