<template>
  <default-layout>
    <div slot="content">

      <i @click="goEmployee" class="pi pi-arrow-left font-bold mb-4" style="font-size: 1.3rem"></i>

      <p class="font-medium "> {{ getNameSurname }}</p>
      <div class="card">
        <TabView style="margin-left: 15rem; width: 70%">
          <TabPanel v-if="displayTab" :header="tabName">

            <employee-form
                :loading="submitLoading"
                :singleLoading="singleLoading"
                :defaultEmployee="employeeData"
                :type="EmployeeformType"
            />

          </TabPanel>
          <TabPanel v-if="displayTab" :header="'Hesap Oluştur'">
            <create-employee-form
                :loading="submitLoading"
                :singleLoading="singleLoading"
                :type="formType"
            />

          </TabPanel>
          <TabPanel
              v-for="category in categoryList" :key="category.id" :header="category.name"
              v-if="filteredListData ? filteredListData.id === category.id: true"
          >
            <employee-document-tab-page
                :category="category"
                :loading="submitLoading"
                :singleLoading="singleLoading"
                :defaultValues="defaultValues"
                :type="formType"
            />
          </TabPanel>

        </TabView>

      </div>
      <h2 class="text-center text-2xl font-medium ">Çalışan Dökümanları Listesi</h2>
      <EmployeeDocumentList
          :data="employeeDocumentList"
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
import EmployeeDocumentTabPage from "@/components/employees/EmployeeDocumentTabPage";
import CreateEmployeeForm from "@/components/employees/CreateEmployeeForm";
import EmployeeForm from "@/components/employees/EmployeeForm";

export default {
  mixins: [employeeDocumentMixins],
  components: {
    EmployeeDocumentList,
    EmployeeDocumentTabPage,
    CreateEmployeeForm,
    EmployeeForm
  },
  data() {
    return {
      employeeData: null,
      displayTab: true,
      EmployeeformType: null,
      formType: 'CREATE',
      defaultValues: null,
    }
  },

  computed: {
    filteredListData() {
      return this.categoryList.find(item => {
        if (this.defaultValues != null) {
          return (item.id === this.defaultValues.EmployeeDocumentType.EmployeeDocumentCategory.id)
        }
      })
    },

    getNameSurname() {
      if (this.employeeData != null) {
        return 'Seçilen çalışan:' + ' ' + this.employeeData.name + ' ' + this.employeeData.surname
      } else {
        return 'Çalışan Bilgileri'
      }

      if (this.$route.params != null) {
        return 'Seçilen çalışan:' + ' ' + this.$route.params.data.name + ' ' + this.$route.params.data.surname
      } else {
        return 'Çalışan Bilgileri'
      }
    },
    tabName() {
      if (this.$route.params.type) {
        return this.$route.params.type === 'CREATE' ? 'Çalışan Oluştur' : 'Çalışan Düzenle';
      } else {
        return 'Çalışan Oluştur';
      }
    },
  },

  methods: {

    goEmployee() {
      this.$router.push({name: 'Employee'})
    },
  },

  mounted() {
    if (!this.$route.params.isShow) {
      this.EmployeeformType = this.$route.params.type
      this.$route.params.data != null ? this.employeeData = this.$route.params.data : this.employeeData = null
    } else {
      this.EmployeeformType = 'CREATE'
    }


  },

  created: function () {
    const userId = this.$route.params.id
    this.getAllEmployeeDocList(userId)
    this.getAllCategoryList()
    this.getAllDocTypeList()
  }
}
</script>