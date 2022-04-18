<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
    <!-- <img src="img/brand/itlab.png" style="width: 120px; height: auto;" alt=""> -->
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Хяналтын самбар',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard'
          }"
        />
        <sidebar-item :link="{name: 'Захиалгын жагсаалт', icon: 'ni ni-bullet-list-67 text-orange', path: '/orders'}"/>
        <sidebar-item :link="{name: 'Бүтээгдэхүүн', icon: 'ni ni-tag text-blue', path: '/products'}"/>
        <sidebar-item :link="{name: 'Купон', icon: 'ni ni-credit-card text-yellow', path: '/coupons'}"/>
        <sidebar-item :link="{name: 'Нэмэлт талбарууд', icon: 'ni ni-folder-17 text-info', path: '/quick-category'}"/>
        <sidebar-item :link="{name: 'Хэрэглэгчид', icon: 'ni ni-single-02 text-danger', path: '/users'}"/>
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue'
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
