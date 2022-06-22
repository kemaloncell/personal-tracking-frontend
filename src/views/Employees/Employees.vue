<template>
  <default-layout>
    <div slot="content">

      <h2 class="text-center text-2xl font-medium mb-3">Çalışanlar</h2>
      <div
          class="flex mb-3 justify-content-between align-items-center mb-3 filters flex-wrap"
      >
        <div class="flex align-items-center">
          <Button @click="goCreatePage" class="p-button-primary add-button"
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

      <Toast position="top-right"/>

    </div>
  </default-layout>
</template>

<script>
import EmployeeList from "@/components/employees/EmployeeList";
import employeeMixin from "@/components/employees/mixins/employeeMixins";

export default {
  mixins: [employeeMixin],
  components: {
    EmployeeList,
  },
  data() {
    return {
      updateId: null,
    }
  },

  methods: {
    goCreatePage() {
      this.$router.push({name: 'Document', params: {type: 'CREATE'}});
    },

    async onUpdate(val) {
      this.updateId = val.id
      const item = await this.getEmployeeSingle(this.updateId)
      this.formData = item.data
      this.formData.taxOffice = item.data.TaxOffice
      await this.$router.push({name: 'EmployeeUpdate', params: {id: val.id, data: item.data, type: 'UPDATE'}})

    },


  },

  created() {
    this.getListEmployee()
  }
}
</script>