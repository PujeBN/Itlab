<style scoped>
.card {
  box-shadow: 0 3px 6px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 100%;
  /* height: 120px; */
  border-radius: 10px;
}
.info-header .active {
    background: #3c3f42;
    color: #fff;
}
.header-tab:hover {
    background: #3c3f42;
    color: #fff;
}
.d-none-width {
    width: 150px; 
    max-width: 150px; 
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.d-none-price {
    width: 100px;
}
</style>
<template>
    <div>
        <main id="content" role="main" class="cart-page" v-loading.fullscreen.lock="fullscreenLoading">
            <div class="container">
                <div class="row mt-10">
                    <div class="col-md-4" style="margin-bottom: 100px;">
                        <div class="card card-primary card-outline" style="border-top-color: #393d3e;">
                            <div class="card-body box-profile mt-3">
                                <div class="text-center" :style="{'position': 'relative'}">
                                <img class="profile-user-img img-fluid img-circle"
                                    :src="user.img"
                                    alt="User profile picture">
                                </div>

                                <h3 class="profile-username text-center">{{user.name}}</h3>
                                <p class="text-center mb-10" :style="{'margin-top': '-15px'}">{{user.email}}</p>

                                <ul class="list-group list-group-unbordered mb-3">
                                <li class="list-group-item">
                                    <b>Миний бонус</b> <a class="float-right">{{Number(user.bonus).toLocaleString()}}</a>
                                </li>
                                <li class="list-group-item">
                                    <b>Миний захиалга</b>
                                </li>
                                <li class="list-group-item">    
                                    <b>Хадгалсан</b> <a class="float-right">{{saved.length}}</a>
                                </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="">
                            <div class="row info-header">
                                <div class="card active header-tab col-md-3 mb-3" :style="{'cursor': 'pointer', 'border-top-right-radius': '0', 'border-bottom-right-radius': '0'}" @click="changeActivity('info')" ref="info1">
                                    <div class="p-3">
                                        <div style="width: 100%;" class="sss">
                                            <i class="fas fa-user-alt fa-1x" :style="{'border-right': '1px solid black', 'padding-right': '5px', 'margin-right': '3px'}"></i> <span>Хувийн мэдээлэл</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card header-tab col-md-3 mb-3" :style="{'cursor': 'pointer', 'border-radius': '0'}" @click="changeActivity('password')" ref="password1">
                                    <div class=" p-3">
                                        <div style="width: 100%;">
                                            <i class="fas fa-unlock-alt fa-1x" :style="{'border-right': '1px solid black', 'padding-right': '5px', 'margin-right': '3px'}"></i> <span>Нууц үг</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card header-tab col-md-3 mb-3" :style="{'cursor': 'pointer', 'border-radius': '0'}" @click="changeActivity('saved')" ref="saved1" id="saved1">
                                    <div class="p-3">
                                        <div style="width: 100%;">
                                            <i class="fas fa-heart fa-1x" :style="{'border-right': '1px solid black', 'padding-right': '5px', 'margin-right': '3px'}"></i> <span>Хадгалсан</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card header-tab col-md-3 mb-3" :style="{'cursor': 'pointer', 'border-top-left-radius': '0', 'border-bottom-left-radius': '0'}" @click="changeActivity('orders')" ref="orders1">
                                    <div class="p-3">
                                        <div style="width: 100%;">
                                            <i class="fas fa-clipboard-list fa-1x" :style="{'border-right': '1px solid black', 'padding-right': '5px', 'margin-right': '3px'}"></i> <span>Захиалгууд</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div class="row">
                            <div class="col-md-12 card">
                                <div class="card-body">
                                    <div class="tab-content">
                                        <div class="tab-pane" ref="password" id="password">
                                            <form @submit.prevent="changePassword">
                                                <div class="row">
                                                    <div class="col-md-12" align="center">
                                                        <i class="fas fa-unlock-alt fa-3x mb-3"></i>
                                                    </div>
                                                    <div class="col-md-3"></div>
                                                    <div class="col-md-6"><el-input placeholder="Шинэ нууц үг" minlength="6" maxlength="60" v-model="password" clearable show-password></el-input></div>
                                                    <div class="col-md-3"></div>
                                                    <div class="col-md-3"></div>
                                                    <div class="col-md-6 mt-2"><el-input placeholder="Давтан нууц үг" minlength="6" maxlength="60" v-model="confirmPassword" show-password clearable></el-input></div>
                                                    <div class="col-md-3"></div>
                                                    <div class="col-md-3"></div>
                                                    <div class="col-md-6 mt-2">
                                                        <button type="submit" class="btn btn-primary-dark-w mt-2" style="width: 100%; border-radius: 5px;">Хадгалах</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    <!-- /.tab-pane -->

                                    <div class="active tab-pane" ref="info" id="info">
                                        <form @submit.prevent="updateUser">
                                            <h6 class="">Хувийн мэдээлэл</h6>
                                            <div class="row p-5">
                                                <div class="col-md-6"><el-input placeholder="Нэр" required maxlength="100" v-model="info.name" clearable></el-input></div>
                                                <div class="col-md-6"><el-input placeholder="Имэйл" required type="email" v-model="info.email" clearable></el-input></div>
                                                <div class="col-md-6 mt-3"><el-input required pattern="[0-9]{8}" placeholder="Утасны дугаар" v-model="info.phone" clearable></el-input></div>
                                                <div class="col-md-6 mt-3"><el-input pattern="[0-9]{8}" placeholder="Утасны дугаар 2 (заавал биш)" v-model="info.phone2" clearable></el-input></div>
                                                <div class="col-md-9"></div>
                                                <div class="col-md-3">
                                                    <button type="submit" class="btn btn-primary-dark-w mt-2" style="width: 100%; border-radius: 12px;">Хадгалах</button>
                                                </div>
                                            </div>  
                                        </form>
                                    </div>
                                    <div class="tab-pane" ref="saved" id="saved">
                                        <table class="table" cellspacing="0">
                                            <tbody>
                                                <div v-for="(item, index) in saved" :key="index" class="card mb-2">
                                                    <tr class="mobile-product" :style="{'position': 'relative', 'vertical-align': 'middle'}">
                                                        <!-- <td class="text-center">
                                                            <a href="#" class="text-gray-32 font-size-26">×</a>
                                                        </td> -->
                                                        <td class="d-none d-md-table-cell pr-5" >
                                                            <router-link :to="'/single-product/'+item.id"><img class="img-fluid max-width-60 p-1 " :src="$appUrl+'/images/product/'+item.image" alt="Image Description"></router-link>
                                                        </td>

                                                        <td data-title="Бүтээгдэхүүн" class="d-none-width">
                                                            <router-link :to="'/single-product/'+item.id" class="text-gray-90">{{item.name}}<br><strong>{{item.model}}</strong></router-link>
                                                        </td>
                                                        <td class="d-none-price">
                                                            #{{item.color_name}}
                                                        </td>
                                                        <td data-title="Үнэ" class="d-none-price">
                                                            <div>
                                                                <span class="">₮{{Number(item.sale_price).toLocaleString()}}</span>
                                                            </div>
                                                        </td>
                                                        <div class="text-center mt-10 d-flex" :style="{'position': 'absolute', 'right': '30px', 'bottom': '15px'}">
                                                            <a href="javascript:;" @click="removeFavourite(item.id)" class="text-sale"><i class="fas fa-trash-alt mr-1"></i> Устгах</a>
                                                        </div>
                                                    </tr>
                                                </div>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="tab-pane" ref="orders" id="orders">
                                        <table class="table" cellspacing="0">
                                            <tbody>
                                                <div v-for="(item, index) in order" :key="index" class="card mb-2">
                                                    <tr class="mobile-product" :style="{'position': 'relative', 'vertical-align': 'middle'}">
                                                        <td data-title="Бүтээгдэхүүн" class="d-none-width">
                                                            <router-link :style="{'color': 'grey'}" :to="'/show-order/'+item.ordernumber"><strong>#{{item.ordernumber}}</strong></router-link>
                                                        </td>
                                                        <td :style="{'width': '200px'}" align="center">
                                                            <span class="text-gray-80 ml-2">{{item.created_at.split('T')[0]}}</span>
                                                        </td>
                                                        <td class="" :style="{'width': '200px', 'padding-left': '20px'}">
                                                            <span v-if="item.status == 'pending'" :style="{'font-weight': '700', 'font-size': '12px', 'color': '#de4437'}">Хүлээгдэж байгаа</span>
                                                            <span v-else-if="item.status == 'shipping'" :style="{'font-weight': '700', 'font-size': '12px', 'color': '#ffc107'}">Хүргэлтэнд гарсан</span>
                                                            <span v-else-if="item.status == 'delivered'" :style="{'font-weight': '700', 'font-size': '12px', 'color': '#77838f'}">Захиалга хүргэгдсэн</span>
                                                            <span v-else-if="item.status == 'paid'" :style="{'font-weight': '700', 'font-size': '12px', 'color': '#00c9a7'}">Төлбөр төлөгдсөн</span>
                                                            <span v-else-if="item.status == 'expired'" :style="{'font-weight': '700', 'font-size': '12px', 'color': '#de4437'}">Цуцлагдсан</span>
                                                        </td>
                                                        <td>
                                                            {{Number(item.total_amount).toLocaleString()}}₮
                                                        </td>
                                                    </tr>
                                                </div>
                                            </tbody>
                                        </table>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
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
            user: [],
            info: {
                name: '',
                phone: '',
                email: '',
                phone2: ''
            },
            password: '',
            confirmPassword: '',
            saved: [],
            order: [],
            role: undefined
        }
    },
    beforeRouteUpdate (to, from, next) {
        this.role = to.query.role;
        this.getUser();
        next();
    },
    mounted() {
        this.role = this.$route.query.role;
        this.$emit('getJquery');
        this.getUser();
    },
    methods: {
        removeFavourite(id) {
            const token = localStorage.getItem('token');
            var rts = this;
            rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/product/remove-favourite',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    id: id
                }
            }).then(data => {
                rts.saved.forEach((el, index) => {
                    if(id == el.id) {
                        rts.saved.splice(index,1);
                    }
                });
            });
        },
        changePassword() {
            if(this.password != this.confirmPassword) {
                this.$notify({
                    title: 'Амжилтгүй',
                    message: `Давтан нууц үг буруу`,
                    type: 'error'
                });
            } else {
                const token = localStorage.getItem('token');
                var rts = this;
                rts.$axios({
                    method: 'POST',
                    url: rts.$appUrl + '/api/user/change-password',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    data: {
                        password: this.password
                    }
                }).then(data =>{
                    rts.$notify({
                        title: 'Амжилттай',
                        message: `Нууц үг шинэчлэгдлээ`,
                        type: 'success'
                    });
                });
            }
        },
        updateUser() {
            const token = localStorage.getItem('token');
            var rts = this;
            rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/user/update-info',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    info: this.info
                }
            }).then(data => {
                let user = JSON.parse(localStorage.getItem('user'));
                user.email = rts.info.email;
                user.name = rts.info.name;
                user.phone = rts.info.phone;
                user.phone2 = rts.info.phone2;
                localStorage.user = JSON.stringify(user);
                rts.user.name = rts.info.name;
                rts.user.email = rts.info.email;
                rts.user.phone = rts.info.phone;
                rts.user.phone2 = rts.info.phone2;
                rts.$emit('updateUser');
                rts.$notify({
                    title: 'Амжилттай',
                    message: `Мэдээлэл шинэчлэгдлээ`,
                    type: 'success'
                });
            });
        },
        changeActivity(value) {
            var tabs = ['password', 'saved', 'info', 'orders'];
            tabs.forEach(element => {
                if(element == value) {
                    this.$refs[element].classList.add('active');
                    this.$refs[element+'1'].classList.add('active');
                } else {
                    this.$refs[element].classList.remove('active');
                    this.$refs[element+'1'].classList.remove('active');
                }
            });
        },
        getUser() {
            const token = localStorage.getItem('token');
            var rts = this;
            rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/user/my-info',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(data => {
                rts.saved = data.data.save;
                rts.order = data.data.order;
                rts.user = data.data.info[0];
                rts.info.name = data.data.info[0].name;
                rts.info.email = data.data.info[0].email;
                rts.info.phone = data.data.info[0].phone;
                rts.info.phone2 = data.data.info[0].phone2;
            }).catch(err => {
                rts.$router.push('/error-page');
            });
            if(this.role == 'saved') {
                const el = document.getElementById("saved1");
                el.click();
            }
        }
    }
}
</script>