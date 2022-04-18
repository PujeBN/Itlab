<style scoped>
.steps {
    border: 1px solid #e7e7e7
}

.steps-header {
    padding: .375rem;
    border-bottom: 1px solid #e7e7e7
}

.steps-header .progress {
    height: .25rem
}

.steps-body {
    display: table;
    table-layout: fixed;
    width: 100%
}

.step {
    display: table-cell;
    position: relative;
    padding: 1rem .75rem;
    -webkit-transition: all 0.25s ease-in-out;
    transition: all 0.25s ease-in-out;
    border-right: 1px dashed #dfdfdf;
    color: rgba(0, 0, 0, 0.65);
    font-weight: 600;
    text-align: center;
    text-decoration: none
}

.step:last-child {
    border-right: 0
}

.step-indicator {
    display: block;
    position: absolute;
    top: .75rem;
    left: .75rem;
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid #e7e7e7;
    border-radius: 50%;
    background-color: #fff;
    font-size: .875rem;
    line-height: 1.375rem
}

.has-indicator {
    padding-right: 1.5rem;
    padding-left: 2.375rem
}

.has-indicator .step-indicator {
    top: 50%;
    margin-top: -.75rem
}

.step-icon {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 auto;
    margin-bottom: .75rem;
    -webkit-transition: all 0.25s ease-in-out;
    transition: all 0.25s ease-in-out;
    color: #888
}

.step:hover {
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none
}

.step:hover .step-indicator {
    -webkit-transition: all 0.25s ease-in-out;
    transition: all 0.25s ease-in-out;
    border-color: transparent;
    background-color: #f4f4f4
}

.step:hover .step-icon {
    color: rgba(0, 0, 0, 0.9)
}

.step-active,
.step-active:hover {
    color: rgba(0, 0, 0, 0.9);
    pointer-events: none;
    cursor: default
}

.step-active .step-indicator,
.step-active:hover .step-indicator {
    border-color: transparent;
    background-color: #5c77fc;
    color: #fff
}

.step-active .step-icon,
.step-active:hover .step-icon {
    color: #5c77fc
}

.step-completed .step-indicator,
.step-completed:hover .step-indicator {
    border-color: transparent;
    background-color: rgba(51, 203, 129, 0.12);
    color: #33cb81;
    line-height: 1.25rem
}

.step-completed .step-indicator .feather,
.step-completed:hover .step-indicator .feather {
    width: .875rem;
    height: .875rem
}

.btn-show-order {
    width: 20%;
}

@media (max-width: 575.98px) {
    .btn-show-order {
        width: 100%;
    }
    .steps-header {
        display: none
    }
    .steps-body,
    .step {
        display: block
    }
    .step {
        border-right: 0;
        border-bottom: 1px dashed #e7e7e7
    }
    .step:last-child {
        border-bottom: 0
    }
    .has-indicator {
        padding: 1rem .75rem
    }
    .has-indicator .step-indicator {
        display: inline-block;
        position: static;
        margin: 0;
        margin-right: 0.75rem
    }
}

.bg-secondary {
    background-color: #f7f7f7 !important;
}

.d-none-width {
    width: 300px; 
    max-width: 250px; 
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.d-none-price {
    width: 190px;
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
            <div class="container">
                <div class="my-md-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-3 flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble">
                            <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1"><router-link to="/home">Нүүр хуудас</router-link></li>
                            <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1"><a href="javascript:;">Захиалга хянах</a></li>
                        </ol>
                    </nav>
                </div>
                <div class="row mt-5">
                    <div class="col-md-2"></div>
                    <div class="col-md-8" align="center" :style="{'font-size': '18px'}">
                        <span>Захиалгын дугаараа оруулснаар таны захиалга аль шатандаа явж байгааг харах боломжтой!</span>
                    </div>
                    <div class="col-md-2"></div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-6 mt-5">
                        <label class="form-label" for="orderid">Захиалгын дугаар</label>
                        <!-- <input type="text" class="form-control" name="text" id="orderid" placeholder="Жишээ нь: PI1590056 ..." aria-label="Found in your order confirmation email."> -->
                        <el-input placeholder="Жишээ нь: PI1590056 ..." v-model="searchInput">
                            <el-button @click="submit" slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                </div>
            </div>
            <div class="container pb-5 mb-sm-4 mt-5">
                <!-- Details-->
                <div class="row mb-3">
                    <div class="col-sm-4 mb-2">
                        <div class="bg-secondary p-4 text-dark text-center"><span class="font-weight-semibold mr-2"><strong>Огноо</strong>:</span><span v-if="order.created_at != ''">{{new Date(order.created_at).toISOString().replace(/T/, ' ').replace(/\..+/, '')}}</span></div>
                    </div>
                    <div class="col-sm-4 mb-2">
                        <div class="bg-secondary p-4 text-dark text-center"><span class="font-weight-semibold mr-2"><strong>Захиалгын дугаар</strong>:</span>{{order.invoiceId}}</div>
                    </div>
                    <div class="col-sm-4 mb-2">
                        <div class="bg-secondary p-4 text-dark text-center"><span class="font-weight-semibold mr-2"><strong>Төлөв</strong>:</span><span>{{order.status}}</span></div>
                    </div>
                </div>
                <!-- Progress-->
                <div class="steps">
                    <div class="steps-header">
                        <div class="">
                            <!-- <div class="progress-bar" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div> -->
                            <el-progress :percentage="progress" :color="'#409eff'" :show-text="false" :stroke-width="4"></el-progress>
                        </div>
                    </div>
                    <div class="steps-body">
                        <div class="step" v-bind:class="{'step-completed': step >= 1}">
                            <span class="step-indicator" v-if="step >= 1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </span>
                            <span class="step-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                                </svg>
                            </span>
                            Захиалага
                        </div>
                        <div class="step" v-bind:class="{'step-completed': step >= 2, 'step-active': step == 1}">
                            <span class="step-indicator" v-if="step >= 2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </span>
                            <span class="step-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                            </span>
                            Төлбөр төлөлт
                        </div>
                        <div class="step" v-bind:class="{'step-completed': step >= 3, 'step-active': step == 2}">
                            <span class="step-indicator" v-if="step >= 3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </span>
                            <span class="step-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                </svg>
                            </span>
                            Бэлдэх үйл явц
                        </div>
                        <div class="step" v-bind:class="{'step-completed': step == 4, 'step-active': step == 3}">
                            <span class="step-indicator" v-if="step == 4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </span>
                            <span class="step-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-truck"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>
                                </svg>
                            </span>
                            Хүргэлтэнд гарсан
                        </div>
                        <div class="step" v-bind:class="{'step-completed': step == 4}">
                            <span class="step-indicator" v-if="step == 4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </span>
                            <span class="step-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                            </span>
                            Захиалга хүргэгдсэн
                        </div>
                    </div>
                </div>
                <!-- Footer-->
                <div v-if="data == true" class="d-sm-flex flex-wrap justify-content-between align-items-center text-center mt-1">
                    <div class="custom-control custom-checkbox mr-3">                        
                    </div><a class="btn btn-sm btn-outline-primary btn-show-order" @click="showProducts" style="border-radius: 12px;" href="javascript:;">Бүтээгдэхүүн харах</a>
                </div>
            </div>
        </main>
        <Brands />
        <el-dialog title="Бүтээгдэхүүн" :visible.sync="dialogTableVisible" :modalAppendToBody="false">
            <table class="table" cellspacing="0">
                <tbody>
                    <div v-for="(item, index) in order.product" :key="index" class="mb-1" vAlign="middle">
                        <tr class="mobile-product">
                            <td class="d-none d-md-table-cell pr-5">
                                <router-link :to="'/single-product/'+item.id"><img class="img-fluid max-width-60 p-1" :src="$appUrl+'/images/product/'+item.image" :alt="item.name"></router-link>
                            </td>
                            <td data-title="Бүтээгдэхүүн" class="d-none-width pl-5">
                                <router-link :to="'/single-product/'+item.id" class="text-gray-90">{{item.name}}<br><strong>{{item.model}}</strong> #{{item.color_name}}</router-link>
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
        </el-dialog>
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
            dialogTableVisible: false,
            fullscreenLoading: false,
            data: false,
            step: 0,
            progress: 0,
            searchInput: '',
            order: {
                invoiceId: '',
                created_at: '',
                status: '',
                product: []
            }
        }
    },
    mounted() {
        this.$emit('getJquery');
    },
    methods: {
        showProducts() {
            this.dialogTableVisible = true;
        },
        submit() {
            if(this.searchInput != '') {
                this.progress = 0;
                this.step = 0;
                this.data = false;
                this.order.invoiceId = '';
                this.order.created_at = '';
                this.order.status = '';
                this.order.product = [];
                const token = localStorage.getItem('token');
                if(!token) {
                    this.$notify({
                        title: 'Амжилтгүй',
                        message: `Нэвтэрсэн байх шаардлагатай`,
                        type: 'error'
                    });
                    this.$router.push('/login');
                } else {
                    var rts = this;
                    rts.$axios({
                        method: 'POST',
                        url: rts.$appUrl + '/api/product/show-order',
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        data: {
                            ordernumber: this.searchInput
                        }
                    }).then(data => {
                        if(data.data.result == 'failed') {
                            rts.$notify({
                                title: 'Амжилтгүй',
                                message: `Таны захиалгын дугаар буруу байна`,
                                type: 'error'
                            });
                        } else {
                          rts.order.product = data.data.product;
                          rts.order.invoiceId = data.data.order[0].ordernumber;
                          rts.order.created_at = data.data.order[0].created_at;
                          if(data.data.order[0].status == 'pending') {
                              rts.order.status = 'Төлбөр хүлээгдэж байгаа';
                              rts.step = 1;
                          } else if(data.data.order[0].status == 'paid') {
                                rts.order.status = 'Төлбөр төлөгдсөн';
                                rts.step = 2;
                          } else if(data.data.order[0].status == 'shipping') { 
                              rts.order.status = 'Хүргэлтэнд гарсан';
                              rts.step = 3;
                          } else if(data.data.order[0].status == 'delivered') { 
                              rts.order.status = 'Хүргэгдсэн';
                              rts.step = 4;
                          } else if(data.data.order[0].status == 'expired') {
                              rts.order.status = 'Цуцлагдсан';
                              rts.step = 1;
                          }
                          if(rts.step > 3) {
                              rts.progress = rts.step * 20 + 20;
                          } else {
                              rts.progress = rts.step * 20;
                          }
                          rts.data = true;
                        }
                    }).catch(err => {
                        rts.$router.push('/error-page');
                    });
                }
            }
        }
    }
}
</script>