<template>
  <default-layout>
    <div slot="content">

      <h2 class="text-center text-2xl font-medium mb-3">Çalışanlar</h2>
      <div
          class="flex mb-3 justify-content-between align-items-center mb-3 filters flex-wrap"
      >
        <div class="flex align-items-center">
          <Button @click="openModal" class="p-button-primary add-button"
          >Çalışan Ekle
          </Button
          >

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

      <Toast position="top-right"/>

    </div>
  </default-layout>
</template>

<script>
import EmployeeList from "@/components/employees/EmployeeList";
import EmployeesForm from "@/components/employees/EmployeeForm";
import employeeMixin from "@/components/employees/mixins/employeeMixins";

export default {
  mixins: [employeeMixin],
  components: {
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