<style scoped>
.search {
    width: 30%;
}
@media only screen and (max-width: 600px) {
  .search {
    width: 100%;
  }
}

.printOnly {
   display : none;
}

@media print {
    .printOnly {
       display : block;
    }
}
</style>
<template>
    <div>

        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Хүлээгдэж байгаа"
                                type="gradient-orange"
                                :sub-title="String(Number(selectCount('pending')).toLocaleString())"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0"
                    >

                        <!-- <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 12.18%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template> -->
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Төлбөр төлөгдсөн"
                                type="gradient-red"
                                :sub-title="String(Number(selectCount('paid')).toLocaleString())"
                                icon="ni ni-active-40"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Хүргэлтэнд гарсан"
                                type="gradient-green"
                                :sub-title="String(Number(selectCount('shipping')).toLocaleString())"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0"
                    >

                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Хүргэгдсэн"
                                type="gradient-info"
                                :sub-title="String(Number(selectCount('delivered')).toLocaleString())"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow border-0 p-5">
                        <div align="right">
                            <form @submit.prevent="searchOrder">
                                <base-button type="warning" @click="modals.address = true">Хүргэлтийн хаяг хэвлэх</base-button>
                                <el-input placeholder="Захиалгын дугаараа оруулна уу" v-model="search" clearable class="search"> </el-input>
                            </form>
                        </div>
                        <tabs>
                        <tab-pane title="Төлөгдсөн">
                            <div v-if="selectOrder('paid').length <= 0" align="center" class="p-5">
                                Төлбөр төлөгдсөн захиалга алга байна
                            </div>
                            <div v-else class="table-responsive">
                                <base-table class="table align-items-center table-flush thead-light"
                                            tbody-classes="list"
                                            :data="selectOrder('paid')">
                                <template slot="columns">
                                    <th :style="{'background': '#F6F9FC'}">Огноо</th>
                                    <th :style="{'background': '#F6F9FC'}">Захиалгын дугаар</th>
                                    <th :style="{'background': '#F6F9FC'}">Нийт дүн</th>
                                    <th :style="{'background': '#F6F9FC'}"></th>
                                </template>
                                <template slot-scope="{row}">
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{new Date(row.created_at).toISOString().replace(/T/, ' ').replace(/\..+/, '')}}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">#{{row.ordernumber}}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{Number(row.total_amount).toLocaleString()}}₮</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td align="right">
                                        <base-button type="primary" @click="showOrder(row.ordernumber)" size="sm"><span class="ni ni-delivery-fast"></span></base-button>
                                    </td>
                                </template>
                                </base-table>
                            </div>
                        </tab-pane>
                        <tab-pane title="Хүлээгдэж байгаа">
                            <div v-if="selectOrder('pending').length <= 0" align="center" class="p-5">
                                Хүлээгдэж байгаа захиалга алга байна
                            </div>
                            <div v-else class="table-responsive">
                                <base-table class="table align-items-center table-flush thead-light"
                                            tbody-classes="list"
                                            :data="selectOrder('pending')">
                                <template slot="columns">
                                    <th :style="{'background': '#F6F9FC'}">Огноо</th>
                                    <th :style="{'background': '#F6F9FC'}">Захиалгын дугаар</th>
                                    <th :style="{'background': '#F6F9FC'}">Нийт дүн</th>
                                    <th :style="{'background': '#F6F9FC'}"></th>
                                </template>
                                <template slot-scope="{row}">
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{new Date(row.created_at).toISOString().replace(/T/, ' ').replace(/\..+/, '')}}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">#{{row.ordernumber}}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{Number(row.total_amount).toLocaleString()}}₮</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td align="right">
                                        <base-button type="primary" @click="showOrder(row.ordernumber)" size="sm"><span class="ni ni-delivery-fast"></span></base-button>
                                    </td>
                                </template>
                                </base-table>
                            </div>
                        </tab-pane>
                        <tab-pane title="Хүргэлтэнд гарсан">
                            <div v-if="selectOrder('shipping').length <= 0" align="center" class="p-5">
                                Хүргэлтэнд гарсан захиалга алга байна
                            </div>
                            <div v-else class="table-responsive">
                                <base-table class="table align-items-center table-flush thead-light"
                                            tbody-classes="list"
                                            :data="selectOrder('shipping')">
                                <template slot="columns">
                                    <th :style="{'background': '#F6F9FC'}">Огноо</th>
                                    <th :style="{'background': '#F6F9FC'}">Захиалгын дугаар</th>
                                    <th :style="{'background': '#F6F9FC'}">Нийт дүн</th>
                                    <th :style="{'background': '#F6F9FC'}"></th>
                                </template>
                                <template slot-scope="{row}">
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{new Date(row.created_at).toISOString().replace(/T/, ' ').replace(/\..+/, '')}}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">#{{row.ordernumber}}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{Number(row.total_amount).toLocaleString()}}₮</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td align="right">
                                        <base-button type="primary" @click="showOrder(row.ordernumber)" size="sm"><span class="ni ni-delivery-fast"></span></base-button>
                                    </td>
                                </template>
                                </base-table>
                            </div>
                        </tab-pane>
                        <tab-pane title="Хүргэгдсэн">
                            <div v-if="delivered.list.length <= 0" align="center" class="p-5">
                                Хүргэгдсэн захиалга алга байна
                            </div>
                            <div v-else class="table-responsive">
                                <base-table class="table align-items-center table-flush thead-light"
                                            tbody-classes="list"
                                            :data="delivered.list.slice((delivered.page - 1) * 10, delivered.page * 10)">
                                <template slot="columns">
                                    <th :style="{'background': '#F6F9FC'}">Огноо</th>
                                    <th :style="{'background': '#F6F9FC'}">Захиалгын дугаар</th>
                                    <th :style="{'background': '#F6F9FC'}">Нийт дүн</th>
                                    <th :style="{'background': '#F6F9FC'}"></th>
                                </template>
                                <template slot-scope="{row}">
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{new Date(row.created_at).toISOString().replace(/T/, ' ').replace(/\..+/, '')}}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">#{{row.ordernumber}}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{Number(row.total_amount).toLocaleString()}}₮</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td align="right">
                                        <base-button type="primary" @click="showOrder(row.ordernumber)" size="sm"><span class="ni ni-delivery-fast"></span></base-button>
                                    </td>
                                </template>
                                </base-table>
                            </div>
                            <span v-if="delivered.list.length > 0" class="mt-3">
                                <base-pagination :page-count="delivered.pagination" class="mt-3" v-model="delivered.page"></base-pagination>
                            </span>
                        </tab-pane>
                        </tabs>
                    </div>
                </div>
            </div>
        </div>

        <modal :show.sync="modals.search">
            <h6 slot="header" class="modal-title" id="modal-title-default">Хайлтын илэрц</h6>
              <div class="row">
                <div class="col-md-12">
                    <div class="table-responsive">
                        <base-table class="table align-items-center table-flush thead-light"
                                    tbody-classes="list"
                                    :data="searchResult">
                            <template slot="columns">
                                <th :style="{'background': '#F6F9FC'}">Захиалга</th>
                                <th :style="{'background': '#F6F9FC'}">Нийт дүн</th>
                                <th :style="{'background': '#F6F9FC'}"></th>
                            </template>
                            <template slot-scope="{row}">
                                <th scope="row">
                                    <div class="media align-items-center">
                                        <div class="media-body">
                                            <span class="name mb-0 text-sm">{{new Date(row.created_at).toISOString().replace(/T/, ' ').replace(/\..+/, '')}}</span><br>
                                            <span class="name mb-0" style="color: #adb5bd;">#{{row.ordernumber}}</span>
                                        </div>
                                    </div>
                                </th>
                                <th scope="row">
                                    <div class="media align-items-center">
                                        <div class="media-body">
                                            <span class="name mb-0 text-sm">{{Number(row.total_amount).toLocaleString()}}₮</span>
                                        </div>
                                    </div>
                                </th>
                                <td align="right">
                                    <base-button type="primary" @click="showOrder(row.ordernumber)" size="sm"><span class="ni ni-delivery-fast"></span></base-button>
                                </td>
                            </template>
                        </base-table>
                    </div>
                </div>
              </div>
        </modal>

        <modal :show.sync="modals.address">
            <h6 slot="header" class="modal-title" id="modal-title-default">Хүргэлтийн хаяг оруулах</h6>
              <div class="row">
                <el-input placeholder="Захиалагчийн нэр" v-model="print.name" clearable class="search col-md-12"> </el-input>
                <el-input placeholder="Утасны дугаар" v-model="print.phone" clearable class="search col-md-12 mt-1"> </el-input>
                <el-input placeholder="Үнэ" v-model="print.price" clearable class="search col-md-12 mt-1"> </el-input>
                <el-select v-model="print.status" style="width: 100%;" class="col-md-12 mt-1">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-input placeholder="Дүүрэг" v-model="print.district" clearable class="search col-md-12 mt-1"> </el-input>
                <el-input placeholder="Хороо" clearable v-model="print.khoroo" class="search col-md-12 mt-1"> </el-input>
                <el-input
                type="textarea"
                :rows="2"
                class="col-md-12 mt-1"
                placeholder="Дэлгэрэнгүй хаяг"
                v-model="print.address">
                </el-input>
              </div>
              <template slot="footer">
                    <base-button type="warning" @click="printAddress">Хэвлэх</base-button>
                <base-button type="link" class="ml-auto" @click="modals.address = false">Гарах
                </base-button>
            </template>
        </modal>

        <div id="printMe" style="height: 80mm; width: 80mm; position: relative;" class="printOnly">
            <img src="img/brand/itlab.png" style="width: 300px; height: auto; margin-bottom: 40px; margin-top: 80px;" alt="">
            <table class="table print-table">
                <tr style="margin-top: 20px;">
                    <td style="font-size: 40px;"><strong>Төлөв:</strong> </td>
                    <td align="right" v-if="print.status == 'pending'" style="font-size: 40px;"><span style="color: red">Төлөгдөөгүй</span></td>
                    <td align="right" v-else-if="print.status == 'paid'" style="font-size: 40px; color: green;"><span style="color: green">Төлөгдсөн</span></td>
                </tr>
                <tr v-if="print.status == 'pending'" style="margin-top: 20px;">
                    <td style="font-size: 40px;" width="20%"><strong>Хаан Банк:</strong></td>
                    <td style="font-size: 40px; vertical-align: middle;" width="79%" align="right"><strong>5026451776</strong> / Амартүвшин</td>
                </tr>
                <tr style="margin-top: 20px; border-style: hidden;">
                    <td style="font-size: 40px;"><strong>Захиалагч: </strong></td>
                    <td align="right" style="font-size: 40px;">{{print.name}}</td>
                </tr>
                <tr style="margin-top: 20px; border-style: hidden;">
                    <td style="font-size: 40px;"><strong>Огноо: </strong></td>
                    <td align="right" style="font-size: 40px;">{{new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}}</td>
                </tr>
                <tr style="margin-top: 20px; border-style: hidden;">
                    <td style="font-size: 40px;"><strong>Утасны дугаар: </strong></td>
                    <td align="right" style="font-size: 40px;">{{print.phone}}</td>
                </tr>
                <tr style="margin-top: 20px; border-style: hidden;">
                    <td style="font-size: 40px;"><strong>Нийт дүн: </strong></td>
                    <td align="right" style="font-size: 40px;">{{Number(print.price).toLocaleString()}}₮</td>
                </tr>
                <tr style="margin-top: 20px; border-style: hidden;">
                    <td style="font-size: 40px;"><strong>Дүүрэг: </strong></td>
                    <td align="right" style="font-size: 40px;">{{print.district}}</td>
                </tr>
                <tr style="margin-top: 20px; border-style: hidden;">
                    <td style="font-size: 40px;"><strong>Хороо: </strong></td>
                    <td align="right" style="font-size: 40px;">{{print.khoroo}}-р хороо</td>
                </tr>
                <tr style="margin-top: 20px; border-style: hidden;">
                    <td align="right" style="font-size: 40px;" colspan="2">{{print.address}}</td>
                </tr>
                <!-- <tr v-if="print.status == 'pending'" style="margin-top: 20px; border-style: hidden;">
                    <td align="right" style="font-size: 40px;" colspan="2"><strong>Дансны мэдээлэл</strong></td>
                </tr>
                <tr v-if="print.status == 'pending'" style="margin-top: 20px; border-style: hidden;">
                    <td style="font-size: 40px;"><strong>Хүлээн авагч: </strong></td>
                    <td align="right" style="font-size: 40px;">Амартүвшин</td>
                </tr>
                <tr v-if="print.status == 'pending'" style="margin-top: 20px; border-style: hidden;">
                    <td style="font-size: 40px;"><strong>Хаан банк: </strong></td>
                    <td align="right" style="font-size: 40px;">5026451776</td>
                </tr> -->
                <!-- <tr style="margin-top: 40px; border-style: hidden;">
                    <td align="center" style="font-size: 60px;" colspan="2">www.itlab.mn | <strong>7511-7733</strong></td>
                </tr> -->
            </table>
            <div style="font-size: 60px; position: fixed; bottom: 0; left: 12%;">
                www.itlab.mn | <strong>7511-7733</strong>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
        return {
            count: [],
            orders: [],
            search: '',
            searchResult: [],
            modals: {
                search: false,
                address: false
            },
            options: [{
                value: 'pending',
                label: 'Төлөгдөөгүй'
            },
            {
                value: 'paid',
                label: 'Төлөгдсөн' 
            }],
            print: {
                phone: '',
                price: 0,
                status: 'pending',
                name: '',
                district: '',
                khoroo: '',
                address: ''
            },
            delivered: {
                pagination: 0,
                page: 1,
                list: []
            }
        }
    },
    mounted() {
      this.getOrders();
    },
    methods: {
        printAddress() {
            this.$htmlToPaper('printMe');
        },
        showOrder(ordernumber) {
            this.$router.push({ name: 'Захиалгын дэлгэрэнгүй', params: {id: ordernumber}})
        },
        searchOrder() {
            this.searchResult = [];
            if(this.search != '') {
                var rts = this;
                    var token = localStorage.getItem('token');
                    rts.$axios({
                    method: 'POST',
                    url: rts.$appUrl + '/api/admin/search-order',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    data: {
                        ordernumber: this.search
                    }
                }).then(data => {
                    if (data.data.result == 'failed') {
                        rts.$notify({
                            title: 'Амжилтгүй',
                            message: 'Захиалга олдсонгүй',
                            type: 'warning'
                        });
                    } else {
                        rts.searchResult = data.data.order;
                        rts.modals.search = true;
                    }
                });
            }
        },
        selectOrder(status) {
            var val = [];
            this.orders.forEach(el => {
                if(el.status == status) {
                    val.push(el)
                }
            });
            return val;
        },
        selectCount(st) {
            var val = 0;
            this.count.forEach(el => {
                if(el.status == st) {
                    val =  el.count;
                }
            });
            return val;
        },
        getOrders() {
            var rts = this;
            var token = localStorage.getItem('token');
            rts.$axios({
              method: 'POST',
              url: rts.$appUrl + '/api/admin/orders',
              headers: {
                  "Authorization": `Bearer ${token}`
              }
          }).then(data => {
              rts.count = data.data.count;
              rts.orders = data.data.orders;
              data.data.orders.forEach(el => {
                  if(el.status == 'delivered') {
                      rts.delivered.list.push(el);
                  }
              });

            let sc = data.data.orders.length % 10;
            let f = parseInt(data.data.orders.length / 10);
            if(sc > 0) {
                f += 1;
            }
            rts.delivered.pagination = f;
          });
        }
    }
  }
</script>
<style>
</style>
