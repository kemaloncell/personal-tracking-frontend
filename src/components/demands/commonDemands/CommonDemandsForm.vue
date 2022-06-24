<template>
  <default-layout>
    <div slot="content">
      <div class="card">
        <div class="grid col-6 mt-5" style="margin: auto">
          <form @submit.prevent="submit">
            <h2 class="text-2xl font-bold" style="margin-bottom: 50px">
              Çalışan
            </h2>

            <div class="grid mt-5 flex align-items-center">

              <div class="col-2 text-sm">Başlık</div>
              <div class="col-4">
                <j-input-text
                    unmask
                    name="phoneNumber"
                    class="w-full p-inputtext-sm"
                    v-model="formData.title"
                    mask="(999) 999-99-99"
                />

              </div>

              <div class="col-2 text-sm">Talep mi?</div>
              <div class="col-4">
                <Checkbox
                    v-model="formData.isDemand"
                    :binary="true"
                ></Checkbox>
              </div>


              <div class="col-2 text-sm">İstek Durumu</div>
              <div class="col-4">
                <Dropdown
                    v-model="formData.status"
                    :options="RequestStatus"
                    optionLabel="code"
                    :showClear="true"
                    class="w-full h-full city-search p-inputtext-sm"
                />
              </div>

              <div class="col-2 text-sm">Açıklama</div>
              <div class="col-4">
                <Textarea
                    name="description"
                    class="w-full description-input"
                    v-model="formData.description"
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
                    v-model="formData.documentPath"
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
        </div>
      </div>
    </div>
  </default-layout>
</template>

<script>
import GlobalForm from '@/components/globalMixins/globalForm'
import commonDemandsMixins from './mixins/commonDemandsMixins'
import {RequestStatus} from "@/constants/enums";

export default {
  mixins: [commonDemandsMixins, GlobalForm],
  data: () => ({
    submitted: false,
  }),

  computed: {
    RequestStatus() {
      return RequestStatus
    },
  },
  methods: {
    async submit() {

      if (this.type === 'CREATE') {
        if (this.formData.documentPath) {
          await this.fileSubmit(this.formData)
        } else {
          await this.createSubmit(this.formData)
        }
      }

      if (this.type === 'UPDATE') {
        if (this.formData.documentPath) {
          await this.fileSubmit(this.formData)
        } else {
          await this.udpateSubmit(this.formData)
        }
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
  
  mounted() {
    if (this.$route.params.data) {
      this.formData = this.$route.params.data;
    }
  },

}
</script>
