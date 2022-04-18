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
    .card-phone {
        width: 89%;
    }
  .d-none-width {
    width: auto;
    max-width: 100%;
  }
  .d-none-link {
    max-width: 50%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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
                        <el-steps :active="1">
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
                    <h5 class="ml-1">Миний сагс</h5>
                </div>
                <div class="row" v-if="cart.product.length > 0">
                    <div class="mb-2 cart-table col-md-8" style="overflow: auto;">
                        <form class="mb-4" action="javascript:;">
                            <table class="table" cellspacing="0">
                                <tbody>
                                    <div v-for="(item, index) in cart.product" :key="index" class="card card-phone mb-2" vAlign="middle">
                                        <tr class="mobile-product" :style="{'padding-bottom': '18px', 'position': 'relative'}">
                                            <!-- <td class="text-center">
                                                <a href="#" class="text-gray-32 font-size-26">×</a>
                                            </td> -->
                                            <td class="d-none d-md-table-cell pr-5">
                                                <router-link :to="'/single-product/'+item.id"><img class="img-fluid max-width-60 p-1 " :src="$appUrl+'/images/product/'+item.image" alt="Image Description"></router-link>
                                            </td>

                                            <td data-title="Бүтээгдэхүүн" class="d-none-width">
                                                <router-link :to="'/single-product/'+item.id" class="text-gray-90 d-none-link"><span>{{item.name}}<br></span><strong>{{item.model}}</strong> #{{item.color}}</router-link>
                                                <!-- <router-link :to="'/single-product/'+item.id" class="text-gray-90 d-none-link">{{item.name}}</router-link> -->
                                            </td>

                                            <td data-title="Үнэ" class="d-none-price">
                                                <div v-if="item.discount > 0">
                                                    <del class="">₮{{Number(item.price).toLocaleString()}}</del> <br>
                                                    <span class="">₮{{Number(item.price * ((100 - item.discount) / 100)).toLocaleString()}}</span>
                                                </div>
                                                <div v-else>
                                                    <span class="">₮{{Number(item.price).toLocaleString()}}</span>
                                                </div>
                                            </td>

                                            <td data-title="Тоо ширхэг" class="d-none-price">
                                                <el-input-number v-model="item.qty" :min="1" @change="changeQty(item.id)" :max="calcMaxQty(item.id)" size="small"></el-input-number>
                                            </td>

                                            <td data-title="Нийт" class="d-none-price mb-5" align="right">
                                                <span class="">₮{{Number(item.price * ((100 - item.discount) / 100) * item.qty).toLocaleString()}}</span>
                                            </td>

                                            <div class="text-center mt-10 d-flex" :style="{'position': 'absolute', 'right': '30px', 'bottom': '15px'}">
                                                <a href="javascript:;" @click="removeCart(item.id)" class="text-sale"><i class="far fa-trash-alt mr-1"></i> Устгах</a>
                                            </div>
                                            
                                        </tr>
                                    </div>
                                </tbody>
                            </table>
                        </form>
                    </div>
                    <div class="mb-8 cart-total col-md-4 col-sm-4" align="center">
                        <div class="row card p-5">
                            <div class="col-md-12">
                                <div class="border-bottom border-color-1 mb-3" align="right">
                                    <h3 class="d-inline-block  mb-0 pb-2 font-size-26">Захиалгын мэдээлэл</h3>
                                </div>
                                <table class="table mb-3 mb-md-0">
                                    <tbody>
                                        <tr class="cart-subtotal">
                                            <th>Үнэ</th>
                                            <td data-title="Subtotal"><span class="amount">₮{{Number(cart.subtotal).toLocaleString()}}</span></td>
                                        </tr>
                                        <tr class="cart-subtotal">
                                            <th>Нэмэгдэх бонус</th>
                                            <td data-title="Subtotal"><span class="amount">₮{{Number(parseInt(cart.bonus)).toLocaleString()}}</span></td>
                                        </tr>
                                        <tr class="cart-subtotal">
                                            <th>Хямдрал</th>
                                            <td data-title="Subtotal"><span class="amount">₮{{Number(parseInt(cart.sale)).toLocaleString()}}</span></td>
                                        </tr>
                                        <tr class="cart-subtotal">
                                            <th>Хүргэлт</th>
                                            <td data-title="Subtotal"><span class="amount">₮0</span></td>
                                        </tr>
                                        <tr class="order-total">
                                            <th>Нийт</th>
                                            <td data-title="Total"><strong><span class="amount">₮{{Number(parseInt(cart.subtotal - cart.sale)).toLocaleString()}}</span></strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row pl-1 pr-1">
                            <div class="col-md-12" align="center">
                                <button type="button" @click="Shpping" class="btn btn-primary-dark-w mt-5" style="width: 100%; border-radius: 12px;">Хаяг баталгаажуулах</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div align="center">
                        <img src="@/assets/images/logo/cart.png" style="width: 25%; height: auto;" class="mb-2"><br>
                        <p style="font-size: 22px; font-weight: 700;" class="mb-1">{{valuetext}}</p>
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
            valuetext: 'Түр хүлээнэ үү...',
            fullscreenLoading: false,
            cart: {
                product: [],
                real: [],
                subtotal: 0,
                sale: 0,
                bonus: 0,
            }
        }
    },
    mounted() {
        this.$emit('getJquery');
        this.getProduct();
    },
    methods: {
        Shpping() {
            const token = localStorage.getItem('token');
            if(!token) {
                this.$notify({
                    title: 'Амжилтгүй',
                    message: `Нэвтэрсэн байх шаардлагатай`,
                    type: 'error'
                });
                this.$router.push('/login');
            } else {
                this.$router.push('/shipping');
            }
        },
        removeCart(id) {
            this.$emit('removeCart', id);
            this.cart.product.forEach((element, index) => {
                if(element.id == id) {
                    this.cart.product.splice(index, 1);
                }
            });
            this.calculate();
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
        getProduct() {
            var id = [];
            let cart = JSON.parse(localStorage.getItem('cart'));
            if(cart.length <= 0) {
                this.valuetext = 'Таны сагс хоосон байна';
            }
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
                console.log(error);
            })
        }
    }
}
</script>