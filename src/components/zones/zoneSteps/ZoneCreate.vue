<template>
  <div class="stepsdemo-content">
    <Card>
      <template #title>
        Bölge Bilgileri
      </template>
      <template #content>
        <p class="p-text-secondary">Bölge bilgilerinizi giriniz.</p>
        <div class="p-fluid">
          <div class="field">
            <label for="zoneName">Bölge Adı</label>
            <InputText id="zoneName" class="p-inputtext-sm" v-model="$v.zoneName.$model"
                       :class="{'p-invalid':$v.zoneName.$invalid && submitted}"/>
            <small v-show="$v.zoneName.$invalid && submitted" class=" p-error">Bölge adı gereklidir.</small>
          </div>
          <div class="field">
            <label for="Şehir">Şehir</label>
            <j-city
                required
                @onSelectCity="onSelectCity"
                :defaultCity="City"
                v-model="City"
            />
            <small v-show="$v.City.$invalid && submitted" class="p-error">Şehir seçimi gereklidir.</small>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="grid grid-nogutter justify-content-between">
          <i></i>
          <Button label="İleri" @click="nextPage(!$v.$invalid)" icon="pi pi-angle-right" iconPos="right"/>

        </div>
      </template>
    </Card>
  </div>

</template>


<script>
import zoneMixins from "../mixins/zoneMixins";
import {required} from 'vuelidate/lib/validators';

export default {
  mixins: [zoneMixins],
  data() {
    return {
      zoneName: '',
      City: '',
      submitted: false
    }
  },
  validations: {
    zoneName: {
      required
    },
    City: {
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
        formData: {zoneName: this.zoneName, city: this.City},
        pageIndex: 0
      });
    },

    onSelectCity(city) {
      if (city) {
        this.City = city
      }
    },

  }
}


</script>