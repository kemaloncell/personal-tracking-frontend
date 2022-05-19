<template>
  <form @submit.prevent="submit">
    <h2
        class="text-2xl font-bold"
        style="margin-bottom: 50px"
        v-if="formData.seller.isCorporate === 'TUZEL'"
    >
      Şirket
    </h2>
    <h2 class="text-2xl font-bold" style="margin-bottom: 50px" v-else>
      Şahıs
    </h2>
    <div class="flex mt-1 justify-content-center">
      <div class="p-field-radiobutton flex align-items-center form-checkbox">
        <RadioButton
            id="tuzel"
            name="tuzel"
            value="TUZEL"
            v-model="formData.seller.isCorporate"
        />
        <label class="ml-2 text-sm" for="tuzel">Tüzel Kişi (Şirket)</label>
      </div>

      <div class="p-field-radiobutton flex align-items-center ml-5">
        <RadioButton
            id="gercek"
            name="gercek"
            value="GERCEK"
            v-model="formData.seller.isCorporate"
        />
        <label class="ml-2 text-sm" for="gercek"
        >Gerçek Kişi (Şahıs Firması)</label
        >
      </div>
    </div>

    <!-- / -->

    <div class="grid mt-5 flex align-items-center">
      <div class="col-2 text-sm pb-0">
        Firma Ünvanı <span class="p-error">*</span>
      </div>
      <div class="col-10 pb-0">
        <InputText
            class="w-full p-inputtext-sm"
            maxLength="128"
            v-model.trim="$v.formData.seller.title.$model"
        />
      </div>

      <div class="col-10 col-offset-2 pt-0">
        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.seller.title.maxLength"
        >
          En fazla 128 karakter
        </span>

        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.seller.title.required"
        >
          Zorunlu alan.
        </span>
      </div>

      <div class="col-2 text-sm pb-0">
        Vergi Dairesi
        <span v-if="formData.seller.isCorporate === 'TUZEL'" class="p-error"
        >*</span
        >
      </div>
      <div class="col-4 pt-0 pb-0">
        <j-taxOffice
            @onTaxOffice="onTaxOffice"
            :defaultTaxoffice="formData.seller.taxOffice"
        />
      </div>

      <template v-if="formData.seller.isCorporate === 'TUZEL'">
        <div class="col-2 text-sm pb-0">
          Vergi Sicil No <span class="p-error">*</span>
        </div>
        <div class="col-4 pb-0">
          <InputText
              name="taxRegistrationNumber"
              class="w-full p-inputtext-sm"
              v-model.trim="$v.formData.seller.identityNumber.$model"
              maxLength="10"
          />
        </div>
      </template>

      <template v-else>
        <div class="col-2 text-sm pb-0">
          TC Kimlik No <span class="p-error">*</span>
        </div>
        <div class="col-4 pb-0">
          <InputText
              name="identityNumber"
              class="w-full p-inputtext-sm"
              v-model.trim="formData.seller.identityNumber"
              maxLength="11"
              autocomplete="off"
          />
        </div>
      </template>

      <div class="col-4 col-offset-2 pt-0">
        <span
            class="p-error text-xs mt-1"
            v-if="
            formData.seller.isCorporate === 'TUZEL' &&
            submitted &&
            !$v.formData.seller.taxOffice.required
          "
        >
          Zorunlu alan.
        </span>
      </div>

      <div
          class="col-4 col-offset-2 pt-0"
          v-if="formData.seller.isCorporate === 'TUZEL'"
      >
        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.seller.identityNumber.required"
        >
          Zorunlu alan.
        </span>
        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.seller.identityNumber.numeric"
        >
          Lütfen sayı giriniz.
        </span>

        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.seller.identityNumber.minLength"
        >
          En az 10 karakter
        </span>
      </div>

      <div class="col-4 col-offset-2 pt-0" v-else>
        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.seller.identityNumber.required"
        >
          Zorunlu alan.
        </span>
        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.seller.identityNumber.numeric"
        >
          Lütfen sayı giriniz.
        </span>

        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.seller.identityNumber.minLength"
        >
          En az 11 karakter
        </span>
      </div>

      <!-- / -->

      <div class="col-2 text-sm">Adres</div>
      <div class="col-10 description-input">
        <Textarea
            name="adress"
            class="w-full"
            v-model.trim="$v.formData.address.address.$model"
            maxLength="512"
        />
      </div>

      <div class="col-10 col-offset-2">
        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.address.address.maxLength"
        >
          En fazla 512 karakter.
        </span>
      </div>

      <div class="col-12 form-dropdown pb-0">
        <j-city-district
            required
            @onSelectCity="onSelectCity"
            @onSelectDistrict="onSelectDistrict"
            :defaultCity="formData.address.city"
            :defaultDistrict="formData.address.district"
            v-model.trim="$v.formData.address.city.$model"
            @input="$v.formData.address.district.$model"
        />
      </div>

      <div class="col-4 col-offset-2 pt-0">
        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.address.city.required"
        >
          Zorunlu alan.
        </span>
      </div>

      <div class="col-4 col-offset-2 pt-0 pb-0">
        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.address.district.required"
        >
          Zorunlu alan.
        </span>
      </div>

      <div class="col-2 text-sm">Posta Kodu</div>
      <div class="col-4">
        <j-input-mask
            name="postalCode"
            class="w-full p-inputtext-sm"
            v-model.trim="formData.address.postalCode"
            mask="99999"
        />
      </div>

      <div class="col-2 text-sm">Mobil Tel</div>
      <div class="col-4">
        <j-input-mask
            unmask
            name="phoneNumber"
            class="w-full p-inputtext-sm"
            v-model="$v.formData.address.phone"
            mask="(999) 999-99-99"
        />
      </div>

      <div class="col-2 text-sm">Mobil Tel 2</div>
      <div class="col-4">
        <j-input-mask
            unmask
            name="phoneNumber"
            class="w-full p-inputtext-sm"
            v-model="$v.formData.address.phone2"
            mask="(999) 999-99-99"
        />
      </div>

      <div class="col-2 text-sm">Faks No</div>
      <div class="col-4">
        <j-input-mask
            unmask
            name="faxNumber"
            class="w-full p-inputtext-sm"
            v-model.trim="$v.formData.address.faxNumber"
            mask="(999) 999-99-99"
        />
      </div>


      <hr class="w-full"/>

      <div class="col-2 text-sm">Yetkili Kişi</div>
      <div class="col-10">
        <InputText
            name="authorizedPerson"
            class="w-full p-inputtext-sm"
            v-model.trim="$v.formData.authPerson.name.$model"
            maxLength="64"
        />
      </div>

      <div class="col-10 col-offset-2 pt-0 pb-0">
        <span
            class="p-error text-xs mt-1"
            v-if="submitted && $v.formData.authPerson.name.letter"
        >
          Sayı içermemeli.
        </span>

        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.authPerson.name.maxLength"
        >
          En fazla 64 karakter.
        </span>
      </div>

      <div class="col-2 text-sm">E-Posta</div>
      <div class="col-10">
        <InputText
            name="authorizedEmail"
            class="w-full p-inputtext-sm"
            v-model.trim="$v.formData.authPerson.mail.$model"
        />
      </div>

      <div class="col-10 col-offset-2 pt-0 pb-0">
        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.authPerson.mail"
        >
          Geçersiz E-Posta.
        </span>
      </div>

      <div class="col-2 text-sm">Mobil Tel</div>
      <div class="col-10">
        <j-input-mask
            unmask
            name="authorizedPhoneNumber"
            class="w-full p-inputtext-sm"
            v-model="$v.formData.authPerson.phone"
            mask="(999) 999-99-99"
        />
        {{ $v.formData.authPerson.phone }}
      </div>


      <div
          class="flex justify-content-center w-full mt-5 mb-5 decline-button save-menu-button save-button"
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
import {
  maxLength,
  required,
  numeric,
  email,
  minLength
} from 'vuelidate/lib/validators'
import GlobalForm from '@/components/globalMixins/globalForm'
import SuppliersMixin from './mixins/supplierMixins'

export default {
  mixins: [SuppliersMixin, GlobalForm],
  data: () => ({
    submitted: false,
  }),

  validations() {
    const validation = {
      formData: {
        seller: {
          title: {
            maxLength: maxLength(128),
            required
          },
          identityNumber: {}
        },
        address: {
          address: {
            maxLength: maxLength(512)
          },
          city: {
            required
          },

          district: {
            required
          },
        },

        authPerson: {
          name: {
            maxLength: maxLength(64),
          },
          mail: {
            email
          },
        },
      }
    }

    if (this.formData.seller.isCorporate === 'TUZEL') {
      validation.formData.seller.identityNumber = {
        required,
        numeric,
        minLength: minLength(10)
      }

      validation.formData.seller.taxOffice = {
        required
      }
    } else {
      validation.formData.seller.identityNumber = {
        required,
        numeric,
        minLength: minLength(11)
      }
    }

    return validation
  },


  methods: {
    submit(type) {


      this.$v.$touch()
      this.submitted = true

      if (this.$v.$invalid) {
        return
      }

      this.$emit('onSubmit', this.formData, type)

    },

    onClose() {
      this.$emit('close')
    },

    onSelectCity(city) {
      if (city) {
        this.formData.address.city = city
      }
    },

    onSelectDistrict(district) {
      if (district) {
        this.formData.address.district = district
      }
    },

    onTaxOffice(taxOffice) {
      if (taxOffice) {
        this.formData.seller.taxOffice = taxOffice
      }
    },


  },

  /*watch: {
    'formData.customerCompanyType': {
      deep: true,
      handler() {
        this.submitted = false
      }
    }
  }, */
}
</script>
