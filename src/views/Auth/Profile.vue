<template>
  <div class="layout-profile">
    <div>
      <img :src="userImage"/>
    </div>
    <span class="username text-white">{{ userName }}</span>
    <br>
    <span class="username text-white">{{ userRole }}</span>


    <!--<transition name="layout-submenu-wrapper">
      <ul v-show="expanded">
        <li>
          <router-link class="p-link" tag="button" :to="{name: 'Profile'}"><i
              class="pi pi-fw pi-user"></i><span>Account</span>
          </router-link>
        </li>
     <li>
           <button class="p-link"><i class="pi pi-fw pi-inbox"></i><span>Notifications</span><span
               class="menuitem-badge">2</span></button>
         </li>
        <li>
          <button @click="logout" class="p-link"><i class="pi pi-fw pi-power-off"></i><span>Logout</span></button>
        </li>
      </ul>
    </transition> -->

  </div>
</template>

<script>
import authMixin from '@/components/auth/mixins/authMixins'
import {mapGetters} from "vuex";

export default {
  mixins: [authMixin],
  data() {
    return {
      expanded: false,
      imagePath: "https://jr-securityplus.s3.amazonaws.com/",
    }
  },

  methods: {

    /*onClick(event) {
      this.expanded = !this.expanded;
      event.preventDefault();
    },

    async logout() {
      try {
        await this.callLogout();
        this.$router.push('/login')
      } catch {
        console.error('logout err')
      }
    }, */
  },
  computed: {
    ...mapGetters({
      userData: 'auth/userData',
      imageUrl: 'auth/imageUrl',
    }),

    userName() {
      if (this.userData) {
        return this.userData.data.name
      } else {
        return '-'
      }
    },

    userRole() {
      if (this.userData) {
        return this.userData.data.Role.name
      } else {
        return '-'
      }
    },

    userImage() {
      if (this.imageUrl) {
        console.log(this.imageUrl, 'com')
        return `${this.imagePath}${this.imageUrl}`
      } else {
        return 'assets/layout/images/profile.png'
      }
    },

  },


}


</script>

<style scoped>

</style>