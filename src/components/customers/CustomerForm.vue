<template>
  <div>
    <form @submit.prevent="submit">
      <div class="flex justify-content-between mt-1">
        <h2
            class="text-2xl font-bold"
            style="margin-bottom: 50px"
            v-if="formData.isCorporate === 'TUZEL'"
        >
          Şirket
        </h2>
        <h2 class="text-2xl font-bold" style="margin-bottom: 50px" v-else>
          Şahıs
        </h2>
        <Button
            v-tooltip.top="'Müşteriye hesap oluşturmak için tıklayın'"
            v-if="formData.id"
            :disabled="loading"
            @click="openModal"
            label="Hesap Oluştur"
            icon="pi pi-user"
            style="height: 2rem; width:6rem; font-size :.7rem; padding:.6rem;"
            class="p-button-sm p-button-rounded p-button-info p-button-outlined"
        />
      </div>
      <div class="flex mt-1 justify-content-center">
        <div class="p-field-radiobutton flex align-items-center form-checkbox">
          <RadioButton
              id="tuzel"
              name="tuzel"
              value="TUZEL"
              v-model="formData.isCorporate"
          />
          <label class="ml-2 text-sm" for="tuzel">Tüzel Kişi (Şirket)</label>
        </div>

        <div class="p-field-radiobutton flex align-items-center ml-5">
          <RadioButton
              id="gercek"
              name="gercek"
              value="GERCEK"
              v-model="formData.isCorporate"
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
              v-model.trim="$v.formData.title.$model"
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
          Vergi Dairesi
          <span v-if="formData.isCorporate === 'TUZEL'" class="p-error"
          >*</span
          >
        </div>
        <div class="col-4 pt-0 pb-0">
          <j-taxOffice
              @onTaxOffice="onTaxOffice"
              :defaultTaxoffice="formData.TaxOffice"
          />
        </div>

        <template v-if="formData.isCorporate === 'TUZEL'">
          <div class="col-2 text-sm pb-0">
            Vergi Sicil No <span class="p-error">*</span>
          </div>
          <div class="col-4 pb-0">
            <InputText
                name="taxRegistrationNumber"
                class="w-full p-inputtext-sm"
                v-model.trim="$v.formData.identityNumber.$model"
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
                v-model.trim="formData.identityNumber"
                maxLength="11"
                autocomplete="off"
            />
          </div>
        </template>

        <div class="col-4 col-offset-2 pt-0">
        <span
            class="p-error text-xs mt-1"
            v-if="
            formData.isCorporate === 'TUZEL' &&
            submitted &&
            !$v.formData.taxOffice.required
          "
        >
          Zorunlu alan.
        </span>
        </div>

        <div
            class="col-4 col-offset-2 pt-0"
            v-if="formData.isCorporate === 'TUZEL'"
        >
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
          En az 10 karakter
        </span>
        </div>

        <div class="col-4 col-offset-2 pt-0" v-else>
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

        <!-- / -->

        <div class="col-2 text-sm">Adres</div>
        <div class="col-10 description-input">
        <Textarea
            name="address"
            class="w-full"
            v-model.trim="$v.formData.Address.address.$model"
            maxLength="512"
        />
        </div>

        <div class="col-10 col-offset-2">
        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.Address.address.maxLength"
        >
          En fazla 512 karakter.
        </span>
        </div>

        <div class="col-12 form-dropdown pb-0">
          <j-city-district
              required
              @onSelectCity="onSelectCity"
              @onSelectDistrict="onSelectDistrict"
              :defaultCity="formData.Address.City"
              :defaultDistrict="formData.Address.District"
              v-model.trim="$v.formData.Address.City"
              @input="$v.formData.Address.District"
          />
        </div>

        <div class="col-4 col-offset-2 pt-0">
        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.Address.City.required"
        >
          Zorunlu alan.
        </span>
        </div>

        <div class="col-4 col-offset-2 pt-0 pb-0">
        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.Address.District.required"
        >
          Zorunlu alan.
        </span>
        </div>

        <div class="col-2 text-sm">Mobil Tel</div>
        <div class="col-4">
          <j-input-text
              unmask
              name="phoneNumber"
              class="w-full p-inputtext-sm"
              v-model="formData.Address.phone"
              mask="(999) 999-99-99"
          />
        </div>

        <div class="col-2 text-sm">Mobil Tel 2</div>
        <div class="col-4">
          <j-input-text
              unmask
              name="phoneNumber"
              class="w-full p-inputtext-sm"
              v-model="formData.Address.phone2"
              mask="(999) 999-99-99"
          />
        </div>

        <div class="col-2 text-sm">Posta Kodu</div>
        <div class="col-4">
          <j-input-mask
              name="postalCode"
              class="w-full p-inputtext-sm"
              v-model.trim="formData.Address.postalCode"
              mask="99999"
          />
        </div>


        <div class="col-2 text-sm">Faks No</div>
        <div class="col-4">
          <j-input-text
              unmask
              name="faxNumber"
              class="w-full p-inputtext-sm"
              v-model.trim="formData.Address.faxNumber"
              mask="(999) 999-99-99"
          />

        </div>


        <hr class="w-full"/>

        <div class="col-2 text-sm">Yetkili Kişi</div>
        <div class="col-10">
          <InputText
              name="authorizedPerson"
              class="w-full p-inputtext-sm"
              v-model.trim="$v.formData.AuthPerson.name.$model"
              maxLength="64"
          />
        </div>

        <div class="col-10 col-offset-2 pt-0 pb-0">
        <span
            class="p-error text-xs mt-1"
            v-if="submitted && $v.formData.AuthPerson.name.letter"
        >
          Sayı içermemeli.
        </span>

          <span
              class="p-error text-xs mt-1"
              v-if="submitted && !$v.formData.AuthPerson.name.maxLength"
          >
          En fazla 64 karakter.
        </span>
        </div>

        <div class="col-2 text-sm">E-Posta</div>
        <div class="col-10">
          <InputText
              name="authorizedEmail"
              class="w-full p-inputtext-sm"
              v-model.trim="$v.formData.AuthPerson.mail.$model"
          />
        </div>

        <div class="col-10 col-offset-2 pt-0 pb-0">
        <span
            class="p-error text-xs mt-1"
            v-if="submitted && !$v.formData.AuthPerson.mail"
        >
          Geçersiz E-Posta.
        </span>
        </div>

        <div class="col-2 text-sm">Mobil Tel</div>
        <div class="col-10">
          <j-input-text
              unmask
              name="authorizedPhoneNumber"
              class="w-full p-inputtext-sm"
              v-model.trim="formData.AuthPerson.phone"
              mask="(999) 999-99-99"
          />
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
    <j-modal :visible.sync="displayModal" width="800px">
      <template slot="content">
        <create-customer-form
            :loading="submitLoading"
            :singleLoading="singleLoading"
            :type="formType"
            @onSubmit="accountSubmit"
            @close="closeModal"
        />
      </template>
    </j-modal>
  </div>
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
import CustomerMixin from './mixins/customerMixins'
import createCustomerForm from "@/components/customers/CreateCustomerForm";

export default {
  mixins: [CustomerMixin, GlobalForm],
  components: {
    createCustomerForm
  },
  data: () => ({
    submitted: false,
    accountType: true,
    formType: 'CREATE',
    displayModal: false,
  }),

  validations() {
    const validation = {
      formData: {
        title: {
          maxLength: maxLength(128),
          required
        },

        Address: {
          address: {
            maxLength: maxLength(512)
          },
          City: {
            required
          },

          District: {
            required
          },
        },

        AuthPerson: {
          name: {
            maxLength: maxLength(64),
          },
          mail: {
            email
          },
        },
      }
    }

    if (this.formData.isCorporate === 'TUZEL') {
      validation.formData.identityNumber = {
        required,
        numeric,
        minLength: minLength(10)
      }

      validation.formData.TaxOffice = {
        required
      }
    } else {
      validation.formData.identityNumber = {
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
        this.formData.Address.City = city
      }
    },

    onSelectDistrict(district) {
      if (district) {
        this.formData.Address.District = district
      }
    },

    onTaxOffice(taxOffice) {
      if (taxOffice) {
        this.formData.TaxOffice = taxOffice
      }
    },

    // MODAL PRPOPERTY
    openModal() {
      this.displayModal = true;
    },

    closeModal() {
      this.displayModal = false
      this.formType = 'CREATE'

    },

    async accountSubmit(data, type) {
      if (this.formType === 'CREATE') {
        this.createSubmit(data, type, this.accountType)
      }
    },
  },


}
</script>
