<template>

  <div class="stepsdemo-content">
    <Card>
      <template #title>
        Alan Bilgileri
      </template>
      <template #subtitle>
        Alan bilgilerinizi giriniz.
      </template>
      <template #content>
        <div class="p-fluid formgrid grid">
          <div class="field col-12">
            <label for="class">Yetkili kişi</label>
            <InputText type="text" class="p-inputtext-sm" v-model="areaAuthName"
                       :class="{'p-invalid':$v.areaAuthName.$invalid && submitted}"/>
            <small v-show="$v.areaAuthName.$invalid && submitted" class=" p-error">Alan adı gereklidir.</small>
          </div>

          <div class="field  col-8">
            <label for="class">İlçe</label>
            <j-district
                required
                @onSelectDistrict="onSelectDistrict"
                :defaultCity="formData.city.id "
                :defaultDistrict="District"
                v-model="District"
            />
            <small v-show="$v.District.$invalid && submitted" class=" p-error">İlçe gereklidir.</small>
          </div>

          <div class="field col-2">
            <label id="date" for="date">Enlem</label>
            <InputText id="date" placeholder="38.37" class="p-inputtext-sm" v-model="latitude"
                       :class="{'p-invalid':$v.latitude.$invalid && submitted}"/>
            <small v-show="$v.latitude.$invalid && submitted" class=" p-error">Enlem gereklidir.</small><br>
            <small v-show="$v.latitude.$invalid && submitted" class=" p-error">Geçersiz değer.</small>

          </div>
          <div class="field col-2">
            <label for="cvv">Boylam</label>
            <InputText id="cvv" placeholder="30.37" class="p-inputtext-sm" unmask v-model="longitude"/>
            <small v-show="$v.longitude.$invalid && submitted" class=" p-error">Boylam gereklidir.</small><br>
            <small v-show="$v.longitude.$invalid && submitted" class=" p-error">Geçersiz değer.</small>
          </div>
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
import {required, integer} from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      submitted: false,
      areaAuthName: '',
      District: '',
      latitude: '',
      longitude: '',
    }
  },

  validations: {
    areaAuthName: {
      required
    },
    District: {
      required
    },
    latitude: {
      required,
      integer
    },
    longitude: {
      required,
      integer
    },
  },

  props: {
    formData: Object
  },

  methods: {

    nextPage(isFormValid) {
      this.submitted = true;
      if (!isFormValid) {
        return;
      }

      this.$emit('nextPage', {
        formData: {
          areaAuthName: this.areaAuthName,
          district: this.District,
          latitude: this.latitude,
          longitude: this.longitude,
        }, pageIndex: 1
      });
    },
    prevPage() {
      this.$emit('prevPage', {pageIndex: 1});
    },

    onSelectDistrict(district) {
      if (district) {
        this.District = district
      }
    },

  },

}
</script>