<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-body px-lg-5 py-lg-5" align="center">
                        <img src="img/brand/itlab.png" class="mb-3" :style="{'height': '40px', 'width': 'auto'}">
                        <div class="text-center text-muted mb-4">
                            <small>Хэрэглэгчийн нэр болон нууц үгээ ашиглана уу</small>
                        </div>
                        <form role="form">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Имэйл"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="model.email">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Нууц үг"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password">
                            </base-input>
                            <div class="text-center">
                                <base-button @click="login" type="primary" class="my-4">Нэвтрэх</base-button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6"></div>
                    <div class="col-6" align="right">
                        <a href="javascript:;" @click="forgotPassword" class="text-light"><small>Нууц үгээ мартсан уу?</small></a>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
  export default {
    name: 'login',
    data() {
      return {
        model: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
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
        },
        login() {
            var rts = this;
            this.$axios({
                method: 'post',
                url: rts.$appUrl +'/api/admin/login',
                headers: {},
                data: {
                    email: this.model.email,
                    password: this.model.password
                }
            }).then(data => {
                if(data.data.result == 'fail') {
                    this.$notify({
                            title: 'Амжилтгүй',
                            message: data.data.data,
                            type: 'danger'
                        });
                } else {
                    localStorage.token = data.data.token;
                    localStorage.user = JSON.stringify(data.data.data);
                    this.$notify({
                            title: 'Амжилттай',
                            message: `Системд нэвтэрлээ`,
                            type: 'success'
                        });
                    rts.$router.push('/dashboard');
                }
            });
        }
    }
  }
</script>
<style>
</style>
