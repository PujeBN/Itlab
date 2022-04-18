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

        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8" />

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-md-8 mt-3">
                    <div class="card shadow border-0 p-5">
                        <div class="table-responsive">
                                <base-table class="table align-items-center table-flush thead-light"
                                            tbody-classes="list"
                                            :data="product">
                                <template slot="columns">
                                    <th :style="{'background': '#F6F9FC'}">Зураг</th>
                                    <th :style="{'background': '#F6F9FC'}">Бүтээгдэхүүн</th>
                                    <th :style="{'background': '#F6F9FC'}"> үнэ</th>
                                    <th :style="{'background': '#F6F9FC'}">Тоо ширхэг</th>
                                    <th :style="{'background': '#F6F9FC', 'text-align': 'right'}">Нийт үнэ</th>
                                </template>
                                <template slot-scope="{row}">
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <img :src="$appUrl+'/images/product/'+row.image" style="width: auto; height: 50px;">
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <!-- <span class="name mb-0 text-sm">{{new Date(row.created_at).toISOString().replace(/T/, ' ').replace(/\..+/, '')}}</span> -->
                                                <span class="name mb-0 text-sm" style="color: #8898aa;">{{row.name}}</span><br>
                                                <span class="name mb-0 text-sm">{{row.model}}</span> <span class="name mb-0 text-sm" style="color: #8898aa;">{{row.color_name}}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{Number(row.amount).toLocaleString()}}₮</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{Number(row.quantity).toLocaleString()}}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td align="right">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{Number(row.quantity * row.amount).toLocaleString()}}₮</span>
                                            </div>
                                        </div>
                                    </td>
                                </template>
                                </base-table>
                            </div>
                    </div>
                    <iframe v-if="info.w3w != 'false' && info.w3w != undefined"  class="mt-3" :src="'https://maps.google.com/maps?q=' + info.lat+ ', ' + info.lon + '&z=15&output=embed'" width="100%" height="300" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
                </div>
                <div class="col-md-4 mt-3">
                    <div class="card shadow border-0 p-4">
                        <div align="right" class="mb-2" style="font-weight: 700;">Захиалга</div>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Захиалгын дугаар</th>
                                    <td align="right">{{info.ordernumber}}</td>
                                </tr> 
                                <tr>
                                    <th>Огноо</th>
                                    <td align="right">{{new Date(info.created_at).toISOString().replace(/T/, ' ').replace(/\..+/, '')}}</td>
                                </tr> 
                                <tr>
                                    <th>Ашигласан бонус</th>
                                    <td align="right">{{Number(info.used_bonus).toLocaleString()}}₮</td>
                                </tr>  
                                <tr>
                                    <th>Нийт дүн</th>
                                    <td align="right">{{Number(info.total_amount).toLocaleString()}}₮</td>
                                </tr>  
                                <tr>
                                    <th>Төлөв</th>
                                    <td v-if="info.status == 'pending'" align="right" style="color: #5e72e4;">Хүлээгдэж байгаа</td>
                                    <td v-else-if="info.status == 'paid'" align="right" style="color: #2dce89;">Төлбөр төлөгдсөн</td>
                                    <td v-else-if="info.status == 'shipping'" align="right" style="color: #11cdef;">Хүргэлтэнд гарсан</td>
                                    <td v-else-if="info.status == 'delivered'" align="right" style="color: #fb6340;">Хүргэгдсэн</td>
                                    <td v-else-if="info.status == 'expired'" align="right" style="color: #f5365c;">Цуцлагдсан</td>
                                </tr>  
                            </tbody>
                        </table>     
                    </div>
                    <div class="card shadow border-0 p-4 mt-3">
                        <div align="right" class="mb-2" style="font-weight: 700;">Хэрэглэгчийн мэдээлэл</div>
                        <table>
                            <tbody>
                                <tr>
                                    <th></th>
                                    <td v-if="info.receiver == 'personal'" align="right">Хувь хүн</td>
                                    <td v-else align="right">Албан байгууллага</td>
                                </tr> 
                                <tr>
                                    <th>Нэр</th>
                                    <td align="right">{{info.name}}</td>
                                </tr> 
                                <tr>
                                    <th>Утасны дугаар</th>
                                    <td align="right">{{info.phone}}, {{info.phone2}}</td>
                                </tr> 
                                <tr v-if="info.receiver == 'company'">
                                    <th>Регистр</th>
                                    <td align="right">{{info.comp_id}}</td>
                                </tr>
                            </tbody>
                        </table>     
                    </div>
                    <div class="card shadow border-0 p-4 mt-3">
                        <div align="right" class="mb-2" style="font-weight: 700;">Хүргэлтийн хаяг</div>
                        <table>
                            <tbody>
                                <tr>
                                    <th>гурван.үгт.хаяг</th>
                                    <td v-if="info.w3w != 'false' && info.w3w != undefined" align="right">{{info.w3w}}</td>
                                </tr> 
                                <tr>
                                    <th>Дүүрэг</th>
                                    <td align="right">{{info.district}}</td>
                                </tr>
                                <tr>
                                    <th>Хороо</th>
                                    <td align="right">{{info.khoroo}}-р хороо</td>
                                </tr> 
                            </tbody>
                        </table>     
                        <div align="right" class="mt-2">{{info.more_address}}</div>
                    </div>
                    <base-button type="danger" icon="ni ni-tag" class="mt-3" @click="modals.changeState = true" :style="{'width': '100%'}">Төлөв өөрчлөх</base-button>
                    <base-button v-if="info.status == 'pending' || info.status == 'paid'" type="warning" icon="ni ni-collection" class="mt-2" @click="printAddress" :style="{'width': '100%'}">Хаяг хэвлэх</base-button>
                </div>
            </div>
        </div>

        <div id="printMe" style="height: 80mm; width: 80mm; position: relative;" class="printOnly">
            <img src="img/brand/itlab.png" style="width: 300px; height: auto; margin-bottom: 40px; margin-top: 100px;" alt="">
            <table class="table print-table">
                <tr style="margin-top: 20px;">
                    <td style="font-size: 40px;" width="45%"><strong>Захиалгын дугаар:</strong> </td>
                    <td align="right" style="font-size: 40px;">{{info.ordernumber}}</td>
                </tr>
                <tr style="margin-top: 20px;">
                    <td style="font-size: 40px;"><strong>Төлөв:</strong> </td>
                    <td align="right" v-if="info.status == 'pending'" style="font-size: 40px;"><span style="color: red">Төлөгдөөгүй</span></td>
                    <td align="right" v-else-if="info.status == 'paid'" style="font-size: 40px; color: green;"><span style="color: green">Төлөгдсөн</span></td>
                </tr>
                <tr v-if="info.status == 'pending'" style="margin-top: 20px;">
                    <td style="font-size: 40px;"><strong>Хаан Банк:</strong></td>
                    <td style="font-size: 40px;" width="70%" align="right"><strong>5026451776</strong> / Амартүвшин</td>
                </tr>
                <tr style="margin-top: 20px; border-style: hidden;">
                    <td style="font-size: 40px;"><strong>Захиалагч: </strong></td>
                    <td align="right" style="font-size: 40px;">{{info.name}}</td>
                </tr>
                <tr style="margin-top: 20px; border-style: hidden;">
                    <td style="font-size: 40px;"><strong>Огноо: </strong></td>
                    <td align="right" style="font-size: 40px;">{{new Date(info.created_at).toISOString().replace(/T/, ' ').replace(/\..+/, '')}}</td>
                </tr>
                <tr style="margin-top: 20px; border-style: hidden;">
                    <td style="font-size: 40px;"><strong>Утасны дугаар: </strong></td>
                    <td align="right" style="font-size: 40px;">{{info.phone}}, {{info.phone2}}</td>
                </tr>
                <tr style="margin-top: 20px; border-style: hidden;">
                    <td style="font-size: 40px;"><strong>Нийт дүн: </strong></td>
                    <td align="right" style="font-size: 40px;">{{Number(info.total_amount).toLocaleString()}}₮</td>
                </tr>
                <tr style="margin-top: 20px; border-style: hidden;">
                    <td style="font-size: 40px;"><strong>Дүүрэг: </strong></td>
                    <td align="right" style="font-size: 40px;">{{info.district}}</td>
                </tr>
                <tr style="margin-top: 20px; border-style: hidden;">
                    <td style="font-size: 40px;"><strong>Хороо: </strong></td>
                    <td align="right" style="font-size: 40px;">{{info.khoroo}}-р хороо</td>
                </tr>
                <tr style="margin-top: 20px; border-style: hidden;">
                    <td align="right" style="font-size: 40px;" colspan="2">{{info.more_address}}</td>
                </tr>
                <!-- <tr v-if="info.status == 'pending'" style="margin-top: 20px; border-style: hidden;">
                    <td align="right" style="font-size: 40px;" colspan="2"><strong>Дансны мэдээлэл</strong></td>
                </tr>
                <tr v-if="info.status == 'pending'" style="margin-top: 20px; border-style: hidden;">
                    <td style="font-size: 40px;"><strong>Хаан Банк: </strong></td>
                    <td align="right" style="font-size: 40px;"><strong>5026451776</strong> / Амартүвшин</td>
                </tr> -->
                <!-- <tr v-if="info.status == 'pending'" style="margin-top: 20px; border-style: hidden;">
                    <td style="font-size: 40px;"><strong>Хаан банк: </strong></td>
                    <td align="right" style="font-size: 40px;">5026451776</td>
                </tr> -->
                <!-- <tr style="margin-top: -15px; border-style: hidden;">
                    <td align="center" style="font-size: 60px;" colspan="2">www.itlab.mn | <strong>7511-7733</strong></td>
                </tr> -->
            </table>
            <div style="font-size: 60px; position: fixed; bottom: 0; left: 12%;">
                www.itlab.mn | <strong>7511-7733</strong>
            </div>
        </div>
        <modal :show.sync="modals.changeState">
            <h6 slot="header" class="modal-title" id="modal-title-default">Захиалгын төлөв өөрчлөх</h6>
              <div class="row">
                <div class="col-md-12">
                    <el-select v-model="select.value" filterable placeholder="Select" style="width: 100%;">
                        <el-option
                        v-for="item in select.option"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
              </div>
              <template slot="footer">
                    <base-button type="link" @click="modals.changeState = false">Гарах</base-button>
                    <base-button type="primary" @click="changeStatus" class="ml-auto">Хадгалах</base-button>
            </template>
        </modal>
    </div>
</template>
<script>
  export default {
    data() {
        return {
            ordernumber: '',
            product: [],
            info: {
                created_at: new Date()
            },
            modals: {
                changeState: false
            },
            select: {
                value: 'pending',
                option: [{
                    value: 'pending',
                    label: 'Хүлээгдэж байгаа'
                }, {
                    value: 'paid',
                    label: 'Төлбөр төлөгдсөн'
                }, {
                    value: 'shipping',
                    label: 'Хүргэлтэнд гарсан'
                }, {
                    value: 'delivered',
                    label: 'Хүргэгдсэн'
                }, {
                    value: 'expired',
                    label: 'Цуцлагдсан'
                }]
            }
        }
    },
    mounted() {
        this.ordernumber = this.$route.params.id;
        this.getOrder();
    },
    methods: {
        printAddress() {
            this.$htmlToPaper('printMe');
        },
        changeStatus() {
            //this.select.value
            var rts = this;
            var token = localStorage.getItem('token');
            rts.$axios({
              method: 'POST',
                url: rts.$appUrl + '/api/admin/change-order-status',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    ordernumber: this.ordernumber,
                    status: this.select.value
                }
            }).then(data => {
                if(data.data.result == 'success') {
                    rts.info.status = rts.select.value;
                    rts.$notify({
                        title: 'Амжилттай',
                        message: 'Төлөв шинэчлэгдлээ',
                        type: 'success'
                    });
                    rts.modals.changeState = false;
                }
            });
        },
        getOrder() {
            var rts = this;
            var token = localStorage.getItem('token');
            rts.$axios({
              method: 'POST',
              url: rts.$appUrl + '/api/admin/show-order',
              headers: {
                  "Authorization": `Bearer ${token}`
              },
              data: {
                  ordernumber: this.ordernumber
              }
          }).then(data => {
              if(data.data.result == 'success') {
                rts.product = data.data.product;
                rts.info = data.data.info[0];
                rts.select.value = data.data.info[0].status;
              } else {
                rts.$notify({
                    title: 'Амжилтгүй',
                    message: 'Хэрэглэгчийн мэдээлэл олдсонгүй',
                    type: 'warning'
                });
                rts.$router.push('/orders');
              }
          });
        }
    }
  }
</script>
<style>
</style>
