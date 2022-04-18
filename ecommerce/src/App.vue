<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import Vue from "vue";
import VueFbCustomerChat from 'vue-fb-customer-chat';
export default {
  created() {
    if(this.$route.name != 'login' && this.$route.name != 'register') {
      if (!document.getElementById("facebook-jssdk")) {
            Vue.use(VueFbCustomerChat, {
                page_id: 1662965160606906,
                theme_color: '#393d3e',
                locale: 'en_US',
            })
        }
    }
  }
}
</script>