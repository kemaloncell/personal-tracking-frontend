<template>
  <div :class="containerClass" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle"/>

    <transition name="layout-sidebar">
      <div :class="sidebarClass" @click="onSidebarClick" v-show="isSidebarVisible()">
        <AppProfile/>
        <AppMenu :model="menu" @menuitem-click="onMenuItemClick"/>
      </div>
    </transition>

    <div class="layout-main">
      <slot class="content-slot" name="content"/>
    </div>

    <AppFooter/>
  </div>
</template>

<script>
import AppTopBar from './main/Header.vue';
import AppProfile from '../views/Auth/Profile.vue';
import AppMenu from './main/SideBar.vue';
import AppFooter from './main/Footer.vue';
import {mapActions} from 'vuex'

export default {
  components: {
    'AppTopBar': AppTopBar,
    'AppProfile': AppProfile,
    'AppMenu': AppMenu,
    'AppFooter': AppFooter,
  },
  data() {
    return {
      layoutMode: 'static',
      layoutColorMode: 'dark',
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      menu: [
        {label: 'Anasayfa', icon: 'pi pi-fw pi-home', to: '/'},
        {
          label: 'Finans', icon: 'pi pi-fw pi-money-bill',
          items: [
            {label: 'Ödemeler', icon: 'pi pi-fw pi-money-bill', to: '/finances/payments'},
            {label: 'Bakiye', icon: 'pi pi-fw pi-inbox', to: '/finances/balances'},
            {label: 'Hakediş', icon: 'pi pi-fw pi-ticket', to: '/finances/vesting'},
          ]
        },
        {
          label: 'İzin Talep', icon: 'pi pi-fw pi-th-large',
          items: [
            {label: 'İzin Günleri', icon: 'pi pi-fw pi-folder', to: '/demands/off-days'},
            {label: 'Ortak İzin Günleri', icon: 'pi pi-fw pi-folder-open', to: '/demands/common-off-days'},
            {label: 'Avans Talebi', icon: 'pi pi-fw pi-envelope', to: '/demands/advance'},
          ]
        },
        {label: 'Personal Yönetimi', icon: 'pi pi-fw pi-user-plus', to: '/employees'},
        {label: 'Müşteri Yönetimi', icon: 'pi pi-fw pi-user-plus', to: '/customers'},
        {label: 'Tedarikçiler', icon: 'pi pi-fw pi-users', to: '/suppliers'},
        {label: 'Saha Yönetimi', icon: 'pi pi-fw pi-external-link', to: '/fields'},
        {label: 'Vardiya Yönetimi', icon: 'pi pi-fw pi-table', to: '/shifts'},
      ]
    }
  },
  methods: {
    ...mapActions({
      callMe: 'auth/callMe'
    }),

    onWrapperClick() {
      if (!this.menuClick) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }

      this.menuClick = false;
    },
    onMenuToggle() {
      this.menuClick = true;

      if (this.isDesktop()) {
        if (this.layoutMode === 'overlay') {
          if (this.mobileMenuActive === true) {
            this.overlayMenuActive = true;
          }

          this.overlayMenuActive = !this.overlayMenuActive;
          this.mobileMenuActive = false;
        } else if (this.layoutMode === 'static') {
          this.staticMenuInactive = !this.staticMenuInactive;
        }
      } else {
        this.mobileMenuActive = !this.mobileMenuActive;
      }
    },

    onSidebarClick() {
      this.menuClick = true;
    },
    onMenuItemClick(event) {
      if (event.item && !event.item.items) {

        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }
    },
    addClass(element, className) {
      if (element.classList)
        element.classList.add(className);
      else
        element.className += ' ' + className;
    },
    removeClass(element, className) {
      if (element.classList)
        element.classList.remove(className);
      else
        element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    },
    isDesktop() {
      return window.innerWidth > 1024;
    },
    isSidebarVisible() {
      if (this.isDesktop()) {
        if (this.layoutMode === 'static')
          return !this.staticMenuInactive;
        else if (this.layoutMode === 'overlay')
          return this.overlayMenuActive;
        else
          return true;
      } else {
        return true;
      }
    },
  },
  computed: {
    containerClass() {
      return ['layout-wrapper', {
        'layout-overlay': this.layoutMode === 'overlay',
        'layout-static': this.layoutMode === 'static',
        'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
        'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
        'layout-mobile-sidebar-active': this.mobileMenuActive,
        'p-input-filled': this.$appState.inputStyle === 'filled',
        'p-ripple-disabled': this.$primevue.ripple === false
      }];
    },
    sidebarClass() {
      return ['layout-sidebar', {
        'layout-sidebar-dark': this.layoutColorMode === 'dark',
        'layout-sidebar-light': this.layoutColorMode === 'light'
      }];
    },
  },
  beforeUpdate() {
    if (this.mobileMenuActive)
      this.addClass(document.body, 'body-overflow-hidden');
    else
      this.removeClass(document.body, 'body-overflow-hidden');
  },

  created() {
    this.callMe()
  }
}
</script>

<style lang="scss">
@import '../assets/App';


</style>
