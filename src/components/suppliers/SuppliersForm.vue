<template>
  <form @submit.prevent="submit">
    <h2 class="text-2xl font-bold" style="margin-bottom: 50px">Çalışan</h2>
    <div class="grid mt-5 flex align-items-center">
      <div class="col-2 text-sm pb-0">
        Hesap Adı <span class="p-error pb-0">*</span>
      </div>
      <div class="col-10 pb-0">
        <j-input-text
            class="w-full p-inputtext-sm"
            v-model.trim="$v.formData.title.$model"
            maxLength="128"
        />
      </div>

      <div class="col-10 col-offset-2 pt-0">
        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.title.maxLength"
        >
          En fazla 128 karakter
        </span>

        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.title.required"
        >
          Zorunlu alan.
        </span>
      </div>

      <div class="col-2 text-sm pb-0">
        TC Kimlik No <span class="p-error">*</span>
      </div>
      <div class="col-10 pb-0">
        <j-input-text
            name="identityNumber"
            class="w-full p-inputtext-sm"
            v-model.trim="formData.identityNumber"
            autocomplete="off"
            maxLength="11"
        />
      </div>

      <div class="col-10 col-offset-2 pt-0">
        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.identityNumber.required"
        >
          Zorunlu alan.
        </span>
        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.identityNumber.numeric"
        >
          Lütfen sayı giriniz.
        </span>

        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.identityNumber.minLength"
        >
          En az 11 karakter
        </span>
      </div>

      <!--<div class="col-2 text-sm">İkamet Adresi</div>
      <div class="col-10 description-input">
        <Textarea
            name="adress"
            class="w-full"
            v-model.trim="formData.address"
        />
      </div> -->

      <!--<div class="col-12 form-dropdown">
        <j-city-district
            @onSelectCity="onSelectCity"
            @onSelectDistrict="onSelectDistrict"
            :defaultCity="formData.city"
            :defaultDistrict="formData.district"
        />
      </div>

      <div class="col-2 text-sm pb-0">
        Mobil Tel <span class="p-error">*</span>
      </div>
      <div class="col-4 pb-0">
        <j-input-mask
            unmask
            mask="(999) 999-99-99"
            name="mobileNumber"
            class="w-full p-inputtext-sm"
            v-model.trim="formData.phoneNumber"
        />
      </div>-->

      <div class="col-2 text-sm pb-0">
        Vergi Dairesi <span class="p-error">*</span>
      </div>
      <div class="col-4 pb-0">
        <j-taxOffice
            @onTaxOffice="onTaxOffice"
            :defaultTaxoffice="formData.taxOfficeId"/>
      </div>
      {{ formData.taxOfficeId }}

      <div class="p-field-checkbox p-d-flex align-items-center p-mt-1">
        <label class=" font-italic font-light text-sm  p-mr-4">Tüzel mi</label>
        <Checkbox v-model="formData.isCorporate" :binary="true"/>
      </div>

      <div class="col-4 col-offset-8 pt-0">
        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.phoneNumber.required"
        >
          Zorunlu alan.
        </span>
      </div>

      <!-- <div class="col-2 text-sm">Açılış Bakiyesi</div>
       <div class="col-10">
         <div class="grid flex align-items-center">
           <div class="col-2">
             <div class="p-field-checkbox flex align-items-center">
               <p-checkbox v-model="formData.isBalance" :binary="true"/>
               <label
                   v-if="formData.isBalance"
                   class="ml-2 font-italic font-light text-sm"
               >Çalışanın</label
               >
             </div>
           </div>

           <template v-if="formData.isBalance">
             <div class="col-4 flex align-items-center">
               <j-date
                   class="w-full p-inputtext-sm"
                   v-model="formData.balanceDate"
                   :defaultValue="formData.balanceDate"
                   :defaultMaxDate="new Date()"
                   @onSelect="
                   (balanceDate) => {
                     formData.balanceDate = balanceDate
                   }
                 "
               ></j-date>
               <label class="font-italic font-light text-sm ml-2"
               >tarihinde</label
               >
             </div>

             <div class="col-3 flex align-items-center">
               <j-input-price
                   name="balanceAmount"
                   class="w-full p-inputtext-sm"
                   @onChangePrice="onChangePrice"
                   :defaultValue="formData.balanceAmount"
               />
             </div>

             <div class="col-3 flex align-items-center form-dropdown">
               <j-dropdown
                   v-model="formData.balanceType"
                   :options="balanceTypes"
                   optionLabel="name"
                   optionValue="code"
                   class="w-full"
               />
             </div>
           </template>
         </div>
       </div>-->

      <!--<div class="col-2 text-sm">Banka IBAN No</div>
       <j-ibans @ibanChange="ibanChange" :defaultValue="formData.ibans"/> -->

      <div
          class="flex justify-content-center w-full mt-5 mb-2 decline-button save-menu-button save-button"
      >
        <j-submitbutton
            v-if="type === 'CREATE'"
            :loading="loading"
            @save="submit"
        />

        <Button
            v-else
            :disabled="loading"
            label="Güncelle"
            class="save-primary-button ml-3"
            :loading="loading"
            @click="submit"
        />

        <Button
            :disabled="loading"
            @click="onClose"
            label="Vazgeç"
            class="p-button-danger ml-3"
        />
      </div>
    </div>
  </form>
</template>

<script>
import supplierMixin from "@/components/suppliers/mixins/supplierMixins";
import globalForm from "@/components/globalMixins/globalForm";
import {
  maxLength,
  required,
  numeric,
  minLength
} from 'vuelidate/lib/validators'


export default {
  mixins: [globalForm, supplierMixin],
  data: () => ({
    submitted: false,

  }),

  validations() {
    const validation = {
      formData: {
        title: {
          maxLength: maxLength(128),
          required
        },
        identityNumber: {
          required,
          numeric,
          minLength: minLength(11)
        },
        /*phoneNumber: {
          required,
          numeric,
          minLength: minLength(10)
        } */
      }
    }

    return validation
  },

  methods: {
    submit(type) {
      console.log(type)
      if (this.formData.currency) {
        this.formData.currency = this.formData.currency.id
      }

      this.$v.$touch()
      this.submitted = true

      if (this.$v.$invalid) {
        return
      }

      this.$emit('onSubmit', this.formData, type)

      /*  if (type === 1) {
          this.submitted = false
          this.resetForm()
          EventBus.$emit('clearIbans')
        } */
    },

    onClose() {
      this.$emit('close')
    },

    onSelectCity(city) {
      if (city) {
        this.formData.city = city
      }
    },

    onSelectDistrict(district) {
      if (district) {
        this.formData.district = district
      }
    },
    onTaxOffice(taxOffice) {
      if (taxOffice.id) {
        this.formData.taxOfficeId = taxOffice.id
      }
    },
    onSelectBalanceDate(balanceDate) {
      this.formData.balanceDate = balanceDate
    },

    ibanChange(val) {
      this.formData.ibans = val
    },

    onChangePrice(val) {
      this.formData.balanceAmount = val.value
      this.formData.currency = val.currency
    }
  }
}
</script>
