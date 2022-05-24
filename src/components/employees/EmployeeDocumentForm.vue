<template>
  <form @submit.prevent="submit">
    <h2 class="text-2xl font-bold" style="margin-bottom: 50px">
      Çalışan
    </h2>
    <div class="grid mt-5 flex align-items-center">

      <div class="col-2 text-sm">Doküman Tipi</div>
      <div class="col-4 pt-0 pb-0">
        <j-employee-document-type
            @onEmployeeDocument="onEmployeeDocument"
            :defaultEmployeeDocument="formData.EmployeeDocumentType"
        />
        
      </div>

      <div class="col-2 text-sm">Atif/Pasif</div>
      <div class="col-4">
        <checkbox
            v-model="formData.valid"
            :true-value="true"
            :false-value="false"
        ></checkbox>
      </div>


      <div class="col-2 text-sm">Düzenleme Tarihi</div>
      <div class="col-4">
        <j-date
            class="w-full p-inputtext-sm"
            v-model="formData.issueDate"
            :defaultValue="formData.issueDate"
            @onSelect="
                (issueDate) => {
                  formData.issueDate = issueDate
                }
              "
        ></j-date>

      </div>

      <div class="col-2 text-sm">Geçerlilik Tarihi</div>
      <div class="col-4">
        <j-date
            class="w-full p-inputtext-sm"
            v-model="formData.expiryDate"
            :defaultValue="formData.expiryDate"
            @onSelect="
                (expiryDate) => {
                  formData.expiryDate = expiryDate
                }
              "
        ></j-date>

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
import employeeDocumentMixins from './mixins/employeeDocumentMixins'


export default {
  mixins: [employeeDocumentMixins, GlobalForm],
  data: () => ({
    submitted: false,
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

    onEmployeeDocument(type) {
      if (type) {
        this.formData.EmployeeDocumentType = type
      }
    },

    onEducationType(type) {
      if (type) {
        this.formData.EducationLevel = type
      }
    },
    /*  onSelectCity(city) {
        if (city) {
          this.formData.Address.City = city
        }
      },

      onSelectDistrict(district) {
        if (district) {
          this.formData.Address.District = district
        }
      },

      onTaxOffice(taxOffice) {
        if (taxOffice) {
          this.formData.TaxOffice = taxOffice
        }
      }, */


  },

}
</script>
