<template>
  <div class="layout-profile">
    <div>
      <img :src="userImage"/>
    </div>
    <button class="p-link layout-profile-link" @click="onClick">
      <span class="username">{{ userName }}</span>
      <i class="pi pi-fw pi-cog"></i>
    </button>
    <transition name="layout-submenu-wrapper">
      <ul v-show="expanded">
        <li>
          <router-link class="p-link" tag="button" :to="{name: 'Profile'}"><i
              class="pi pi-fw pi-user"></i><span>Account</span>
          </router-link>
        </li>
        <!-- <li>
           <button class="p-link"><i class="pi pi-fw pi-inbox"></i><span>Notifications</span><span
               class="menuitem-badge">2</span></button>
         </li> -->
        <li>
          <button @click="logout" class="p-link"><i class="pi pi-fw pi-power-off"></i><span>Logout</span></button>
        </li>
      </ul>
    </transition>

  </div>
</template>

<script>
import authMixin from '@/components/auth/mixins/authMixins'
import {mapGetters} from "vuex";

export default {
  mixins: [authMixin],
  data() {
    return {
      expanded: false
    }
  },

  methods: {
    onClick(event) {
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
    },
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

    userImage() {
      if (this.imageUrl) {
        console.log(this.imageUrl, 'com')
        return `https://jr-securityplus.s3.amazonaws.com/${this.imageUrl}`
      } else {
        return 'assets/layout/images/profile.png'
      }
    },

  },


}


</script>

<style scoped>

</style>