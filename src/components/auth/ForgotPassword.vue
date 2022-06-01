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

        <InputMask
            mask="(999) 999-99-99"
            placeholder="(555) 999-99-99"
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
        :visible.sync="displayOtpModal"
        :loading="loading"
        :startTimer="startTimer"
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
      startTimer: null,
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


    openOTPModal() {
      this.startTimer = true
      this.displayOtpModal = true
    },


    goLogin() {
      this.$router.push('/login')
    },
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
