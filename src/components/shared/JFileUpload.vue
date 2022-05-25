<template>
  <div>
    <VueFileAgent
        ref="vueFileAgent"
        :deletable="true"
        :meta="true"
        :accept="'image/*,zip,rar,pdf'"
        :maxSize="'30.0MB'"
        :maxFiles="1"
        :helpText="'Lütfen bir dosya seçiniz.'"
        :errorText="{
      type: 'Geçersiz dosya türü. Lütfen sadece img,jpeg,png türünde resim dosyalarını seçiniz.',
      size: 'Dosya boyutu 10MB dan büyük olamaz.',
    }"
        @select="filesSelected($event)"
        @beforedelete="onBeforeDelete($event)"
        @delete="fileDeleted($event)"
        v-model="photo"
    ></VueFileAgent>
    <button :disabled="!fileRecordsForUpload.length" @click="uploadFiles()">
      Upload {{ fileRecordsForUpload.length }} files
    </button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      photo: [],
      fileRecordsForUpload: []
    }
  },
  methods: {
    uploadFiles: function () {
      // Using the default uploader. You may use another uploader instead.
      if (this.photo.length > 0) {
        this.$emit('uploadFiles', this.photo)
      }

      this.fileRecordsForUpload = [];
    },
    deleteUploadedFile: function (fileRecord) {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.deleteUpload(this.uploadUrl, this.uploadHeaders, fileRecord);
    },
    filesSelected: function (fileRecordsNewlySelected) {
      var validFileRecords = fileRecordsNewlySelected.filter((fileRecord) => !fileRecord.error);
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords);
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
    fileDeleted: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },
  },
}
</script>