<template>
  <form @submit.prevent="submit">

    <div class="grid  justify-content-start mt-5 flex align-items-center">

      <div class="col-2 text-sm">Adı</div>
      <div class="col-4">
        <j-input-text
            unmask
            name="name"
            class="w-full p-inputtext-sm"
            v-model="formData.name"

            mask="(999) 999-99-99"
        />
      </div>

      <div class="col-2 text-sm">Soyadı</div>
      <div class="col-4">

        <j-input-text
            unmask
            name="surname"
            class="w-full p-inputtext-sm"
            v-model="formData.surname"
            mask="(999) 999-99-99"
        />
      </div>


      <div class="col-2 text-sm pb-0">
        TC Kimlik No <span class="p-error">*</span>
      </div>
      <div class="col-4 pb-0 ">

        <InputText
            name="identityNumber"
            class="w-full p-inputtext-sm"
            v-model.trim="formData.tcNumber"
            maxLength="11"
            autocomplete="off"
        />
      </div>

      <div class="col-2 text-sm">Mobil Tel</div>
      <div class="col-4 ">
        <j-input-text
            unmask
            name="phoneNumber"
            class="w-full p-inputtext-sm"
            v-model="formData.phone"
            mask="(999) 999-99-99"
        />

      </div>

      <div class="col-2 text-sm">Doğum Tarihi</div>
      <div class="col-4 ">
        <j-date
            class="w-full p-inputtext-sm"
            v-model="formData.birthDate"
            :defaultValue="formData.birthDate"
            @onSelect="
                (birthDate) => {
                  formData.birthDate = birthDate
                }
              "
        ></j-date>

      </div>

      <div class="col-2 text-sm">Kullanıcı Tipi</div>
      <div class="col-4 ">
        <j-employee-type
            @onEmployeeType="onEmployeeType"
            :defaultEmployee="formData.EmployeeType"
        />
      </div>


      <div class="col-2 text-sm">Eğitim Durumu</div>
      <div class="col-4 ">
        <j-education-level-type
            @onEducationType="onEducationType"
            :defaultEducation="formData.EducationLevel"
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
import {
  maxLength,
  required,
} from 'vuelidate/lib/validators'
import GlobalForm from '@/components/globalMixins/globalForm'
import employeeMixin from './mixins/employeeMixins'

export default {
  mixins: [employeeMixin, GlobalForm],
  data: () => ({
    submitted: false
  }),

  props: {
    defaultEmployee: {
      type: Object,
      default: () => ({}),
    },
  },

  watch: {
    defaultEmployee: {
      handler(val) {
        this.formData = val
      },
      deep: true,
    },
  },

  validations() {
    const validation = {
      formData: {
        name: {
          maxLength: maxLength(128),
          required
        },
        surname: {
          maxLength: maxLength(128),
          required
        },
      }
    }

    return validation
  },


  methods: {
    async submit() {

      this.$v.$touch()
      this.submitted = true

      if (this.$v.$invalid) {
        return
      }

      if (this.type === 'CREATE') {
        this.createSubmit(this.formData)
      }

      if (this.type === 'UPDATE') {
        this.udpateSubmit(this.formData)
      }
    },


    onClose() {
      this.$router.push({name: 'Employee'});
    },

    onEmployeeType(type) {
      if (type) {
        this.formData.EmployeeType = type
      }
    },

    onEducationType(type) {
      if (type) {
        this.formData.EducationLevel = type
      }
    },

  },


}
</script>
