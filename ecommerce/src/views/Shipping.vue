<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 100%;
  /* height: 120px; */
  border-radius: 10px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.d-none-width {
    width: 250px; 
    max-width: 250px; 
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.d-none-price {
    width: 100px;
}

@media only screen and (max-width: 600px) {
  .d-none-width {
    width: auto;
    max-width: 100%;
  }
  .d-none-price {
      width: auto;
  }
  .mobile-product {
      padding: 20px;
  }
}
</style>
<template>
    <div>
        <main id="content" role="main" class="cart-page" v-loading.fullscreen.lock="fullscreenLoading">
            <div class="container">
                <div class="row mb-5 mt-5">
                    <div class="col-md-3"></div>
                    <div class="col-md-6">
                        <el-steps :active="2">
                            <el-step title="Сагс" align="left" icon="el-icon-sold-out"></el-step>
                            <el-step title="Хаяг" icon="el-icon-truck"></el-step>
                            <el-step align="center" title="Захиалах" icon="el-icon-thumb"></el-step>
                        </el-steps>
                    </div>
                    <div class="col-md-3"></div>
                </div>
            </div>

            <div class="container">
                <div class="mb-4" align="left">
                    <h5 class="ml-1">Хүргэлтийн хаяг</h5>
                </div>
                <form @submit.prevent="submitForm" ref="form" id="form">
                    <div class="row">
                        <div class="mb-2 cart-table col-md-8 card p-5">
                            <div class="row">
                                <div class="col-md-6 mt-2">
                                    <button type="button" class="btn btn-outline-primary" @click="changePersonal(true)" v-bind:class="{'btn-primary-dark-w': shipping.user.personal == true}" style="width: 100%; border-radius: 10px; height: 70px;"><i class="fas fa-user-tie lg pr-1"></i> Хувь хүн</button>
                                </div>
                                <div class="col-md-6 mt-2">
                                    <button type="button" class="btn btn-outline-primary" @click="changePersonal(false)" v-bind:class="{'btn-primary-dark-w': shipping.user.personal == false}" style="width: 100%; border-radius: 10px; height: 70px;"><i class="fas fa-store-alt lg pr-1"></i> Албан байгууллага</button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mt-2">
                                    <label class=""> <strong>Нэр <span class="text-danger">*</span></strong></label>
                                    <el-input
                                        placeholder=""
                                        required
                                        v-model="shipping.user.name"
                                        clearable>
                                    </el-input>
                                </div>
                                <div class="col-md-6 mt-2">
                                    <label class=""> <strong>Утасны дугаар <span class="text-danger">*</span></strong></label>
                                    <el-input
                                        placeholder=""
                                        required
                                        pattern="\d{8}"
                                        v-model="shipping.user.phone"
                                        clearable>
                                    </el-input>
                                </div>
                                <!-- <div class="col-md-6 mt-2">
                                    <label class=""> <strong>Имэйл хаяг <span class="text-danger">*</span></strong></label>
                                    <el-input
                                        placeholder=""
                                        required
                                        pattern="[a-zA-Z0-9._\-]{3,}@[a-zA-Z0-9_-]{2,}\.[a-zA-Z]{2,6}"
                                        v-model="shipping.user.email"
                                        clearable>
                                    </el-input>
                                </div> -->
                                <div class="col-md-6 mt-2">
                                    <label class=""> <strong>Имэйл хаяг <span class="text-danger">*</span></strong></label>
                                    <el-input
                                        placeholder=""
                                        required
                                        type="email"
                                        v-model="shipping.user.email"
                                        clearable>
                                    </el-input>
                                </div>
                                <div v-if="shipping.user.personal == true" class="col-md-6 mt-2">
                                    <label class=""> <strong>Утасны дугаар 2</strong></label>
                                    <el-input
                                        placeholder=""
                                        pattern="\d{8}"
                                        v-model="shipping.user.phone2"
                                        clearable>
                                    </el-input>
                                </div>
                                <div v-else class="col-md-6 mt-2">
                                    <label class=""> <strong>Байгууллагын регистр <span class="text-danger">*</span></strong></label>
                                    <el-input
                                        placeholder=""
                                        required
                                        pattern="\d{7}"
                                        v-model="shipping.user.register"
                                        clearable>
                                    </el-input>
                                </div>
                                <div class="col-md-12" style="margin-top: 35px;">
                                    <el-input placeholder="гурван.үгт.хаяг (заавал биш)" v-model="shipping.w3w" class="input-with-select">
                                        <el-button slot="prepend" class="p-1" :style="{'background': '#fff', 'disabled': 'true', 'cursor': 'default'}"><img src="@/assets/images/logo/w3w.png" width="30px" height= "29px"></el-button>  
                                        <el-button slot="append" @click="getWhat3Words" class="p-2" :style="{'background': '#fff'}"><img src="@/assets/images/logo/location.png" width="22px" height= "21px"></el-button>
                                    </el-input>
                                </div>
                                <div class="col-md-6 mt-2">
                                    <label class=""> <strong>Дүүрэг <span class="text-danger">*</span></strong></label>
                                    <el-select @change="calculateShipping" v-model="shipping.user.district" filterable placeholder="Дүүрэг" :style="{'width': '100%'}">
                                        <el-option
                                            v-for="(item, index) in range.district"
                                            :key="index"
                                            :label="item.district"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="col-md-6 mt-2">
                                    <label class=""> <strong>Хороо <span class="text-danger">*</span></strong></label>
                                    <el-select @change="calculateShipping" v-model="shipping.user.khoroo" filterable placeholder="Хороо" :style="{'width': '100%'}">
                                        <el-option
                                            v-for="(item, index) in selectKhoroo(shipping.user.khoroo)"
                                            :key="index"
                                            :label="item + '-р хороо'"
                                            :value="item">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="col-md-12 mt-2">
                                    <label class=""> <strong>Дэлгэрэнгүй хаяг <span class="text-danger">*</span></strong></label>
                                    <el-input
                                        placeholder=""
                                        required
                                        maxlength="100"
                                        type="textarea"
                                        :autosize="{ minRows: 3, maxRows: 5}"
                                        v-model="shipping.user.more"
                                        clearable>
                                    </el-input>
                                </div>
                            </div>
                        </div>
                        <div class="mb-8 cart-total col-md-4" align="center">
                            <div class="row card p-5">
                                <div class="col-md-12">
                                    <div class="border-bottom border-color-1 mb-3" align="right">
                                        <h3 class="d-inline-block  mb-0 pb-2 font-size-26">Захиалгын мэдээлэл</h3>
                                    </div>
                                    <table class="table mb-3 mb-md-0">
                                        <tbody>
                                            <tr class="cart-subtotal">
                                                <th>Үнэ</th>
                                                <td data-title="Үнэ"><span class="amount">₮{{Number(cart.subtotal).toLocaleString()}}</span></td>
                                            </tr>
                                            <tr class="cart-subtotal">
                                                <th>Нэмэгдэх бонус</th>
                                                <td data-title="Нэмэгдэх бонус"><span class="amount">₮{{Number(parseInt(cart.bonus)).toLocaleString()}}</span></td>
                                            </tr>
                                            <tr class="cart-subtotal">
                                                <th>Ашиглах бонус</th>
                                                <td data-title="Ашиглах бонус"><el-input-number style="width: 120px" class="amount" @change="changeBonus" size="mini" :min="0" :max="this.cart.bonusLimit" v-model="cart.useBonus"></el-input-number></td>
                                            </tr>
                                            <tr class="cart-subtotal">
                                                <th>Хямдрал</th>
                                                <td data-title="Хямдрал"><span class="amount">₮{{Number(parseInt(cart.sale)).toLocaleString()}}</span></td>
                                            </tr>
                                            <tr class="cart-subtotal">
                                                <th>Хүргэлт</th>
                                                <td data-title="Хүргэлт"><span class="amount">₮{{Number(parseInt(shipping.amount)).toLocaleString()}}</span></td>
                                            </tr>
                                            <tr class="cart-subtotal">
                                                <th>Хөнгөлөлт</th>
                                                <td data-title="Хөнгөлөлт"><span class="amount">₮{{Number(parseInt(coupon.amount)).toLocaleString()}}</span></td>
                                            </tr>
                                            <tr class="order-total">
                                                <th>Нийт</th>
                                                <td data-title="Нийт"><strong><span class="amount">₮{{Number(parseInt(cart.subtotal - cart.sale) + shipping.amount - coupon.amount - parseInt(cart.useBonus)).toLocaleString()}}</span></strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row p-2 card mt-3">
                                <div v-if="coupon.active == false" class="col-md-12" align="center">
                                    <el-collapse :style="{'border': 'none'}">
                                        <el-collapse-item name="1">
                                            <template slot="title" :style="{'vertical-align': 'middle'}">
                                                <!-- <TagIcon :style="{'width': '20px', 'height': '20px', 'margin-top': '-3px', 'margin-right': '5px'}" />  -->
                                                <!-- <i class="fas fa-tag fa-lg" :style="{'margin-right': '5px'}"></i>  -->
                                                <i class="fas fa-wallet fa-lg mr-3"></i> Купон код ашиглах
                                            </template>
                                            <div class="flex">
                                                <el-input placeholder="Купон кодоо оруулна уу" class="input-with-select" v-model="coupon.code" clearable>
                                                    <el-button @click="useCoupon" slot="append" :style="{'background': '#393d3e', 'color': '#fff'}">Ашиглах</el-button>
                                                </el-input>
                                            </div>
                                        </el-collapse-item>
                                    </el-collapse>
                                </div>
                                <div v-else>
                                    <el-alert type="warning" @close="RemoveCoupon">
                                        <template slot="title">
                                            <i class="fas fa-tag fa-lg" :style="{'margin-right': '5px'}"></i> {{coupon.code}}
                                        </template>
                                    </el-alert>
                                </div>
                            </div>
                            <div class="row pl-1 pr-1">
                                <div class="col-md-12" align="center">
                                    <button type="submit" class="btn btn-primary-dark-w mt-3" style="width: 100%; border-radius: 12px;">Захиалга баталгаажуулах</button>
                                    <button type="button" @click="backRoute" class="btn btn-outline-primary mt-1" style="width: 100%; border-radius: 12px;">Сагс руу буцах</button>
                                    <!-- <router-link type="button" to="/cart" class="btn btn-warning mt-1" style="width: 100%; border-radius: 12px;">Сагс руу буцах</router-link> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
        <Brands />
        <el-dialog title="Газрын зураг" :visible.sync="dialogMap" :modalAppendToBody="false">
            <Map />
        </el-dialog>
    </div>
</template>
<script>
import Brands from "@/components/brands";
import Map from "@/components/map";
const api = require("@what3words/api");
api.setOptions({ key: "E5XS8ZV3" });

export default {
    components: {
        Brands,
        Map
    },
    data() {
        return {
            map: null,
            dialogMap: false,
            fullscreenLoading: false,
            cart: {
                product: [],
                real: [],
                subtotal: 0,
                sale: 0,
                bonus: 0,
                useBonus: 0,
                bonusLimit: 0
            },
            shipping: {
                amount: 0,
                user: {
                    personal: true,
                    district: '',
                    khoroo: 1,
                    more: '',
                    name: '',
                    phone: '',
                    phone2: '',
                    email: '',
                    register: '',
                    bonus: 0
                },
                w3w: '',
                lat: 47.919143,
                long: 106.917597
            },
            range: {
                district: [],
            },
            coupon: {
                code: null,
                active: false,
                amount: 0
            }
        }
    },
    mounted() {
        this.$emit('getJquery');
        this.getProduct();
    },
    methods: {
        backRoute() {
            this.$router.push('/cart');
        },
        getCenter() {
            console.log(map.getCenter().toJSON());
        },
        changeBonus() {
            localStorage.bonus = this.cart.useBonus;
        },
        calculateBonusLimit() {
            var am = this.cart.subtotal - this.cart.sale  - this.coupon.amount;
            var limit = parseInt(am / 2);
            
            if(limit > this.shipping.user.bonus) {
                this.cart.bonusLimit = this.shipping.user.bonus;
            } else {
                this.cart.bonusLimit = limit;
            }
            localStorage.bonusLimit = this.cart.bonusLimit;
            var b = localStorage.getItem('bonus');
            if(b != null) {
                this.cart.useBonus = b;
            } else {
                this.cart.useBonus = this.cart.bonusLimit;
                localStorage.bonus = this.cart.useBonus;
            }
        },
        getWhat3Words() {
            var rts = this;
            navigator.geolocation.getCurrentPosition(function (params) {
                rts.shipping.lat = params.coords.latitude;
                rts.shipping.long = params.coords.longitude;
                api.convertTo3wa({lat:params.coords.latitude, lng:params.coords.longitude, language: "mn"})
                .then(data => {
                    rts.shipping.w3w = data.words;
                    localStorage.w3w = data.words;
                });
            });

        },
        RemoveCoupon() {
            localStorage.removeItem('coupon');
            this.coupon.code = null;
            this.coupon.amount = 0;
            this.coupon.active = false;
        },
        useCoupon() {
            var rts = this;
            const token = localStorage.getItem('token');
            rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/product/use-coupon',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    coupon: this.coupon.code
                }
            }).then(data => {
                if (data.data.result == 'failed') {
                    rts.$notify({
                        title: 'Амжилтгүй',
                        message: `Купон код буруу эсвэл ашиглагдсан байна`,
                        type: 'error'
                    });
                } else {
                    rts.coupon.amount = data.data.promo[0].amount;
                    rts.coupon.active = true;
                    localStorage.coupon = JSON.stringify({code: rts.coupon.code, amount: data.data.promo[0].amount});
                    rts.$notify({
                        title: 'Амжилттай',
                        dangerouslyUseHTMLString: true,
                        message: `Үнийн дүнгээс <strong>${data.data.promo[0].amount}₮</strong> хасагдлаа`,
                        type: 'success'
                    });
                }
            });
        },
        calculateShipping() {
            if(this.cart.subtotal - this.cart.sale - this.coupon.amount > 200000) {
                this.shipping.amount = 5000;
            } else {
                this.shipping.amount = parseInt(localStorage.getItem('shipping'));
                this.range.district.forEach(element => {
                    if(element.id == this.shipping.user.district) {
                        var cheap = []; var exp = [];
                        if (element.cheap_khoroo != null) {
                            cheap = element.cheap_khoroo.split(',');
                        }
                        if (element.middle_khoroo != null) {
                            exp = element.middle_khoroo.split(',');
                        }
                        if(cheap.includes(String(this.shipping.user.khoroo))) {
                            this.shipping.amount = 3000;
                        } else if(exp.includes(String(this.shipping.user.khoroo))) {
                            this.shipping.amount = 8000;
                        } else {
                            this.shipping.amount = 5000;
                        }
                    }
                });
            }
            localStorage.shipping = this.shipping.amount;
        },
        selectKhoroo() {
            // console.log(this.range.district);
            var khoroo = 0;
            this.range.district.forEach(element => {
                if(element.id == this.shipping.user.district) {
                    khoroo = element.number_of_khoroo;
                }
            });
            return khoroo;
        },
        changePersonal(value) {
            this.shipping.user.personal = value;
        },
        calculate() {
            var subtotal = 0; var sale = 0; var bonus = 0;
            this.cart.product.forEach(element => {
                subtotal = subtotal + (element.price * element.qty);
                if(element.discount > 0) {
                    sale = sale + ((element.price - (element.price * ((100 - element.discount) / 100 ))) * element.qty);
                    bonus = bonus + (((element.price * ((100 - element.discount) / 100 )) * (element.bonus / 100)) * element.qty);
                } else {
                    bonus = bonus + ((element.price * (element.bonus / 100)) * element.qty);
                }
            });
            this.cart.subtotal = subtotal;
            this.cart.bonus = bonus;
            this.cart.sale = sale;
        },
        changeQty(id) {
            localStorage.cart = JSON.stringify(this.cart.product);
            this.$emit('calcCart');
            this.calculate();
        },
        calcMaxQty(id) {
            var remain = 0;
            this.cart.real.forEach(element => {
                if(element.id == id) {
                    remain = element.remain;
                }
            });
            return remain;
        },
        submitForm() {
            const token = localStorage.getItem('token');
            var rts = this;
            rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/product/create-order',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    shipping: this.shipping
                }
            }).then(data => {
                if(data.data.result == 'success') {
                    rts.$router.push('/confirm-order');
                } else {
                    rts.$notify({
                        title: 'Амжилтгүй',
                        message: `Уучлаарай. Бүртгэлтэй имэйл хаяг байна.`,
                        type: 'error'
                    });
                }
            })
        },
        getProduct() {
            this.shipping.w3w = localStorage.getItem('w3w');
            var coupon = JSON.parse(localStorage.getItem('coupon'));
            if(coupon != null) {
                this.coupon.code = coupon.code;
                this.coupon.amount = parseInt(coupon.amount);
            }
            var reg = localStorage.getItem('reg');
            if(reg != null) {
                shipping.user.register = reg;
            }
            var id = [];
            let cart = JSON.parse(localStorage.getItem('cart'));
            if(cart == null || cart.length == 0) {
                this.$router.push('/error-page');
            }
            this.cart.product = cart;
            this.calculate();
            
            const token = localStorage.getItem('token');
            var rts = this;
            rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/product/cart-shipping',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    coupon: this.coupon.code
                }
            }).then(function(data) {
                rts.shipping.user.name = data.data.address[0].name;
                rts.shipping.user.phone = data.data.address[0].phone;
                rts.shipping.user.phone2 = data.data.address[0].phone2;
                rts.shipping.user.email = data.data.address[0].email;
                rts.shipping.user.bonus = data.data.address[0].bonus;
                if(data.data.address[0].district != 0 &&  data.data.address[0].district != null) {
                    rts.shipping.user.district = data.data.address[0].district;
                    
                    if(data.data.address[0].khoroo == null || data.data.address[0].khoroo == 0) {
                        rts.shipping.user.khoroo = 1;
                    } else {
                        rts.shipping.user.khoroo = data.data.address[0].khoroo;
                    }
                    rts.shipping.user.more = data.data.address[0].more_address;
                } else {
                    rts.shipping.user.district = data.data.districts[0].id;
                }
                rts.range.district = data.data.districts;
                if(data.data.coupon == null) {
                    rts.coupon.code = null;
                    rts.coupon.amount = 0;
                } else {
                    rts.coupon.active = true;
                    rts.coupon.amount = data.data.coupon[0].amount;
                    localStorage.coupon = JSON.stringify({code: rts.coupon.code, amount: data.data.coupon[0].amount});
                }
                rts.calculateShipping();
                rts.calculateBonusLimit();
            }).catch(error => {
                console.log(error);
            })
        }
    }
}
</script>