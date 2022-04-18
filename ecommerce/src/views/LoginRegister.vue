<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 40%;
  border-radius: 20px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
</style>
<template>
    <div>
            <div class="js-scrollbar u-sidebar__body container">
                <div class="row">
                    <div class="col-md-4"></div>
                        <div class="col-md-4 pr-2 pl-2 mt-7" align="center">
                            <div class="u-sidebar__content u-header-sidebar__content card" :style="{'width': '100%'}">
                                <form class="js-validate" @submit.prevent="login">
                                    <!-- Login -->
                                    <div id="login" data-target-group="idForm">
                                        <div class="d-flex mt-5" align="center">
                                            <!-- <a class="btn btn-block btn-sm btn-soft-facebook transition-3d-hover mr-1" :disabled="facebookButton.disabled" href="javascript:;" @click="logInWithFacebook">
                                              <span class="fab fa-facebook-square mr-1"></span>
                                              {{facebookButton.text}}
                                            </a> -->
                                            <!-- <LoginBtn style="width: 100%"/> -->
                                            <el-button @click="logInWithFacebook" :disabled="facebookButton.disabled" type="primary" style="width: 100%; background: #4267B2;" :loading="facebookButton.load">
                                                <span class="fab fa-facebook-square mr-1"></span>
                                                {{facebookButton.text}}
                                            </el-button>
                                            <!-- <div class="fb-login-button" data-width="100" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false"></div> -->
                                        </div>

                                        <div class="text-center">
                                            <span class="u-divider u-divider--text mb-4 mt-4">ЭСВЭЛ</span>
                                        </div>

                                        <!-- Form Group -->
                                        <div class="form-group">
                                            <div class="js-form-message js-focus-state">
                                                <label class="sr-only" for="signinEmail">Хэрэглэгчийн нэр</label>
                                                <div class="input-group">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="signinEmailLabel">
                                                            <span class="fas fa-user"></span>
                                                        </span>
                                                    </div>
                                                    <input type="email" class="form-control" name="email" id="signinEmail" placeholder="Хэрэглэгчийн нэр" aria-label="Email" aria-describedby="signinEmailLabel" required
                                                    data-msg="Please enter a valid email address."
                                                    data-error-class="u-has-error"
                                                    v-model="email"
                                                    data-success-class="u-has-success">
                                                </div>
                                            </div>
                                        </div>
                                        <!-- End Form Group -->

                                        <!-- Form Group -->
                                        <div class="form-group">
                                            <div class="js-form-message js-focus-state">
                                              <label class="sr-only" for="signinPassword">Нууц үг</label>
                                              <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="signinPasswordLabel">
                                                        <span class="fas fa-lock"></span>
                                                    </span>
                                                </div>
                                                <input type="password" class="form-control" name="password" id="signinPassword" placeholder="Нууц үг" aria-label="Password" aria-describedby="signinPasswordLabel" required
                                                   data-msg="Your password is invalid. Please try again."
                                                   data-error-class="u-has-error"
                                                   v-model="password"
                                                   data-success-class="u-has-success">
                                              </div>
                                            </div>
                                        </div>
                                        <!-- End Form Group -->

                                        <div class="d-flex justify-content-end mb-4">
                                            <a class="js-animation-link small link-muted" href="javascript:;"
                                               data-target="#forgotPassword"
                                               data-link-group="idForm"
                                               @click="forgotPassword"
                                               data-animation-in="slideInUp">Нууц үгээ мартсан уу?</a>
                                        </div>

                                        <div class="mb-2">
                                            <button type="submit" class="btn btn-block btn-sm btn-primary transition-3d-hover">Нэвтрэх</button>
                                        </div>

                                        <div class="text-center mb-4">
                                            <span class="small">Бүртгэл үүсгэж амжаагүй байна уу? </span>
                                            <router-link class="js-animation-link middle text-dark" to="/register"
                                               data-target="#signup"
                                               data-link-group="idForm"
                                               data-animation-in="slideInUp">Бүртгүүлэх
                                            </router-link>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                <div class="col-md-3"></div>
            </div>
        </div>
        <Brands />
    </div>
</template>
<script>
import Brands from "@/components/brands";
import LoginBtn from "@/components/facebookLogin";
import facebookLogin from 'facebook-login-vuejs'
export default {
    components: {
        Brands,
        facebookLogin,
        LoginBtn
    },
    data() {
        return {
            inited: false,
            fullscreenLoading: false,
            email: '',
            password: '',
            facebookButton: {
                text: 'Facebook',
                disabled: false,
                load: false
            }
        }
    },
    async mounted() {    
        await this.loadFacebookSDK(document, "script", "facebook-jssdk");
        this.inited = true;
        // await this.initFacebook();

        this.$emit('getJquery');
        if(this.$route.query.sms) {
            this.$notify({
                title: 'Амжилттай',
                message: 'И-мэйл хаяг амжилттай баталгаажлаа.',
                type: 'success'
            });
        }
    },
    beforeRouteLeave (to, from , next) {
      if(to.name == 'register') {
          next();
      } else {
          window.location.href = window.location.protocol + '//' + window.location.host + '/' + to.name;  
      }
    },
    methods: {
        async logInWithFacebook() {
            let rts = this;
            this.facebookButton.text = 'Түр хүлээнэ үү...';
            this.facebookButton.disabled = true;
            this.facebookButton.load = true;
            const FB = window.FB;
            
            FB.login(function(response) {
                if (response.authResponse) {
                    rts.$axios({
                        method: 'GET',
                        url: `https://graph.facebook.com/v9.0/me?fields=id%2Cname%2Cemail%2Cpicture&access_token=${response.authResponse.accessToken}`,
                    }).then(function(data) {
                        rts.withFacebookLogin(data);
                    }).catch(error => {
                            rts.facebookButton.text = 'Facebook -ээр нэвтрэх';
                            rts.facebookButton.load = false;
                            rts.facebookButton.disabled = false;
                            this.facebookButton.load = false;
                        rts.$notify({
                            title: 'Амжилтгүй',
                            message: `Уучлаарай. Шаардлагатай талбарууд татагдсангүй.`,
                            type: 'error'
                        });
                    })
                } else {
                    rts.facebookButton.text = 'Facebook';
                    rts.facebookButton.disabled = false;
                    this.facebookButton.load = false;
                }
            },{scope: 'public_profile,email'});
            
        },
        withFacebookLogin(data) {
        let rts = this;
        rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/user/facebook-login',
                headers: {},
                data: {
                    user: data.data
                }
                }).then(data => {
                if(data.data.result === 'success') {
                    rts.$notify({
                        title: 'Амжилттай',
                        message: `Системд амжилттай нэвтэрлээ`,
                        type: 'success'
                    });

                    rts.facebookButton.text = 'Facebook';
                    rts.facebookButton.disabled = true;
                    this.facebookButton.load = false;
                    localStorage.token = data.data.token;
                    localStorage.user = JSON.stringify(data.data.data);
                    rts.$router.push('/home');
                }
        });
        },
        async initFacebook() {
            window.fbAsyncInit = function() {
                window.FB.init({
                    appId: "468487921727818",
                    cookie: true,
                    version: "v13.0"
                });
            };
            return true;
        },
        async loadFacebookSDK(d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return true;
            }
            js = d.createElement(s);
            js.id = id;
            // js.src = "https://connect.facebook.net/en_US/sdk.js";
            js.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v13.0&appId=468487921727818&autoLogAppEvents=1";
            // js.src = "https://connect.facebook.net/en_US/fbevents.js";
            fjs.parentNode.insertBefore(js, fjs);
            return true;
        },
        login() {
            var rts = this;
            this.$axios({
                method: 'post',
                url: rts.$appUrl +'/api/user/login',
                headers: {},
                data: {
                    email: this.email,
                    password: this.password
                }
            }).then(data => {
                if(data.data.result == 'fail') {
                    this.$notify({
                        title: 'Амжилтгүй',
                        message: data.data.data,
                        type: 'error'
                    });
                } else {
                    this.$notify({
                        title: 'Амжилттай',
                        message: `Системд амжилттай нэвтэрлээ`,
                        type: 'success'
                    });
                    localStorage.token = data.data.token;
                    localStorage.user = JSON.stringify(data.data.data);
                    rts.$router.push('/home');
                }
            });
        },
        forgotPassword() {
            this.$prompt('И-мэйл хаягаа оруулна уу', 'Нууц үг сэргээх', {
                confirmButtonText: 'Сэргээх',
                cancelButtonText: 'Болих',
                inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                inputErrorMessage: 'Invalid Email'
            }).then(({ value }) => {
                this.fullscreenLoading = true;
                var rts = this;
                this.$axios({
                    method: 'post',
                    url: rts.$appUrl +'/api/user/forgot-password',
                    headers: {},
                    data: {
                        email: value
                    }
                }).then(data => {
                    rts.fullscreenLoading = false;
                    if(data.data.result == 'failed') {
                        this.$message({
                            message: data.data.data,
                            type: 'warning'
                        });
                    } else {
                        this.$message({
                            message: data.data.data,
                            type: 'success'
                        });
                    }
                });
            });
        }
    }
}
</script>