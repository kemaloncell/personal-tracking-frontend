<template>
  <div class="stepsdemo-content">
    <Card>
      <template #title>
        Çalışan Bilgileri
      </template>
      <template #subtitle>
        Alana atanacak çalışan seçiniz.
      </template>
      <template #content>
        <div class="field col-12">
          <label for="class">Çalışanlar</label>
          <j-employees
              @onEmployee="onEmployee"
              :defaultEmployee="Employee"

          />
          <small v-show="$v.Employee.$invalid && submitted" class=" p-error">Çalışan seçimi gereklidir.</small>

        </div>
      </template>
      <template #footer>
        <div class="grid grid-nogutter justify-content-between">
          <Button label="Geri" @click="prevPage()" icon="pi pi-angle-left"/>
          <Button label="İleri" @click="nextPage(!$v.$invalid)" icon="pi pi-angle-right" iconPos="right"/>
        </div>
      </template>
    </Card>
  </div>
</template>
<script>
import {required} from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      submitted: false,
      Employee: '',
    }
  },
  validations: {
    Employee: {
      required
    },
  },
  methods: {
    nextPage(isFormValid) {
      this.submitted = true;
      if (!isFormValid) {
        return;
      }

      this.$emit('nextPage', {
        formData: {
          employee: this.Employee
        }, pageIndex: 2
      });
    },
    prevPage() {
      this.$emit('prevPage', {pageIndex: 2});
    },

    onEmployee(employee) {
      if (employee) {
        this.Employee = employee
      }
    },

  }
}

</script>