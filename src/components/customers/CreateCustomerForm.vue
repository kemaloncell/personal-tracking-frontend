<template>
  <default-layout>
    <div slot="content">
      <form @submit.prevent="submit">
        <h2 class="text-2xl font-bold" style="margin-bottom: 50px">
          Hesap Oluştur
        </h2>
        <div class="grid mt-5 flex align-items-center">

          <div class="col-2 text-sm">Adı</div>
          <div class="col-4">
            <j-input-text
                name="name"
                class="w-full p-inputtext-sm"
                v-model="registerForm.name"
            />
          </div>

          <div class="col-2 text-sm">Email</div>
          <div class="col-4">
            <j-input-text
                name="surname"
                class="w-full p-inputtext-sm"
                v-model="registerForm.email"
            />
          </div>

          <div class="col-2 text-sm">Şifre</div>
          <div class="col-4">
            <j-input-text
                name="Passoword"
                class="w-full p-inputtext-sm"
                v-model="registerForm.password"

            />

          </div>

          <div class="col-2 text-sm">Mobil Tel</div>
          <div class="col-4">
            <j-input-text
                unmask
                name="phoneNumber"
                class="w-full p-inputtext-sm"
                v-model="registerForm.phone"
                mask="(999) 999-99-99"
            />

          </div>


          <div class="col-2 text-sm">Role</div>
          <div class="col-4 pt-0 pb-0">
            <j-role-type
                @onRoleType="onRoleType"
                :defaultRole="registerForm.Roles"
            />
          </div>


          <div
              class="flex justify-content-center w-full mt-5 mb-5 decline-button save-menu-button save-button"
          >
            <j-submitbutton
                v-if="type === 'CREATE'"
                :loading="loading"
                @save="submit"
            />
            <Button
                v-else
                :disabled="loading"
                label="Güncelle"
                class="save-primary-button ml-3"
                :loading="loading"
                @click="submit"
            />
            <Button
                :disabled="loading"
                @click="onClose"
                label="Vazgeç"
                class="p-button-danger ml-3"
            />
          </div>
        </div>
      </form>
    </div>
  </default-layout>
</template>

<script>
import GlobalForm from '@/components/globalMixins/globalForm'
import customerMixin from "@/components/customers/mixins/customerMixins";

export default {
  mixins: [GlobalForm, customerMixin],
  data: () => ({
    submitted: false,
    accountType: true,
    registerForm: {
      name: null,
      email: null,
      password: null,
      phone: null,
      Roles: null,
    },
  }),

  methods: {
    submit() {

      /*  this.$v.$touch()
           this.submitted = true

         if (this.$v.$invalid) {
           return
         }
   */

      if (this.type === 'CREATE') {
        this.createSubmit(this.registerForm, this.accountType)
        this.$router.push({name: 'Customer'});
      }

    },

    onClose() {
      this.$router.push({name: 'Customer'});

    },


    onRoleType(type) {
      if (type) {
        this.registerForm.Roles = type
      }
    },
  },

  mounted() {
    if (this.registerForm.name) {
      this.registerForm.name = this.formData.name
    }
    if (this.registerForm.phone) {
      this.registerForm.phone = this.formData.phone
    }
  }
}
</script>
