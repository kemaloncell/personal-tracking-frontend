<template>
  <default-layout>
    <div slot="content">
      <h2 class="text-center text-2xl font-medium mb-3">Çalışan Dökümanları</h2>
      <div class="card">
        <h5 class="">Döküman Ekle</h5>
        <TabView>
          <TabPanel v-for="category in categoryList" :key="category.id" :header="category.name">

            <!-- {{ documentList.filter(document => document.EmployeeDocumentCategory.id === category.id) }} -->

            <employee-document-tab-page
                :documentList="documentList" :category="category"/>
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
import EmployeeDocumentTabPage from "@/components/employees/EmployeeDocumentTabPage";

export default {
  mixins: [employeeDocumentMixins],
  components: {
    EmployeeDocumentList,
    EmployeeDocumentForm,
    EmployeeDocumentTabPage
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
    this.getAllCategoryList()
    this.getAllDocTypeList()
  }
}
</script>