<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 100%;
  /* height: 120px; */
  border-radius: 10px;
}

.card-flex {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 100%;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
}

.card-active {
    border: 1px solid #e3fd38;
    background:#e3fd38;
    /* background: transparent; */
}

.card-flex:hover {
  box-shadow: 0 8px 16px 0 #e3fd38;
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
                        <el-steps :active="3">
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
                    <h5 class="ml-1">Төлбөр төлөх боломжууд</h5>
                </div>
                    <div class="row">
                        <div class="mb-2 cart-table col-md-8">
                            <div class="row">
                                <div class="col-md-12 p-1">
                                    <div class="card-flex p-5" v-bind:class="{'card-active': payment == 'qpay'}" @click="changePayment('qpay')">
                                        <img src="@/assets/images/logo/qpay.png" class="mr-3" :style="{'width': '50px', 'height': '50px'}"/>
                                        <span><strong>QPAY ЭСВЭЛ ДАНСАНД ШИЛЖҮҮЛЭХ</strong> <br> <span class="mt-1" style="line-height: 100%; display: block;">Интернет банкны QR код ашиглан төлбөр төлөх эсвэл төлбөрийг дансанд шилжүүлэх</span></span>
                                    </div>
                                </div>
                                <div class="col-md-12 p-1 mt-2">
                                    <div class="card-flex p-5" v-bind:class="{'card-active': payment == 'mongolchat'}" @click="changePayment('mongolchat')">
                                        <img src="@/assets/images/logo/mongolchat.png" class="mr-3" :style="{'width': '50px', 'height': '50px'}"/>
                                        <span><strong>Mongol Chat</strong> <br> <span class="mt-1" style="line-height: 100%; display: block;">Mongol Chat аппликэйшныг ашиглан төлбөр төлөх</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-8 cart-total col-md-4" align="center">
                            <div class="row card p-5 mb-3">
                                <div class="border-bottom border-color-1 mb-3" align="right">
                                    <h3 class="d-inline-block mb-0 pb-2 font-size-26">Бүтээгдэхүүн</h3>
                                </div>
                                <table class="table mb-3 mb-md-0">
                                    <tbody>
                                        <tr v-for="(item, index) in cart.product" :key="index" class="cart-subtotal">
                                            <th>{{item.name}}</th>
                                            <td data-title="Subtotal"><span class="amount">{{item.qty}} X ₮{{Number(item.price).toLocaleString()}}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
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
                                                <td data-title="Ашиглах бонус"><el-input-number style="width: 120px" class="amount" @change="changeBonus" :min="0" size="mini" :max="this.cart.bonusLimit" v-model="cart.useBonus"></el-input-number></td>
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
                                                <!-- <TagIcon :style="{'width': '20px', 'height': '20px', 'margin-top': '-3px', 'margin-right': '5px'}" /> Купон код ашиглах -->
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
                                            <TagIcon :style="{'width': '20px', 'height': '20px', 'margin-right': '5px'}"/> {{coupon.code}}
                                        </template>
                                    </el-alert>
                                </div>
                            </div>
                            <div class="row pl-1 pr-1">
                                <div class="col-md-12" align="center">
                                    <button type="button" @click="submitForm" class="btn btn-primary-dark-w mt-3" style="width: 100%; border-radius: 12px;">Баталгаажуулах</button>
                                    <button type="button" @click="backRoute" class="btn btn-outline-primary mt-1" style="width: 100%; border-radius: 12px;">Хаяг шинэчлэх</button>
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
const api = require("@what3words/api");
api.setOptions({ key: "E5XS8ZV3" });
export default {
    components: {
        Brands
    },
    data() {
        return {
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
                amount: 0
            },
            range: {
                district: [],
            },
            coupon: {
                code: null,
                active: false,
                amount: 0
            },
            payment: ''
        }
    },
    mounted() {
        this.$emit('getJquery');
        this.getProduct();
    },
    methods: {
        backRoute() {
            this.$router.push('/shipping');
        },
        changeBonus() {
            localStorage.bonus = this.cart.useBonus;
        },
        calculateBonusLimit() {
            var l = localStorage.getItem('bonusLimit');
            if(l != null) {
                this.cart.bonusLimit = parseInt(l);
            }
            var b = localStorage.getItem('bonus');
            if(b != null) {
                this.cart.useBonus = parseInt(b);
            }
        },
        changePayment(pay) {
            this.payment = pay;
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
                    if(element.district == this.shipping.user.district) {
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
        submitForm() {
            if(this.payment == '') {
                this.$notify({
                    title: 'Амжилтгүй',
                    message: `Төлбөрийн нөхцөлөө сонгоно уу`,
                    type: 'error'
                });
            } else {
                this.fullscreenLoading = true;
                const token = localStorage.getItem('token');
                var rts = this;
                rts.$axios({
                    method: 'POST',
                    url: rts.$appUrl + '/api/purchase/submit-order',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    data: {
                        cart: this.cart,
                        shipping: this.shipping,
                        coupon: this.coupon,
                        payment: this.payment
                    }
                }).then(data => {
                    rts.fullscreenLoading = false;
                    if(data.data.result == 'failed') {
                        rts.$notify({
                            title: 'Амжилтгүй',
                            message: data.data.data,
                            type: 'error'
                        });
                    } else {
                        localStorage.removeItem('bonusLimit');
                        localStorage.removeItem('shipping');
                        localStorage.removeItem('coupon');
                        localStorage.removeItem('cart');
                        localStorage.removeItem('bonus');
                        rts.$emit('calcCart');
                        rts.$router.push({name: 'show-order', params: {invoiceId: data.data.invoiceId}});
                    }
                }).catch(err => {
                    rts.fullscreenLoading = false;
                    console.log(err);
                });
            }
        },
        getProduct() {
            this.fullscreenLoading = true;
            var coupon = JSON.parse(localStorage.getItem('coupon'));
            if(coupon != null) {
                this.coupon.active = true;
                this.coupon.code = coupon.code;
                this.coupon.amount = coupon.amount;
            }
            var reg = localStorage.getItem('reg');
            if(reg != null) {
                shipping.user.register = reg;
            }
            let cart = JSON.parse(localStorage.getItem('cart'));
            if(cart == null || cart.length == 0) {
                this.$router.push('/error-page');
            }
            var id = [];
            cart.forEach(element => {
                id.push(element.id);
            });
            var rts = this;
            rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/product/cart-product',
                headers: {},
                data: {
                    products: id
                }
            }).then(function(data) {
                rts.fullscreenLoading = false;
                rts.cart.real = data.data.product;
                data.data.product.forEach(element => {
                    cart.forEach(c => {
                        if(c.id == element.id) {
                            c.discount = element.discount;
                            c.bonus = element.bonus_percent;
                            if(c.qty > element.remain) {
                                c.qty = element.remain;
                            }
                        }
                    });
                });
                rts.cart.product = cart;
                rts.calculate();
            }).catch(error => {
                rts.fullscreenLoading = false;
                console.log(error);
            })
            this.calculateShipping();
            this.calculateBonusLimit();
        }
    }
}
</script>