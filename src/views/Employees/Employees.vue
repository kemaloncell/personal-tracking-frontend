<template>
  <default-layout>
    <div slot="content">

      <h2 class="text-center text-2xl font-medium mb-3">Çalışanlar</h2>
      <TabView>
        <TabPanel header="Çalışan Ekle">
          <div
              class="flex mb-3 justify-content-between align-items-center mb-3 filters flex-wrap"
          >
            <div class="flex align-items-center">
              <Button @click="openModal" class="p-button-primary add-button"
              >Çalışan Ekle
              </Button
              >

              <!-- <SplitButton
                   class="ml-4 decline-button save-menu-button save-button"
                   label="Toplu İşlemler"
                   :model="multipleItems"
                   v-if="selectedItems.length > 0"
               ></SplitButton>
               <div class="ml-4">
                 <span class="p-input-icon-left">
                   <i class="pi pi-search"/>
                   <InputText
                       v-model.trim="searchQuery"
                       type="text"
                       placeholder="Ara"
                       class="pr-6"
                       @input="callFilter"
                   />
                 </span>
               </div> -->
            </div>
          </div>

          <EmployeeList
              :data="list"
              :loading="loading"
              @onUpdate="onUpdate"
              @onDelete="onDelete"
              @onSelection="onSelection"
          />

          <j-modal :visible.sync="displayModal" width="800px">
            <template slot="content">
              <employees-form
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


        <TabPanel header="Döküman Ekle">
          <div
              class="flex mb-3 justify-content-between align-items-center mb-3 filters flex-wrap"
          >
            <div class="flex align-items-center">
              <Button @click="openModal" class="p-button-primary add-button"
              >Döküman Ekle
              </Button
              >

              <!-- <SplitButton
                   class="ml-4 decline-button save-menu-button save-button"
                   label="Toplu İşlemler"
                   :model="multipleItems"
                   v-if="selectedItems.length > 0"
               ></SplitButton>
               <div class="ml-4">
                 <span class="p-input-icon-left">
                   <i class="pi pi-search"/>
                   <InputText
                       v-model.trim="searchQuery"
                       type="text"
                       placeholder="Ara"
                       class="pr-6"
                       @input="callFilter"
                   />
                 </span>
               </div> -->
            </div>
          </div>
          <EmployeeDocumentList
              :data="documentList"
              :loading="loading"
              @onUpdate="onUpdate"
              @onDelete="onDelete"
              @onSelection="onSelection"
          />
        </TabPanel>
      </TabView>
      <Toast position="top-right"/>

    </div>
  </default-layout>
</template>

<script>
import EmployeeList from "@/components/employees/EmployeeList";
import EmployeesForm from "@/components/employees/EmployeesForm";
import employeeMixin from "@/components/employees/mixins/employeeMixins";
import EmployeeDocumentList from "@/components/employees/EmployeeDocumentList";

export default {
  mixins: [employeeMixin],
  components: {
    EmployeeDocumentList,
    EmployeeList,
    EmployeesForm
  },
  data() {
    return {
      displayModal: false,
      formType: 'CREATE',
      defaultValues: null,
      updateId: null,
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
        console.log(data, type, 'gelid')
        this.createSubmit(data, type)
      }

      if (this.formType === 'UPDATE') {
        this.udpateSubmit(data)
      }
    },


  },

  created() {
    this.getListEmployee()
  }
}
</script>