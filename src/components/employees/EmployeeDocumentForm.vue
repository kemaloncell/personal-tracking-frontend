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

      <div class="col-2 text-sm">Belgeler Geçerli mi?</div>
      <div class="col-4">
        <Checkbox
            v-model="formData.valid"
            :binary="true"
        ></Checkbox>
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

      <div class="col-2 text-sm">Detay</div>
      <div class="col-10 description-input">
        <Textarea
            name="address"
            class="w-full"
            v-model="formData.detail"
            maxLength="512"
        />
      </div>

      <hr class="w-full"/>
      <div class="col-12">
        <VueFileAgent
            ref="vueFileAgent"
            :deletable="true"
            :meta="true"
            :accept="'image/*'"
            :maxSize="'30.0MB'"
            :maxFiles="1"
            :helpText="'Lütfen bir dosya seçiniz.'"
            :errorText="{
      type: 'Geçersiz dosya türü. Lütfen sadece img,jpeg,png türünde resim dosyalarını seçiniz.',
      size: 'Dosya boyutu 10MB dan büyük olamaz.',
    }"
            @beforedelete="onBeforeDelete($event)"
            v-model="formData.file"
        ></VueFileAgent>

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
import employeeDocumentMixins from './mixins/employeeDocumentMixins'


export default {
  mixins: [employeeDocumentMixins, GlobalForm],
  data: () => ({
    submitted: false,
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

    onBeforeDelete: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1);
        var k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
      } else {
        if (confirm('Are you sure you want to delete?')) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
        }
      }
    },
  },

}
</script>
