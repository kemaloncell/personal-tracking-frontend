<template>
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
            v-model="formData.name"
        />
      </div>

      <div class="col-2 text-sm">Email</div>
      <div class="col-4">
        <j-input-text
            name="surname"
            class="w-full p-inputtext-sm"
            v-model="formData.email"
        />
      </div>


      <div class="col-2 text-sm">Mobil Tel</div>
      <div class="col-4">
        <j-input-text
            unmask
            name="phoneNumber"
            class="w-full p-inputtext-sm"
            v-model="formData.phone"
            mask="(999) 999-99-99"
        />

      </div>

      <div class="col-2 text-sm">Role</div>
      <div class="col-4 pt-0 pb-0">
        <j-education-level-type
            @onRoleType="onRoleType"
            :defaultRole="formData.Role"
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
</template>

<script>
import GlobalForm from '@/components/globalMixins/globalForm'


export default {
  mixins: [GlobalForm],
  data: () => ({
    submitted: false,
    formData: {
      name: null,
      surname: null,
      password: null,
      phone: null,
      Role: null,
    },
  }),

  methods: {
    submit(type) {

      /*  this.$v.$touch()
           this.submitted = true

         if (this.$v.$invalid) {
           return
         }
   */

      this.$emit('onSubmit', this.formData, type)

    },

    onClose() {
      this.$emit('close')
    },


    onRoleType(type) {
      if (type) {
        this.formData.Role = type
      }
    },
  },

}
</script>
