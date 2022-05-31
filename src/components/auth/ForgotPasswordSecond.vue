<template>
  <div class="main">
    <div class="container">
      <span class="error animated tada" id="msg"></span>
      <form name="form1" class="box" @submit.prevent="goForgotModalThird">
        <i @click="goForgotPassword" class="pi pi-arrow-left arrow"></i>
        <h4>Security<span> Plus</span></h4>
        <h5>Telefon numaranıza gelen kodu giriniz.</h5>
        <!--<h5>Yeni şifrenizi giriniz. Şifreniz en az 8 karakter en fazla 16 karakter
          uzunluğunda olmalı ve büyük harf küçük harf ve rakam içermelidir..</h5> -->

        <i class="typcn typcn-eye pi pi-eye" :class="{active: isActive }" @click="seePassword()"></i>
        <input :type="passwordType" name="password" v-model="password"
               placeholder="Yeni şifrenizi giriniz"
               autocomplete="off">

        <input type="text" name="password" v-model="code"
               placeholder="Kodu giriniz"
               autocomplete="off">

        <input type="submit" value="Sonraki Adım" class="btn1">
      </form>
    </div>

    <div class="footer">
      <span>Made with <i class="fa fa-heart pulse"></i> <a href="">By Jack Russell</a></span>
    </div>
  </div>
</template>

<script>
import authMixin from "./mixins/authMixins";
import {mapGetters} from "vuex";

export default {
  mixins: [authMixin],
  data() {
    return {
      password: null,
      passwordType: "password",
      isActive: false,
      code: null
    }
  },

  mounted() {
    this.code = this.otpCode
  },

  methods: {
    goForgotModalThird() {
      this.$router.push('/new-password')
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
    goForgotPassword() {
      this.$router.push('/forgot-password')

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

.typcn {
  position: absolute;
  left: 335px;
  top: 247px;
  color: #3b476b;
  font-size: 22px;
  cursor: pointer;
}

.typcn.active {
  color: #7f60eb;
}

</style>
