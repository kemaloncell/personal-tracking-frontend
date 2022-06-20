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
                :loading="loading"
                @save="submit"
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
import {mapActions} from "vuex";


export default {
  mixins: [GlobalForm],
  data: () => ({
    submitted: false,
    registerForm: {
      name: null,
      email: null,
      password: null,
      phone: null,
      Roles: null,
      detailId: null,
    },
  }),

  props: {
    employeeDetailId: {
      type: Number,
    },
  },

  watch: {
    employeeDetailId(val) {
      console.log(val, 'val')
    },
  },

  methods: {
    ...mapActions({
      createCustomer: 'customer/create',
      createEmployee: 'employee/create',
      callRegister: 'auth/callRegister',
    }),

    async submit() {

      /* this.$router.beforeEach((to, from, next) => {
         if (to.path === 'customer') {
           try {
             await this.createCustomer(this.registerForm)
             this.$toast.add({
               severity: 'success',
               summary: 'Başarılı',
               detail: 'Müşteri ekleme başarılı !',
               life: 3000
             })
           } catch {
             this.$toast.add({
               severity: 'error',
               summary: 'Başarısız',
               detail: 'Müşteri ekleme başarısız !',
               life: 3000
             })
           } finally {
             this.$router.push({name: 'Customer'})
           }

         } else if (to.path === '/employee') {
           try {
             await this.createEmployee(this.registerForm)
             this.$toast.add({
               severity: 'success',
               summary: 'Başarılı',
               detail: 'Çalışan ekleme başarılı !',
               life: 3000
             })
           } catch {
             this.$toast.add({
               severity: 'error',
               summary: 'Başarısız',
               detail: 'Çalışan ekleme başarısız !',
               life: 3000
             })
           } finally {
             this.$router.push({name: 'Employee'})
           }
         }
       }) */

    },

    onClose() {
      this.$router.push(this.$router.history._startLocation)
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
