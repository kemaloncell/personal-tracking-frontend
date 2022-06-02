<template>
  <div>
    <form @submit.prevent="submit">
      <div class="flex justify-content-between">
        <h2 class="text-2xl font-bold" style="margin-bottom: 20px">
          Çalışan
        </h2>

        <Button
            v-tooltip.top="'Kullanıcı için hesap oluşturmak için tıklayın'"
            v-if="formData.id"
            :disabled="loading"
            @click="openModal"
            label="Hesap Oluştur"
            icon="pi pi-user"
            class="p-button-sm p-button-rounded p-button-info p-button-outlined"
        />
      </div>
      <div class="grid mt-5 flex align-items-center">

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
        <div class="col-4 pb-0">
          <InputText
              name="identityNumber"
              class="w-full p-inputtext-sm"
              v-model.trim="formData.tcNumber"
              maxLength="11"
              autocomplete="off"
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
        <div class="col-2 text-sm">Doğum Tarihi</div>
        <div class="col-4">
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

        <hr class="w-full"/>

        <div class="col-2 text-sm">Kullanıcı Tipi</div>
        <div class="col-4 pt-0 pb-0">
          <j-employee-type
              @onEmployeeType="onEmployeeType"
              :defaultEmployee="formData.EmployeeType"
          />
        </div>

        <div class="col-2 text-sm">Eğitim Durumu</div>
        <div class="col-4 pt-0 pb-0">
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
    <j-modal :visible.sync="displayModal" width="800px">
      <template slot="content">
        <create-employee-form
            :loading="submitLoading"
            :singleLoading="singleLoading"
            :defaultValues="defaultValues"
            :type="formType"
            @onSubmit="submit"
            @close="closeModal"
        />
      </template>
    </j-modal>
  </div>
</template>

<script>
import {
  maxLength,
  required,
} from 'vuelidate/lib/validators'
import GlobalForm from '@/components/globalMixins/globalForm'
import employeeMixin from './mixins/employeeMixins'
import CreateEmployeeForm from "@/components/employees/CreateEmployeeForm";

export default {
  components: {CreateEmployeeForm},
  mixins: [employeeMixin, GlobalForm, CreateEmployeeForm],
  data: () => ({
    submitted: false,
    displayModal: false,
    formType: 'CREATE',
    defaultValues: null,
  }),


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
    submit(type) {

      this.$v.$touch()
      this.submitted = true

      if (this.$v.$invalid) {
        return
      }

      this.$emit('onSubmit', this.formData, type)

    },


    onClose() {
      this.$emit('close')
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


    // MODAL PRPOPERTY
    openModal() {
      console.log('openModal')
      this.displayModal = true;
    },

    closeModal() {
      this.displayModal = false
      this.defaultValues = null
      this.formType = 'CREATE'

      this.resetForm()
    },

  },

}
</script>
