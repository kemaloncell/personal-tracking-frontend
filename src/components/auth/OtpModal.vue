<template>
  <Dialog class="otp-modal" v-bind="$attrs" :modal="true">
    <div class="flex justify-content-between cursor-pointer mb-3">
      <i @click="close" class="pi pi-times"></i>
    </div>
    <h1 class="text-2xl text-center font-bold">Kaydınızı Tamamlayın</h1>
    <p class="text-xs mt-4 font-semibold">SON ADIM</p>
    <p class="mt-3 text-xs">
      Lütfen mobil telefonunuza gelen doğrulama kodunu giriniz.
    </p>
    <form @submit.prevent="submit" class="mt-3">
      <div class="grid">
        <div class="col-9">
          <div class="p-field flex flex-column align-items-start mb-2">
            <label for="nameModal" class="text-xs mb-2">Doğrulama Kodu</label>
            <InputText
                id="nameModal"
                type="text"
                class="p-inputtext-sm w-full auth-input"
                v-model.trim="$v.codePhone.$model"
            />

            <span
                class="p-error text-xs mt-1"
                v-if="!$v.codePhone.required && submitted"
            >
              Kodu giriniz.
            </span>
          </div>
        </div>
        <div
            class="col-3 align-items-center justify-content-center flex text-gray-700 font-semibold"
        >
          {{ timer }}
        </div>
      </div>

      <p v-if="codeResent" class="text-center text-orange-400 mb-1 text-xs">
        Doğrulama kodu tekrar gönderildi
      </p>
      <div class="grid flex justify-content-between">
        <Button
            type="submit"
            class=" w-full mt-3 font-bold flex justify-content-center auth-input-primary"
        >KAYDI TAMAMLA
        </Button
        >
        <Button
            @click="reSendCode"
            class=" w-full flex justify-content-center text-sm p-button-link"
        >Kodu tekrar gönder
        </Button
        >
      </div>
      <Spinner
          v-if="loading"
          style="width: 30px; height: 30px"
          class="flex justify-content-center mt-2"
      />
    </form>
  </Dialog>
</template>

<script>
import {required} from 'vuelidate/lib/validators'

export default {
  data: () => ({
    codePhone: null,
    submitted: false,
    codeResent: false
  }),

  validations: {
    codePhone: {
      required
    }
  },

  props: {
    code: {
      type: Number,
      default: null
    },

    loading: {
      type: Boolean,
      default: false
    },

    timer: {
      type: Number
    }
  },

  watch: {
    code() {
      this.codePhone = this.code
    }
  },

  mounted() {
    this.codePhone = this.code
  },

  methods: {
    submit() {
      this.$v.$touch()
      this.submitted = true

      if (!this.$v.$invalid) {
        this.$emit('onSubmit', this.code)
        this.codeResent = false
      }
    },
    reSendCode() {
      this.$emit('reSendCode')
      this.codeResent = true
    },

    close() {
      this.$emit('onClose')
      this.codeResent = false
    },

  }
}
</script>

<style lang="scss">
.otp-modal {
  .p-dialog-header {
    padding: 10px 0;
  }

  .p-dialog {
    max-width: 400px;
  }

  .p-dialog-header-icons {
    display: none !important;
    margin-left: auto;
    margin-right: 10px;
  }
}
</style>
