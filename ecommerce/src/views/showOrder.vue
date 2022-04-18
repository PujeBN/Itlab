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
    width: 120px;
}
.bottom-title-left {
    text-align: left;
}
.bottom-title-right {
    text-align: right;
}

.right-side-info {
    text-align: right;
}

.left-side-info {
    text-align: left;
}


@media only screen and (max-width: 600px) {
  .d-none-link {
    max-width: 50%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .card-phone {
      width: 80%;
  }
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
  .bottom-title-left {
      text-align: right;
  }
  .bottom-title-right {
      text-align: right;
  }
  .right-side-info {
    text-align: center;
  }

  .left-side-info {
    text-align: center;
  }
}
</style>
<template>
    <div>
        <main id="content" role="main" class="cart-page" v-loading.fullscreen.lock="fullscreenLoading">
            <div class="container mt-5">
                <div class="mb-4" align="left">
                    <h5 class="ml-1">Захиалгын хуудас</h5>
                </div>
                <div class="row">
                    <div class="mb-2 cart-table col-md-8 card" style="overflow: auto;">
                        <div class="p-3" align="center">
                            <div class="mt-2"><strong>ЗАХИАЛГЫН ДУГААР</strong> <br><span :style="{'font-weight': '700', 'font-size': '20px', 'display': 'block', 'margin-top': '-5px'}" class="text-sale">{{order.invoiceId}}</span></div>
                            <div>
                                <table class="table" cellspacing="0">
                                    <tbody>
                                        <div v-for="(item, index) in product" :key="index" class="mb-1 card-phone" vAlign="middle">
                                            <tr class="mobile-product" :style="{'padding-bottom': '18px', 'position': 'relative'}">
                                                <td class="d-none d-md-table-cell pr-5">
                                                    <router-link :to="'/single-product/'+item.id"><img class="img-fluid max-width-60 p-1" :src="$appUrl+'/images/product/'+item.image" :alt="item.name"></router-link>
                                                </td>

                                                <td data-title="Бүтээгдэхүүн" class="d-none-width">
                                                    <router-link :to="'/single-product/'+item.id" class="text-gray-90 d-none-link">{{item.name}}<br><strong>{{item.model}}</strong> #{{item.color_name}}</router-link>
                                                </td>

                                                <td data-title="Үнэ" class="d-none-price">
                                                    <div>
                                                        <span class="">₮{{Number(item.amount).toLocaleString()}}</span>
                                                    </div>
                                                </td>

                                                <td data-title="Тоо ширхэг" class="d-none-price" align="center">
                                                    <span>x {{item.quantity}}</span>
                                                </td>

                                                <td data-title="Нийт" class="d-none-price" align="right">
                                                    <span class="">₮{{Number(item.amount * item.quantity).toLocaleString()}}</span>
                                                </td>
                                            </tr>
                                        </div>
                                    </tbody>
                                </table>
                            </div>
                            <div class="mt-5 row">
                                <div class="col-md-1"></div>
                                <div class="col-md-5 bottom-title-left p-3 pl-5 pr-5" :style="{'border-radius': '10px', 'color': '#77838f'}">
                                    <span :style="{'font-size': '15px'}">Үүсгэсэн огноо</span><br>
                                    <span v-if="load == true" :style="{'font-weight': '700', 'font-size': '17px'}">{{new Date(order.info.created_at).toISOString().replace(/T/, ' ').replace(/\..+/, '')}}</span>
                                </div>
                                <div class="col-md-5 bottom-title-right p-3 pr-5" :style="{'border-radius': '10px', 'color': '#77838f'}">
                                    <span :style="{'font-size': '15px'}">Захиалгын төлөв</span><br>
                                    <span v-if="order.info.status == 'pending'" :style="{'font-weight': '700', 'font-size': '17px', 'color': '#de4437'}">Төлбөр хүлээгдэж байгаа</span>
                                    <span v-else-if="order.info.status == 'shipping'" :style="{'font-weight': '700', 'font-size': '17px', 'color': '#ffc107'}">Хүргэлтэнд гарсан</span>
                                    <span v-else-if="order.info.status == 'delivered'" :style="{'font-weight': '700', 'font-size': '17px', 'color': '#77838f'}">Захиалга хүргэгдсэн</span>
                                    <span v-else-if="order.info.status == 'paid'" :style="{'font-weight': '700', 'font-size': '17px', 'color': '#00c9a7'}">Төлбөр төлөгдсөн</span>
                                    <span v-else-if="order.info.status == 'expired'" :style="{'font-weight': '700', 'font-size': '17px', 'color': '#de4437'}">Цуцлагдсан</span>
                                </div>
                                <div class="col-md-1"></div>
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
                                                <th>Нэмэгдсэн бонус</th>
                                                <td data-title="Нэмэгдэх бонус"><span class="amount">₮{{Number(order.info.add_bonus).toLocaleString()}}</span></td>
                                            </tr>
                                            <tr class="cart-subtotal">
                                                <th>Ашигласан бонус</th>
                                                <td data-title="Нэмэгдэх бонус"><span class="amount">₮{{Number(order.info.used_bonus).toLocaleString()}}</span></td>
                                            </tr>
                                            <tr class="cart-subtotal">
                                                <th>Хүргэлт</th>
                                                <td data-title="Нэмэгдэх бонус"><span class="amount">₮{{Number(order.info.tax).toLocaleString()}}</span></td>
                                            </tr>
                                            <tr class="cart-subtotal">
                                                <th>Хөнгөлөлт</th>
                                                <td data-title="Нэмэгдэх бонус"><span class="amount">₮{{Number(coupon).toLocaleString()}}</span></td>
                                            </tr>
                                            <tr class="cart-subtotal">
                                                <th>Нэхэмжилсэн дүн</th>
                                                <td data-title="Үнэ"><span class="amount">₮{{Number(order.info.total_amount).toLocaleString()}}</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        <div class="row pl-1 pr-1">
                            <div class="col-md-12" align="center">
                                <div>
                                    <button v-if="order.info.status == 'pending'" type="button" @click="showQr" class="btn btn-primary-dark-w mt-2" style="width: 100%; border-radius: 12px;"><i class="fas fa-qrcode mr-2"></i> Төлөх</button>
                                </div>
                                <div>
                                    <button v-if="order.info.status == 'pending'" type="button" class="btn btn-danger mt-1" style="width: 100%; border-radius: 12px;"><i class="fas fa-trash-alt mr-2"></i> Захиалга цуцлах</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div align="center" class="mt-5 text-sale" :style="{'font-size': '15px'}">
                    Төлбөр төлөгдсөн захиалга <strong>ажлын 24 цагийн</strong> дотор хүргэгдэнэ.
                </div>
            </div>
        </main>
        <Brands />
        <el-dialog title="" :visible.sync="dialogTableVisible" :modalAppendToBody="false" :center="true">
            <div class="p-2 text-center">
                
                <div class="mt-1" :style="{'font-size': '15px'}">Та төлбөрөө доорх QR кодыг уншуулж төлнө үү!</div>
                <div class="grid grid-cols-12" align="center">
                    <qrcode-vue :value="order.info.QRCode" :size="100" level="H" style="margin-top: 20px; margin-bottom: 20px; max-width: 100%;"></qrcode-vue>
                </div>
                <div>
                <div v-if="this.order.info.payment == 'qpay'" align="center" :style="{'font-size': '18px'}">Шилжүүлгийн мэдээлэл</div>
                <div align="center" v-if="this.order.info.payment == 'qpay'">
                    <div class="row">
                        <div class="col-md-6 right-side-info">
                            <span>ГҮЙЛГЭЭНИЙ УТГА: </span>
                        </div>
                        <div class="col-md-6 left-side-info">
                            <span :style="{'font-weight': '700'}">{{order.invoiceId}}</span>
                        </div>
                    </div>
                    <div class="row"> 
                        <div class="col-md-6 right-side-info">
                            <span>ГОЛОМТ БАНК: </span>
                        </div>
                        <div class="col-md-6 left-side-info">
                            <span :style="{'font-weight': '700'}">1410002791</span>
                        </div>
                    </div>
                    <div class="row"> 
                        <div class="col-md-6 right-side-info">
                            <span>ХҮЛЭЭН АВАГЧ: </span>
                        </div>
                        <div class="col-md-6 left-side-info">
                            <span :style="{'font-weight': '700'}">АЙ СИ БИ СИ ХХК</span>
                        </div>
                    </div>
                    <div class="mt-5"><span :style="{'font-weight': '700'}">АНХААРУУЛГА</span> Төлбөрийг дансанд шилжүүлсэн тохиолдолд <span :style="{'font-weight': '700'}"> 30-60 минутанд</span> шалгагдаж баталгаажсаны дараа <br> <strong>ажлын 24 цагийн</strong> дотор хүргэгдэнэ.</div>
                </div>
                <div v-if="this.order.info.payment == 'mongolchat'" class="mt-5">Хэрэглэгч та <span :style="{'font-weight': '700'}">Mongol Chat</span> аппликэйшны <br> <strong>дуран</strong> хэсэгт дээрх QR кодыг уншуулж төлбөрөө төлнө үү.</div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue';
import Brands from "@/components/brands";
let checker = null;
export default {
    components: {
        Brands,
        QrcodeVue
    },
    data() {
        return {
            dialogTableVisible: false,
            fullscreenLoading: false,
            load: false,
            order: {
                invoiceId: '',
                info: [],
                qr: 'https://example.com'
            },
            product: [],
            coupon: 0
        }
    },
    beforeRouteLeave (to, from , next) {
        clearInterval(checker);
        next();
    },
    mounted() {
        this.$emit('getJquery');
        this.order.invoiceId = this.$route.params.invoiceId; 
        this.getInfo();
    },
    methods: {
        orderChecker() {
            const token = localStorage.getItem('token');
            let rts = this;
            this.$axios({
                method: 'post',
                url: this.$appUrl +'/api/purchase/is-paid-qpay',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    invoiceId: this.order.invoiceId,
                }
            }).then(data => {
                if(data.data.result == 'success') {
                    rts.order.info.status = 'paid';
                    clearInterval(checker);
                    rts.dialogTableVisible = false;
                    rts.$notify({
                        title: 'Амжилттай',
                        message: 'Төлбөр амжилттай төлөгдлөө',
                        type: 'success',
                        duration: 0
                    });
                }
            });
        },
        showQr() {
            this.dialogTableVisible = true;
        },
        getInfo() {
            const token = localStorage.getItem('token');
            var rts = this;
            rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/product/show-order',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    ordernumber: this.order.invoiceId
                }
            }).then(data => {
                if(data.data.result == 'failed') {
                    rts.$router.push('/error-page');
                } else {
                    // console.log(data.data);
                    rts.product = data.data.product;
                    rts.order.info = data.data.order[0],
                    console.log(data.data.order[0]);
                    rts.coupon = data.data.coupon;
                    rts.load = true;
                    if(rts.order.info.status == 'pending') {
                        rts.dialogTableVisible = true;
                        checker = setInterval(rts.orderChecker, 5000);
                    }
                    
                }
            }).catch(err => {
                rts.$router.push('/error-page');
            });
        }   
    }
}
</script>