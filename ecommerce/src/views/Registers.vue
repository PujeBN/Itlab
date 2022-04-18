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
            <div class="js-scrollbar u-sidebar__body container" v-loading.fullscreen.lock="fullscreenLoading">
                <div class="row">
                    <div class="col-md-4"></div>
                        <div class="col-md-4 pr-2 pl-2 mt-5" align="center">
                            <div class="u-sidebar__content u-header-sidebar__content card" :style="{'width': '100%'}">
                                <form class="js-validate" @submit.prevent="register">
                                    <!-- Login -->
                                    <div id="login" data-target-group="idForm">
                                        <!-- Title -->
                                        <div class="d-flex mt-5">
                                            <!-- <a class="btn btn-block btn-sm btn-soft-facebook transition-3d-hover mr-1" href="#">
                                              <span class="fab fa-facebook-square mr-1"></span>
                                              Facebook - ээр нэвтрэх
                                            </a> -->
                                            <el-button @click="logInWithFacebook" :disabled="facebookButton.disabled" type="primary" style="width: 100%; background: #4267B2;" :loading="facebookButton.load">
                                                <span class="fab fa-facebook-square mr-1"></span>
                                                {{facebookButton.text}}
                                            </el-button>
                                        </div>

                                        <div class="text-center">
                                            <span class="u-divider u-divider--text mb-4 mt-4">ЭСВЭЛ</span>
                                        </div>
                                        
                                        <div class="form-group">
                                                <div class="js-form-message js-focus-state">
                                                    <label class="sr-only" for="name">Нэр</label>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text" id="nameLabel">
                                                                <span class="fas fa-user"></span>
                                                            </span>
                                                        </div>
                                                        <input type="text" maxlength="100" class="form-control" name="name" id="name" placeholder="Нэр" aria-label="Name" aria-describedby="nameLabel" required v-model="user.name"
                                                        data-msg="Нэр оруулна уу."
                                                        data-error-class="u-has-error"
                                                        data-success-class="u-has-success">
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- End Input -->

                                            <!-- Form Group -->
                                            <div class="form-group">
                                                <div class="js-form-message js-focus-state">
                                                    <label class="sr-only" for="signupEmail">Имэйл</label>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text" id="signupEmailLabel">
                                                                <span class="fas fa-sms"></span>
                                                            </span>
                                                        </div>
                                                        <input type="email" class="form-control" name="email" id="signupEmail" placeholder="И-мэйл" aria-label="Email" aria-describedby="signupEmailLabel" required v-model="user.email"
                                                        data-msg="И-мэйл хаягаа оруулна уу."
                                                        data-error-class="u-has-error"
                                                        data-success-class="u-has-success">
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- End Input -->
                                            <div class="form-group">
                                                <div class="js-form-message js-focus-state">
                                                    <label class="sr-only" for="signupEmail">Утасны дугаар</label>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text" id="signupEmailLabel">
                                                                <span class="fas fa-phone"></span>
                                                            </span>
                                                        </div>
                                                        <input type="text" class="form-control" pattern="[0-9]{8}" name="phone" id="signupPhone" placeholder="Утасны дугаар" aria-label="phone" aria-describedby="signupEmailLabel" required v-model="user.phone"
                                                        data-msg="Утасны дугаараа оруулна уу."
                                                        data-error-class="u-has-error"
                                                        data-success-class="u-has-success">
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Form Group -->
                                            <div class="form-group">
                                                <div class="js-form-message js-focus-state">
                                                    <label class="sr-only" for="signupPassword">Password</label>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text" id="signupPasswordLabel">
                                                                <span class="fas fa-lock"></span>
                                                            </span>
                                                        </div>
                                                        <input type="password" class="form-control" name="password" id="signupPassword" placeholder="Нууц үг" aria-label="Password" aria-describedby="signupPasswordLabel" required v-model="user.password"
                                                        data-msg="Буруу нууц үг. Дахин оролдоно уу."
                                                        data-error-class="u-has-error"
                                                        data-success-class="u-has-success" minlength="8">
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- End Input -->

                                            <!-- Form Group -->
                                            <div class="form-group">
                                                <div class="js-form-message js-focus-state">
                                                <label class="sr-only" for="signupConfirmPassword">Confirm Password</label>
                                                    <div class="input-group">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="signupConfirmPasswordLabel">
                                                            <span class="fas fa-key"></span>
                                                        </span>
                                                    </div>
                                                    <input type="password" class="form-control" name="confirmPassword" id="signupConfirmPassword" placeholder="Давтан нууц үг" aria-label="Confirm Password" aria-describedby="signupConfirmPasswordLabel" required v-model="user.rePassword"
                                                    data-msg="Нууц үг тохирсонгүй."
                                                    data-error-class="u-has-error"
                                                    data-success-class="u-has-success">
                                                    </div>
                                                </div>
                                            </div>
                                        <div class="mb-2">
                                            <label class="form-check-label" style="font-weight: 400;">
                                                    Би бүртгүүлснээр <a href="javascript:;" class="text-blue" target="_blank">үйлчилгээний нөхцөл </a>-ийг зөвшөөрч байна.
                                                    <span class="text-danger">*</span>
                                                </label>
                                        </div>
                                        <div class="mb-2">
                                            <button type="submit" class="btn btn-block btn-sm btn-primary transition-3d-hover">Бүртгүүлэх</button>
                                        </div>

                                        <div class="text-center mb-4">
                                            <span class="small">Танд бүртгэл байгаа юу? </span>
                                            <router-link class="js-animation-link middle text-dark" to="/login"
                                               data-target="#signup"
                                               data-link-group="idForm"
                                               data-animation-in="slideInUp">Нэвтрэх
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
export default {
    components: {
        Brands
    },
    data() {
        return {
            fullscreenLoading: false,
            facebookButton: {
                text: 'Facebook',
                disabled: false,
                load: false
            },
            user: {
                name: '',
                email: '',
                password: '',
                rePassword: '',
                phone: ''
            }
        }
    },
    async mounted() {
        await this.loadFacebookSDK(document, "script", "login-facebook-jssdk");
        await this.initFacebook();
        this.$emit('getJquery');
    },
    beforeRouteLeave (to, from , next) {
      if(to.name == 'login') {
          next();
      } else {
          window.location.href = window.location.protocol + '//' + window.location.host + '/' + to.name;  
      }
    },
    methods: {
        register() {
            if(this.user.password === this.user.rePassword) {
                this.fullscreenLoading = true;
                let rts = this;
                rts.$axios({
                    method: 'POST',
                    url: rts.$appUrl + '/api/user/register',
                    headers: {},
                    data: {
                        user: this.user
                    }
                }).then(data => {
                    rts.fullscreenLoading = false;
                    if(data.data.result == 'success') {
                        this.$notify({
                            title: 'Амжилттай',
                            message: `Бүртгэгдлээ`,
                            type: 'success'
                        });
                    } else if(data.data.result == 'somewrong') {
                        this.$notify({
                            title: 'Амжилтгүй',
                            message: `Уучлаарай. алдаа гарлаа дахин оролдоно уу`,
                            type: 'error'
                        });
                    } else {
                        this.$notify({
                            title: 'Амжилтгүй',
                            message: `Уучлаарай. Цахим хаяг бүртгэлтэй байна`,
                            type: 'error'
                        });
                    }
                }).catch(err => {
                    console.log(err);
                    rts.fullscreenLoading = false;
                });
            } else {
                this.$notify({
                    title: 'Амжилтгүй',
                    message: `Уучлаарай. Нууц үг тохирсонгүй`,
                    type: 'error'
                });
            }
        },
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
                    appId: "316655392185211", //You will need to change this
                    cookie: true, // This is important, it's not enabled by default
                    version: "v13.0"
                });
            };
            return true;
        },
        async loadFacebookSDK(d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
                
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
            return true;
        }
    }
}
</script>