<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8" />

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow border-0 p-5">
                        <div align="right">
                            <el-button type="primary" @click="modals.newCoupon = true" class="mr-2">Шинэ купон код үүсгэх</el-button>
                            <el-select v-model="filter" placeholder="Select" @change="getCoupons">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="table-responsive mt-2">
                                <base-table class="table align-items-center table-flush thead-light"
                                            tbody-classes="list"
                                            :data="coupon">
                                <template slot="columns">
                                    <th :style="{'background': '#F6F9FC'}">Үүсгэсэн огноо</th>
                                    <th :style="{'background': '#F6F9FC'}">Код</th>
                                    <th :style="{'background': '#F6F9FC'}">Дүн</th>
                                    <th :style="{'background': '#F6F9FC'}">Төлөв</th>
                                    <th :style="{'background': '#F6F9FC'}"></th>
                                </template>
                                <template slot-scope="{row}">
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm" style="color: #8898aa;">{{row.created_at.split('T')[0]}}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{row.promo_code}}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{Number(row.amount).toLocaleString()}}₮</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span v-if="row.status == 1" class="name mb-0 text-sm" style="color: #2dce89;">Ашиглагдаагүй</span>
                                                <span v-else class="name mb-0 text-sm" style="color: #f5365c;">Ашиглагдсан</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td align="right">
                                        <el-tooltip class="item" effect="dark" content="Устгах" placement="top">
                                            <base-button type="danger" @click="deleteCoupon(row)" size="sm"><span class="ni ni-fat-remove"></span></base-button>
                                        </el-tooltip>
                                    </td>
                                </template>
                                </base-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <modal :show.sync="modals.newCoupon">
            <h6 slot="header" class="modal-title" id="modal-title-default">Купон код үүсгэх</h6>
              <div class="row" :style="{'max-height': '400px', 'overflow': 'auto'}">
                <div class="col-md-12">
                    <div style="margin-top: 15px;">
                    <el-input placeholder="Промо код" v-model="newCoupon.promo">
                        <el-button slot="append" @click="processPromo" icon="el-icon-refresh"></el-button>
                    </el-input>
                    </div>
                </div>
                <div class="col-md-12 mt-1">
                    <el-input type="number" placeholder="Үнийн дүн" v-model="newCoupon.amount" clearable> </el-input>
                </div>
                <div class="col-md-12 mt-1">
                    <el-input placeholder="Утга" v-model="newCoupon.value" maxlength="50" clearable> </el-input>
                </div>
              </div>

              <template slot="footer">
                <base-button type="primary" @click="addCoupon">Хадгалах</base-button>
                <base-button type="link" class="ml-auto" @click="modals.newCoupon = false">Гарах
            </base-button>
          </template>
        </modal>
    </div>
</template>
<script>
export default {
    data() {
        return {
            modals: {
                newCoupon: false
            },
            coupon:[],
            page: 1,
            pagination: 0,
            filter: 3,
            options: [{
                value: 1,
                label: 'Ашиглаагүй'
            },
            {
                value: 0,
                label: 'Ашигласан'
            },
            {
                value: 3,
                label: 'Бүгд'
            }],
            newCoupon: {
                promo: '',
                amount: 0,
                value: ''
            }
        }
    },
    mounted() {
        this.getCoupons();
    },
    methods: {
        addCoupon() {
            var rts = this;
            var token = localStorage.getItem('token');
            rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/admin/add-coupon',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    promo: this.newCoupon.promo,
                    amount: this.newCoupon.amount,
                    value: this.newCoupon.value,
                    page: this.page,
                    status: this.filter
                }
            }).then(data => {
                if(data.data.result == 'success') {
                    rts.coupon = data.data.data;
                    rts.pagination = data.data.pagination;
                    rts.$notify({
                        title: 'Амжилттай',
                        message: `Купон бүртгэгдлээ`,
                        type: 'success'
                    });
                } else {
                    rts.$notify({
                        title: 'Амжилтгүй',
                        message: `Бүртгэлтэй промо код`,
                        type: 'danger'
                    });
                }
            });
        },
        processPromo() {
            let result = ''; var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; var length = 16;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            this.newCoupon.promo = result;
        },
        deleteCoupon(coupon) {
            if(coupon.status == 1) {
                var rts = this;
                var token = localStorage.getItem('token');
                this.$msgbox({
            title: 'Санамж',
            message: 'Устгахдаа итгэлтэй байна уу',
            showCancelButton: true,
            confirmButtonText: 'Тийм',
            cancelButtonText: 'Болих',
            beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                    instance.confirmButtonLoading = true;
                    instance.confirmButtonText = 'Түр хүлээнэ үү...';
                    rts.$axios({
                        method: 'POST',
                        url: rts.$appUrl + '/api/admin/delete-coupon',
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        data: {
                            id: coupon.id
                        }
                    }).then(data => {
                        if(data.data.result == 'success') {
                            rts.$notify({
                                title: 'Амжилттай',
                                message: `Купон код устгагдлаа`,
                                type: 'success'
                            });
                            rts.coupon.forEach((el, index) => {
                                if(el.id == coupon.id) {
                                    rts.coupon.splice(index, 1);
                                }
                            });
                        }
                        instance.confirmButtonLoading = false;
                        done();
                    });
                } else {
                    done();
                }
            }});
            } else {
                this.$notify({
                    title: 'Амжилтгүй',
                    message: `Ашиглагдсан купон код устгах боломжгүй`,
                    type: 'danger'
                });
            }
        },
        getCoupons () {
            var rts = this;
            var token = localStorage.getItem('token');
            rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/admin/get-coupons',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    page: this.page,
                    status: this.filter
                }
            }).then(data => {
                rts.coupon = data.data.data;
                rts.pagination = data.data.pagination;
            });
        }
    }
}
</script>