<template>
  <div class="main">
    <div class="container">
      <span class="error animated tada" id="msg"></span>
      <form name="form1" class="box" @submit.prevent="goForgotSecond">
        <i @click="goLogin" class="pi pi-arrow-left arrow"></i>
        <h4>Security<span> Plus</span></h4>
        <h5>Telefon numaranızı girin</h5>

        <!--   <input type="text" name="email" placeholder="Email" v-model.trim="$v.email.$model" autocomplete="off">
           <span
               class="p-error text-xs mt-1"
               v-if="!$v.email.required && submitted"
           >
               E-Posta adresi giriniz.
             </span>
           <span
               class="p-error text-xs mt-1"
               v-if="!$v.email.email && submitted"
           >
               Geçersiz E-Posta.
             </span> -->

        <InputText
            mask="(999) 999-99-99"
            unmask
            placeholder="Telefon"
            id="mobileNumberModal"
            type="text"
            class="forgot-password-input"
            v-model.trim="$v.phone.$model"
        />
        <span
            class="p-error text-xs mt-1"
            v-if="!$v.phone.required && submitted"
        >
            Telefon numarası giriniz.
          </span>

        <input type="submit" value="Sonraki Adım" class="btn1">
      </form>
    </div>

    <div class="footer">
      <span>Made with <i class="fa fa-heart pulse"></i> <a href="">By Jack Russell</a></span>
    </div>


    <otp-modal
        :code="code"
        :visible.sync="displayOtpModal"
        :loading="loading"
        :timer="timer"
        @onClose="onCloseOtp"
        @reSendCode="reSendCode"
    />
  </div>
</template>

<script>
import authMixin from "./mixins/authMixins";
import {required} from "vuelidate/lib/validators";
import otpModal from "@/components/auth/OtpModal";

export default {
  mixins: [authMixin],
  components: {
    otpModal
  },
  validations: {
    phone: {
      required,
    }
  },

  data() {
    return {
      displayModal: false,
      phone: null,
      displayOtpModal: false,
      code: null,
      countDownTime: 180,
      timerId: null,
    }
  },
  methods: {

    async goForgotSecond() {
      this.$v.$touch();
      this.submitted = true
      if (!this.$v.$invalid) {
        try {
          this.submitStatus = true
          await this.callForgotPassword({
            email: this.phone,
          })
          this.isUserExist = true
          this.openOTPModal()
        } catch {
          console.error('forgot password err')
          this.isUserExist = false
        }
      }
    },


    countDownTimer() {
      if (this.countDownTime > 0) {
        this.timerId = setTimeout(() => {
          this.countDownTime -= 1
          this.countDownTimer()
        }, 1000)
      } else {
        clearTimeout(this.timerId)
      }
    },

    async reSendCode() {
      try {
        this.countDownTime = 180
        // clear the previous timeout and start new one
        clearTimeout(this.timerId)
        this.timerId = setTimeout(() => {
          this.countDownTime -= 1
          this.countDownTimer()
        }, 1000)

        const result = await this.callSendOtp({
          email: this.email,
          phoneNumber: this.phoneNumber
        })
        this.code = result.data
      } catch (e) {
        console.log('reSendCode Error', e)
      }
    },

    openOTPModal() {
      this.displayOtpModal = true
    },

    onCloseOtp() {
      this.displayOtpModal = false
      clearTimeout(this.timerId)
      this.countDownTime = 180
    },


    goLogin() {
      this.$router.push('/login')
    },
  },

  computed: {
    timer() {
      return this.countDownTime
    }
  },

}
</script>

<style scoped>
.container {
  height: 450px;
}

.arrow {
  display: flex;
  justify-content: start;
  margin-top: 15px;
  margin-left: 10px;
  color: whitesmoke;
  font-size: 20px;
  cursor: pointer;
  -webkit-transition: all .2s ease-out;
  -moz-transition: all .2s ease-out;
  -ms-transition: all .2s ease-out;
  -o-transition: all .2s ease-out;
  transition: all .2s ease-out;
}

.arrow:hover {
  color: #5c7fda;
}

.forgot-password-input {
  margin: 20px auto !important;
  background: #262e49 !important;
  border: 0 !important;
  border-radius: 5px !important;
  padding: 22px 10px !important;
  width: 320px !important;
  outline: none !important;
  color: #d6d6d6 !important;
  -webkit-transition: all .2s ease-out !important;
  -moz-transition: all .2s ease-out !important;
  -ms-transition: all .2s ease-out !important;
  -o-transition: all .2s ease-out !important;
  transition: all .2s ease-out !important;
}

</style>
