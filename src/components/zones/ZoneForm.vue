<template>
  <default-layout>
    <div slot="content">
      <div class="card">
        <div class="grid col-6 mt-5" style="margin: auto">

          <form @submit.prevent="submit">
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
                    @save="submit('CREATE')"
                />
                <Button
                    v-else
                    :disabled="loading"
                    label="Güncelle"
                    class="save-primary-button ml-3"
                    :loading="loading"
                    @click="submit('UPDATE')"
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
        </div>
      </div>
    </div>
  </default-layout>
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
import zoneMixin from './mixins/zoneMixins'

export default {
  mixins: [zoneMixin, GlobalForm],
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
    async submit() {
      this.$v.$touch()
      this.submitted = true

      if (this.$v.$invalid) {
        return
      }

      if (this.type === 'CREATE') {
        this.createSubmit(this.formData)
      }

      if (this.type === 'UPDATE') {
        this.udpateSubmit(this.formData)
      }
    },

    onClose() {
      this.$router.push({name: 'Supplier'});
    },

    onSelectCity(city) {
      if (city) {
        this.formData.Address.City = city
      }
    },

    onSelectDistrict(district) {
      console.log(district, 'on selecrt dist')
      if (district) {
        this.formData.Address.District = district
      }
    },

    onTaxOffice(taxOffice) {
      if (taxOffice) {
        this.formData.TaxOffice = taxOffice
      }
    },


  },

  mounted() {
    if (this.type === 'CREATE') {
      this.resetForm()
    } else {
      this.type = this.$route.params.type
      this.formData = this.$route.params.data
    }
  }
}
</script>
