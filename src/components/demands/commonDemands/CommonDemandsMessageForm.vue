<template>
  <div>
    <form @submit.prevent="submit">
      <h2 class="text-2xl font-bold" style="margin-bottom: 50px">
        Mesaj
      </h2>
      <div class="grid mt-5 flex align-items-center">

        <div class="col-2 text-sm">Açıklama:</div>
        <div class="col-10 description-input">
        <Textarea
            name="address"
            class="w-full"
            v-model.trim="formData.description"
            maxLength="512"
        />
        </div>

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
              v-model="formData.documentPath"
          ></VueFileAgent>

        </div>
        <div
            class="flex justify-content-center w-full mt-5 mb-5 decline-button save-menu-button save-button"
        >
          <j-submitbutton
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
</template>

<script>
import GlobalForm from '@/components/globalMixins/globalForm'
import commonDemandsMessageMixins from './mixins/commonDemandsMessageMixins'

export default {
  mixins: [commonDemandsMessageMixins, GlobalForm],
  components: {},
  data: () => ({
    submitted: false,

  }),

  props: {
    type: {
      type: String,
      default: 'CREATE',
    },
    defaultDemands: {
      type: Object,
      default: () => ({}),
    },
  },

  watch: {
    defaultDemands: {
      handler(newVal) {
        this.demandId = newVal.id
      },
      deep: true,
    },
  },

  methods: {
    async submit() {
      if (this.formData.documentPath) {
        console.log(this.formData.demandId, 'demands')
        await this.fileSubmit(this.formData)
      } else {
        await this.createSubmit(this.formData)
      }

    },

    onClose() {
      this.$router.push({name: 'CommonDemandsList'})
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
