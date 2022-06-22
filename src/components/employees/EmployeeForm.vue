<template>
  <default-layout>
    <div slot="content">
      <form @submit.prevent="submit">
        <h2 class="text-2xl text-center font-bold" style="margin-bottom: 20px">
          Çalışan
        </h2>

        <div class="flex-column justify-content-start mt-5 flex align-items-center">


          <div class="col-4 flex pb-4">
            <div class="col-3 text-sm">Adı</div>
            <j-input-text
                unmask
                name="name"
                class="w-full p-inputtext-sm"
                v-model="formData.name"
                mask="(999) 999-99-99"
            />
          </div>


          <div class="col-4 flex  pb-4">
            <div class="col-3 text-sm">Soyadı</div>
            <j-input-text
                unmask
                name="surname"
                class="w-full p-inputtext-sm"
                v-model="formData.surname"
                mask="(999) 999-99-99"
            />
          </div>


          <div class="col-4 pb-0 flex  pb-4">
            <div class="col-3 text-sm pb-0">
              TC Kimlik No <span class="p-error">*</span>
            </div>
            <InputText
                name="identityNumber"
                class="w-full p-inputtext-sm"
                v-model.trim="formData.tcNumber"
                maxLength="11"
                autocomplete="off"
            />
          </div>


          <div class="col-4 flex  pb-4">
            <div class="col-3 text-sm">Mobil Tel</div>
            <j-input-text
                unmask
                name="phoneNumber"
                class="w-full p-inputtext-sm"
                v-model="formData.phone"
                mask="(999) 999-99-99"
            />

          </div>

          <div class="col-4 flex  pb-4">
            <div class="col-3 text-sm">Doğum Tarihi</div>
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


          <div class="col-4 flex pb-4">
            <div class="col-3 text-sm flex">Kullanıcı Tipi</div>
            <j-employee-type
                @onEmployeeType="onEmployeeType"
                :defaultEmployee="formData.EmployeeType"
            />
          </div>


          <div class="col-4 flex">
            <div class="col-3 text-sm">Eğitim Durumu</div>
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
              :type="formType"
              :employeeDetailId="detailId"
              @onSubmit="accountSubmit"
              @close="closeModal"
          />
        </template>
      </j-modal>
    </div>
  </default-layout>
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
    accountType: true,
    detailId: null,
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

  mounted() {

    if (this.type === 'CREATE') {
      this.resetForm()
    } else {
      this.type = this.$route.params.type
      this.formData = this.$route.params.data
    }
  }

}
</script>
