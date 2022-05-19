<template>
  <div class="main">
    <div class="container">
      <span class="error animated tada" id="msg"></span>
      <form name="form1" class="box">
        <h4>Security<span> Plus</span></h4>
        <h5>Email veya telefon numaranızı girin</h5>

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

        <InputMask
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

        <input @click="displayModal=true" type="submit" value="Sonraki Adım" class="btn1">
      </form>
    </div>
    <forgot-modal
        :visible.sync="displayModal"
        :loading="loading"
    />
    <div class="footer">
      <span>Made with <i class="fa fa-heart pulse"></i> <a href="">By Jack Russell</a></span>
    </div>
  </div>
</template>

<script>
import forgotModal from "./ForgotModal";
import authMixin from "./mixins/authMixins";
import {email, required} from "vuelidate/lib/validators";

export default {
  mixins: [authMixin],
  components: {
    forgotModal
  },
  data() {
    return {
      displayModal: false,
    }
  },
  methods: {},
  validations: {
    email: {
      required,
      email
    },
    phone: {
      required,
    }
  },

}
</script>

<style scoped>
/* CSS Libraries Used

*Animate.css by Daniel Eden.
*FontAwesome 4.7.0
*Typicons

*/

@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400');

.container {
  top: 150px;
  left: 50%;
  position: absolute;
  text-align: center;
  transform: translateX(-50%);
  background-color: rgb(33, 41, 66);
  border-radius: 9px;
  border-top: 10px solid #79a6fe;
  border-bottom: 10px solid #8BD17C;
  width: 400px;
  height: 500px;
  box-shadow: 1px 1px 18.8px 1.2px rgb(25, 31, 53);
}

.box h4 {
  font-family: 'Source Sans Pro', sans-serif;
  color: #5c6bc0;
  font-size: 18px;
  margin-top: 94px;;
}

.box h4 span {
  color: #dfdeee;
  font-weight: lighter;
}

.box h5 {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 13px;
  color: #a1a4ad;
  letter-spacing: 1.5px;
  margin-top: -15px;
  margin-bottom: 70px;
}

.box input[type = "text"], .box input[type = "password"] {
  display: block;
  margin: 20px auto;
  background: #262e49;
  border: 0;
  border-radius: 5px;
  padding: 14px 10px;
  width: 320px;
  outline: none;
  color: #d6d6d6;
  -webkit-transition: all .2s ease-out;
  -moz-transition: all .2s ease-out;
  -ms-transition: all .2s ease-out;
  -o-transition: all .2s ease-out;
  transition: all .2s ease-out;

}

::-webkit-input-placeholder {
  color: #565f79;
}

.box input[type = "text"]:focus, .box input[type = "password"]:focus {
  border: 1px solid #79A6FE;

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

a {
  color: #5c7fda;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

label input[type = "checkbox"] {
  display: none; /* hide the default checkbox */
}

/* style the artificial checkbox */
label span {
  height: 13px;
  width: 13px;
  border: 2px solid #464d64;
  border-radius: 2px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  float: left;
  left: 7.5%;
}

.btn1 {
  border: 0;
  background: #7f5feb;
  color: #dfdeee;
  border-radius: 100px;
  width: 340px;
  height: 49px;
  font-size: 16px;
  position: absolute;
  top: 82%;
  left: 8%;
  transition: 0.3s;
  cursor: pointer;
}

.btn1:hover {
  background: #5d33e6;
}

.rmb {
  position: absolute;
  margin-left: -24%;
  margin-top: 0px;
  color: #dfdeee;
  font-size: 13px;
}

.forgetpass {
  margin-top: 10px;
  position: relative;
  float: right;
  right: 28px;
}


[type=checkbox]:checked + span:before { /* <-- style its checked state */
  font-family: FontAwesome;
  font-size: 16px;
  content: "\f00c";
  position: absolute;
  top: -4px;
  color: #896cec;
  left: -1px;
  width: 13px;
}

.error {
  background: #ff3333;
  text-align: center;
  width: 337px;
  height: 20px;
  padding: 2px;
  border: 0;
  border-radius: 5px;
  margin: 10px auto 10px;
  position: absolute;
  top: 31%;
  left: 7.2%;
  color: white;
  display: none;
}

.footer {
  position: relative;
  left: 0;
  bottom: 0;
  top: 705px;
  width: 100%;
  color: #78797d;
  font-size: 14px;
  text-align: center;
}

.footer .fa {
  color: #7f5feb;;
}
</style>
