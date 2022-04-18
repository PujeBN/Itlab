<template>
  <div id="app">
    <facebook-login class="button"
      
      ref="loginBtn"
      appId="316655392185211"
      @login="onLogin"
      @logout="onLogout"
      @get-initial-status="getUserData"
      @sdk-loaded="sdkLoaded">
    </facebook-login>
    <el-button @click="logInWithFacebook" :disabled="facebookButton.disabled" type="primary" style="width: 100%; background: #4267B2;" :loading="facebookButton.load">
        <span class="fab fa-facebook-square mr-1"></span>
        {{facebookButton.text}}
    </el-button>
  </div>
</template>
<script>
import facebookLogin from 'facebook-login-vuejs'
export default {
    components: {
      facebookLogin
    },
    data() {
        return {
            isConnected: false,
            name: '',
            email: '',
            personalID: '',
            picture: '',
            FB: undefined,
            facebookButton: {
                text: 'Facebook',
                disabled: false,
                load: false
            }
        }
    },
    async mounted() {
        await this.loadFacebookSDK(document, "script", "facebook-jssdk");
    },
    methods: {
        async loadFacebookSDK(d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            // js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
            fjs.parentNode.insertBefore(js, fjs);
            return true;
        },
        logInWithFacebook() {
            this.$refs.loginBtn.login(data => {
                console.log(data);
            });
        },
        getUserData() {
            this.FB.api('/me', 'GET', { fields: 'id,name,email,picture' },
                user => {
                    console.log(user);
                }
            )
        },
        sdkLoaded(payload) {
            this.isConnected = payload.isConnected
            this.FB = payload.FB
            if (this.isConnected) this.getUserData()
        },
        onLogin() {
            this.isConnected = true
            this.getUserData()
        },
        onLogout() {
            this.isConnected = false;
        }
    }
    
}
</script>