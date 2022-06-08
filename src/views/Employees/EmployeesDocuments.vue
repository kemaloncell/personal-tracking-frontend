<template>
  <default-layout>
    <div slot="content">
      <h2 class="text-center text-2xl font-medium mb-3">Çalışan Dökümanları</h2>
      <div class="card">
        <h5 class="">Döküman Ekle</h5>
        <TabView>

          <TabPanel header="Özlük Bilgileri Ekle">

            <j-modal :visible.sync="displayModal" width="800px">
              <template slot="content">
                <employee-document-form
                    :loading="submitLoading"
                    :singleLoading="singleLoading"
                    :defaultValues="defaultValues"
                    :type="formType"
                    @onSubmit="submit"
                    @close="closeModal"
                />
              </template>
            </j-modal>
          </TabPanel>
          <TabPanel header="Giriş Belgesi Ekle">
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
              odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.</p>
          </TabPanel>
          <TabPanel header="Atış Belgesi Ekle">
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
              atque corrupti quos dolores et quas molestias excepturi sint occaecati
              cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et
              dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>
          </TabPanel>
          <TabPanel header="Eğitim Belgesi Ekle">
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
              atque corrupti quos dolores et quas molestias excepturi sint occaecati
              cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et
              dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>
          </TabPanel>
          <TabPanel header="Sağlık Belgesi Ekle">
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
              atque corrupti quos dolores et quas molestias excepturi sint occaecati
              cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et
              dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>
          </TabPanel>
        </TabView>
      </div>


      <!--<div
          class="flex mb-3 justify-content-between align-items-center mb-3 filters flex-wrap"
      >
        <div class="flex align-items-center">
          <Button @click="openModal" class="p-button-primary add-button"
          >Döküman Ekle
          </Button
          >

        </div>
      </div> -->

      <EmployeeDocumentList
          :data="documentList"
          :loading="loading"
          @onUpdate="onUpdate"
          @onDelete="onDelete"
          @onSelection="onSelection"
      />

      <Toast position="top-right"/>

    </div>
  </default-layout>
</template>

<script>
import employeeDocumentMixins from "@/components/employees/mixins/employeeDocumentMixins";
import EmployeeDocumentList from "@/components/employees/EmployeeDocumentList";
import EmployeeDocumentForm from "@/components/employees/EmployeeDocumentForm";

export default {
  mixins: [employeeDocumentMixins],
  components: {
    EmployeeDocumentList,
    EmployeeDocumentForm
  },
  data() {
    return {
      displayModal: false,
      formType: 'CREATE',
      defaultValues: null,
      docTypeId: null,
    }
  },

  methods: {
    openModal() {
      this.displayModal = true;
    },

    closeModal() {
      this.displayModal = false
      this.defaultValues = null
      this.formType = 'CREATE'

      this.resetForm()
    },

    async submit(data, type) {


      if (this.formType === 'CREATE') {
        if (data.file) {
          this.fileSubmit(data, type)
        } else {
          await this.createSubmit(data, type)
        }
      }

      if (this.formType === 'UPDATE') {
        if (data.file) {
          this.fileSubmit(data)
        } else {
          await this.udpateSubmit(data)
        }
      }
    },


  },

  created() {
    const userId = this.$route.params.id
    this.getEmployeeDocumentSingle(userId)
  }
}
</script>