<template>
  <div class="main">
    <div class="container">
      <span class="error animated tada" id="msg"></span>
      <form name="form1" class="box" method="post" @submit.prevent="login">
        <h4>Security<span> Plus</span></h4>
        <h5>Hesabınıza giriş yapın.</h5>

        <input type="text" name="email" placeholder="Email" v-model.trim="$v.email.$model" autocomplete="off">
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
          </span>


        <i class="typcn typcn-eye pi pi-eye" :class="{active: isActive }" @click="seePassword()"></i>
        <input :type="passwordType" name="password" v-model="$v.password.$model"
               placeholder="Şifreniz"
               autocomplete="off">
        <div class="p-inputgroup flex justify-content-center ">
          <span
              class="p-error text-center text-xs "
              v-if="!$v.password.required && submitted"
          >
            Parola giriniz.
          </span>
          <span class="p-error text-xs mt-1" v-show="!isUserExist">
            Girdiğiniz E-posta adresi veya parola geçerli değil.
          </span>
        </div>
        <router-link to="forgot-password" class="forgetpass" tag="a">Şifremi unuttum?</router-link>

        <input type="submit" value="Giriş Yap" class="btn1">
      </form>
    </div>
    <div class="footer">
      <span>Made with <i class="fa fa-heart pulse"></i> <a href="">By Jack Russell</a></span>
    </div>
  </div>
</template>

<script>
import authMixin from "./mixins/authMixins";
import {email, required} from "vuelidate/lib/validators";

export default {
  mixins: [authMixin],

  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
    }
  },
  
  data() {
    return {
      email: null,
      password: null,
      passwordType: "password",
      isActive: false,
    }
  },
  methods: {
    async login() {
      this.$v.$touch()
      this.submitted = true
      if (!this.$v.$invalid) {
        try {
          this.submitStatus = true
          await this.callLogin({
            email: this.email,
            password: this.password
          })
          this.isUserExist = true
          this.$router.push('/')
        } catch {
          console.error('login err')
          this.isUserExist = false
        }
      }
    },

    seePassword() {
      if (this.isActive) {
        this.isActive = false
        this.passwordType = 'password'

      } else {
        this.isActive = true
        this.passwordType = 'text'
      }
    },
  },

}
</script>

<style>

</style>


