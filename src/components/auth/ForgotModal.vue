<template>
  <div class="modal-area">
    <Dialog class="second-modal" v-bind="$attrs" :modal="true">
      <div class="forgot-password-icons mt-3">
        <i @click="onPrevSecondModal" class="left-icon pi pi-arrow-left"></i>
        <i @click="closeFirstModal" class="right-icon pi pi-times"></i>
      </div>
      <h1 class="forgot-password-title mr-5">3 Adımda Parolanızı Sıfırlayın</h1>
      <p class="forgot-password-subtitle font-semibold">2. ADIM</p>
      <p class="forgot-password-text">
        E-posta adresinine yada telefonuna gelen doğrulama kodunu giriniz.
      </p>
      <form @submit.prevent="submit">
        <div class="p-field flex flex-column align-items-start">
          <label
              for="nameModal"
              class="forgot-password-input-label text-xs mb-2"
          >Doğrulama Kodu</label
          >

          <Password
              :feedback="false"
              toggleMask
              maxlength="4"
              id="nameModal"
              class="forgot-password-input"
              v-model.trim="$v.verificationCode.$model"
          />

          <span
              class="p-error text-xs mt-1"
              v-if="!$v.verificationCode.required && submitted"
          >
            Kodu giriniz.
          </span>
        </div>

        <Button
            type="submit"
            class="p-button-primary flex justify-content-center forgot-password-button"
        ><span>SONRAKİ ADIM</span></Button
        >

        <Spinner
            v-if="loading"
            style="width: 30px; height: 30px"
            class="flex justify-content-center mt-2"
        />
      </form>
    </Dialog>


  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'

export default {
  name: 'ForgotSecondModal',
  components: {},
  data() {
    return {
      displayModal: false,
      submitted: false,
      verificationCode: null
    }
  },
  validations: {
    verificationCode: {
      required
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    submit() {
      this.submitted = true
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.openThirdModal()
      this.closeFirstModal()
    },
    openThirdModal() {
      this.displayModal = true
    },
    closeThirdModal() {
      this.displayModal = false
    },
    closeFirstModal() {
      this.$emit('onCloseSecondModal')
    },
    openFirstModal() {
      this.$emit('onOpenFirstModal')
    },
    openSecondModal() {
      this.$emit('onOpenSecondModal')
    },
    onPrevSecondModal() {
      this.openFirstModal()
      this.closeFirstModal()
    }
  }
}
</script>
