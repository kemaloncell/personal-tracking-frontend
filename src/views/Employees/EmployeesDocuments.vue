<template>
  <default-layout>
    <div slot="content">
      <h2 class="text-center text-2xl font-medium mb-3">Çalışan Dökümanları</h2>
      <div class="card">
        <h5 class="">Döküman Ekle</h5>
        <TabView>
          <TabPanel
              v-for="category in categoryList" :key="category.id" :header="category.name"
              v-if="filteredListData2 ? filteredListData2.id === category.id: true"
          >
            <employee-document-tab-page
                :category="category"
                :loading="submitLoading"
                :singleLoading="singleLoading"
                :defaultValues="defaultValues"
                :type="formType"
                @onSubmit="submit"

            />

          </TabPanel>
        </TabView>

      </div>

      <div class="py-2">

        <EmployeeDocumentList
            :data="employeeDocumentList"
            :loading="loading"
            @onUpdate="onUpdate"
            @onDelete="onDelete"
            @onSelection="onSelection"
        />

        <Toast position="top-right"/>

      </div>
    </div>
  </default-layout>
</template>

<script>
import employeeDocumentMixins from "@/components/employees/mixins/employeeDocumentMixins";
import EmployeeDocumentList from "@/components/employees/EmployeeDocumentList";
import EmployeeDocumentTabPage from "@/components/employees/EmployeeDocumentTabPage";

export default {
  mixins: [employeeDocumentMixins],
  components: {
    EmployeeDocumentList,
    EmployeeDocumentTabPage
  },
  data() {
    return {
      displayModal: false,
      formType: 'CREATE',
      defaultValues: null,
    }
  },

  computed: {
    filteredListData2() {
      return this.categoryList.find(item => {
        if (this.defaultValues != null) {
          return (item.id === this.defaultValues.EmployeeDocumentType.EmployeeDocumentCategory.id)
        }
      })
    },
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
    this.getAllEmployeeDocList(userId)
    this.getAllCategoryList()
    this.getAllDocTypeList()
  }
}
</script>