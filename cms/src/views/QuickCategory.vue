<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8" />

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow border-0 p-5">
                        <tabs>
                        <tab-pane title="Гялс категори">
                        <div align="right">
                            <el-button type="primary" @click="modals.newQuickCategory = true" class="mr-2">Гялс категори бүртгэх</el-button>
                        </div>
                        <div class="table-responsive mt-2">
                                <base-table class="table align-items-center table-flush thead-light"
                                            tbody-classes="list"
                                            :data="quickCategory">
                                <template slot="columns">
                                    <th :style="{'background': '#F6F9FC'}">Зураг</th>
                                    <th :style="{'background': '#F6F9FC'}">Категори нэр</th>
                                    <th :style="{'background': '#F6F9FC'}"></th>
                                </template>
                                <template slot-scope="{row}">
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <img :src="$appUrl+'/images/category/'+row.image" style="width: auto; height: 50px;">
                                            </div>
                                        </div>
                                    </th>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{row.sub_category_name}}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td align="right">
                                        <el-tooltip class="item" effect="dark" content="Устгах" placement="top">
                                            <base-button type="danger" @click="deleteQuickCategory(row)" size="sm"><span class="ni ni-fat-remove"></span></base-button>
                                        </el-tooltip>
                                    </td>
                                </template>
                                </base-table>
                        </div>
                        </tab-pane>
                        <tab-pane title="Санал болгох">
                            <div align="right">
                                <el-button type="primary" @click="modals.newFeature = true" class="mr-2">Бүтээгдэхүүн нэмэх</el-button>
                            </div>
                            <div class="table-responsive mt-2">
                                <base-table class="table align-items-center table-flush thead-light"
                                            tbody-classes="list"
                                            :data="featured">
                                <template slot="columns">
                                    <th :style="{'background': '#F6F9FC'}">Зураг</th>
                                    <th :style="{'background': '#F6F9FC'}">Бүтээгдэхүүн</th>
                                    <th :style="{'background': '#F6F9FC'}">Үнэ</th>
                                    <th :style="{'background': '#F6F9FC'}">Үлдэгдэл</th>
                                    <th :style="{'background': '#F6F9FC'}"></th>
                                </template>
                                <template slot-scope="{row}">
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <img :src="$appUrl+'/images/product/'+row.image" style="width: auto; height: 50px;">
                                            </div>
                                        </div>
                                    </th>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{row.name}}</span><br>
                                                <span class="name mb-0 text-sm"><strong>{{row.model}}</strong> {{row.color_name}}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{Number(row.sale_price).toLocaleString()}}₮</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{Number(row.remain).toLocaleString()}}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td align="right">
                                        <el-tooltip class="item" effect="dark" content="Устгах" placement="top">
                                            <base-button type="danger" @click="deleteFeature(row.id)" size="sm"><span class="ni ni-fat-remove"></span></base-button>
                                        </el-tooltip>
                                    </td>
                                </template>
                                </base-table>
                        </div>
                        </tab-pane>
                        <tab-pane title="Хямдралтай">
                            <div align="right">
                                <el-button type="primary" @click="modals.newDiscount = true" class="mr-2">Бүтээгдэхүүн нэмэх</el-button>
                            </div>
                            <div class="table-responsive mt-2">
                                <base-table class="table align-items-center table-flush thead-light"
                                            tbody-classes="list"
                                            :data="discount">
                                <template slot="columns">
                                    <th :style="{'background': '#F6F9FC'}">Зураг</th>
                                    <th :style="{'background': '#F6F9FC'}">Бүтээгдэхүүн</th>
                                    <th :style="{'background': '#F6F9FC'}">Үнэ</th>
                                    <th :style="{'background': '#F6F9FC'}">Хямдрал</th>
                                    <th :style="{'background': '#F6F9FC'}">Хямдарсан үнэ</th>
                                    <th :style="{'background': '#F6F9FC'}">Үлдэгдэл</th>
                                    <th :style="{'background': '#F6F9FC'}"></th>
                                </template>
                                <template slot-scope="{row}">
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <img :src="$appUrl+'/images/product/'+row.image" style="width: auto; height: 50px;">
                                            </div>
                                        </div>
                                    </th>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{row.name}}</span><br>
                                                <span class="name mb-0 text-sm"><strong>{{row.model}}</strong> {{row.color_name}}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{Number(row.sale_price).toLocaleString()}}₮</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{row.discount}}%</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{Number(row.sale_price - (row.sale_price / 100 * row.discount)).toLocaleString()}}₮</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{Number(row.remain).toLocaleString()}}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td align="right">
                                        <el-tooltip class="item" effect="dark" content="Устгах" placement="top">
                                            <base-button type="danger" @click="deleteDiscount(row.id)" size="sm"><span class="ni ni-fat-remove"></span></base-button>
                                        </el-tooltip>
                                    </td>
                                </template>
                                </base-table>
                        </div>
                        </tab-pane>
                        </tabs>
                    </div>
                </div>
            </div>
        </div>

        <modal :show.sync="modals.newQuickCategory">
            <h6 slot="header" class="modal-title" id="modal-title-default">Гялс категори үүсгэх</h6>
              <div class="row" :style="{'max-height': '400px', 'overflow': 'auto'}">
                <div class="col-md-12">
                    <el-select v-model="selectedCategory" filterable placeholder="Select" style="width: 100%;">
                        <el-option
                        v-for="item in category"
                        :key="item.id"
                        :label="item.sub_category_name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                    <base-button type="danger" class="mt-2" style="width: 100%" @click="clickUpload">Зураг оруулах</base-button>
                    <input type="file" accept="image/*" ref="image" id="image" hidden @change="onCategoryImage" />
                </div>
              </div>

              <template slot="footer">
                <base-button type="primary" @click="addQuickCategory">Хадгалах</base-button>
                <base-button type="link" class="ml-auto" @click="modals.newQuickCategory = false">Гарах
            </base-button>
          </template>
        </modal>

        <modal :show.sync="modals.newFeature">
            <h6 slot="header" class="modal-title" id="modal-title-default">Санал болгож буй бараа нэмэх</h6>
              <div class="row" :style="{'max-height': '400px', 'overflow': 'auto'}">
                <div class="col-md-12">
                    <el-input
                    placeholder="Модель дугаараа оруулна уу"
                    v-model="newFeature"
                    clearable>
                    </el-input>
                </div>
              </div>

              <template slot="footer">
                <base-button type="primary" @click="addFeature">Хадгалах</base-button>
                <base-button type="link" class="ml-auto" @click="modals.newFeature = false">Гарах</base-button>
          </template>
        </modal>

        <modal :show.sync="modals.newDiscount">
            <h6 slot="header" class="modal-title" id="modal-title-default">Хямдралтай бараа нэмэх</h6>
              <div class="row" :style="{'max-height': '400px', 'overflow': 'auto'}">
                <div class="col-md-12">
                    <el-input
                    placeholder="Модель дугаараа оруулна уу"
                    v-model="newDiscount"
                    clearable>
                    </el-input>
                    <el-input
                    class="mt-1"
                    min="0"
                    max="100"
                    placeholder="Хямдрах хувь"
                    type="number"
                    v-model="newDiscountPercent"
                    clearable>
                    </el-input>
                </div>
              </div>

              <template slot="footer">
                <base-button type="primary" @click="addDiscount">Хадгалах</base-button>
                <base-button type="link" class="ml-auto" @click="modals.newDiscount = false">Гарах</base-button>
          </template>
        </modal>
    </div>
</template>
<script>
export default {
    data() {
        return {
            modals: {
                newQuickCategory: false,
                newFeature: false,
                newDiscount: false
            },
            quickCategory:[],
            category: [],
            selectedCategory: 0,
            selectedCategoryImage: '',
            featured: [],
            newFeature: '',
            newDiscount: '',
            newDiscountPercent: 0,
            discount: []
        }
    },
    mounted() {
        this.getQuick();
        this.getFeatured();
        this.getDiscount();
    },
    methods: {
        addDiscount() {
            if(this.newDiscount != '') {
                var rts = this;
                var token = localStorage.getItem('token');
                rts.$axios({
                    method: 'POST',
                    url: rts.$appUrl + '/api/admin/add-discount',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    data: {
                        model: this.newDiscount,
                        percent: this.newDiscountPercent
                    }
                }).then(data => {
                     if(data.data.result == 'failed') {
                        rts.$notify({
                            title: 'Амжилтгүй',
                            message: `Бүтээгдэхүүн олдсонгүй`,
                            type: 'danger'
                        });
                    } else if(data.data.result == 'success') {
                        rts.$notify({
                            title: 'Амжилттай',
                            message: `Бүтээгдэхүүн бүртгэгдлээ`,
                            type: 'success'
                        });
                        rts.discount = data.data.discount;
                    }
                });
            }
        },
        deleteDiscount(id) {
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
                        url: rts.$appUrl + '/api/admin/delete-discount',
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        data: {
                            id
                        }
                    }).then(data => {
                        if(data.data.result == 'success') {
                            rts.discount.forEach((el, index) => {
                                if(el.id == id) {
                                    rts.discount.splice(index, 1);
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
            
        },
        getDiscount() {
            var rts = this;
            var token = localStorage.getItem('token');
            rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/admin/get-discount',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(data => {
                rts.discount = data.data.discount;
            });
        },
        deleteFeature(id) {
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
                        url: rts.$appUrl + '/api/admin/delete-featured',
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        data: {
                            id
                        }
                    }).then(data => {
                        if(data.data.result == 'success') {
                            rts.featured.forEach((el, index) => {
                                if(el.id == id) {
                                    rts.featured.splice(index, 1);
                                }
                            });
                            rts.$notify({
                                title: 'Амжилттай',
                                message: `Бүтээгдэхүүн устгагдлаа`,
                                type: 'success'
                            });
                        }
                        instance.confirmButtonLoading = false;
                        done();
                    });
                } else {
                    done();
                }
            }});
        },
        addFeature() {
            if(this.newFeature != '') {
                var rts = this;
                var token = localStorage.getItem('token');
                rts.$axios({
                    method: 'POST',
                    url: rts.$appUrl + '/api/admin/add-featured',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    data: {
                        model: this.newFeature
                    }
                }).then(data => {
                    if(data.data.result == 'notfound') {
                        rts.$notify({
                            title: 'Амжилтгүй',
                            message: `Бүтээгдэхүүн олдсонгүй`,
                            type: 'danger'
                        });
                    } else if(data.data.result == 'failed') {
                        rts.$notify({
                            title: 'Амжилтгүй',
                            message: `Аль хэдийн бүртгэгдсэн`,
                            type: 'danger'
                        });
                    } else if(data.data.result == 'success') {
                        rts.$notify({
                            title: 'Амжилттай',
                            message: `Бүтээгдэхүүн бүртгэгдлээ`,
                            type: 'success'
                        });
                        rts.featured = data.data.product;
                    }
                });
            }
        },
        getFeatured() {
            var rts = this;
            var token = localStorage.getItem('token');
            rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/admin/get-featured',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(data => {
                rts.featured = data.data.product;
            });
        },
        deleteQuickCategory(info) {
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
                        url: rts.$appUrl + '/api/admin/delete-quick-category',
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        data: {
                            info
                        }
                    }).then(data => {
                        if(data.data.result == 'success') {
                            rts.$notify({
                                title: 'Амжилттай',
                                message: `Гялс категори устгах`,
                                type: 'success'
                            });
                            rts.quickCategory.forEach((el, index) => {
                                if(el.id == info.id) {
                                    rts.quickCategory.splice(index, 1);
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
        },
        addQuickCategory() {
            var rts = this;
            const token = localStorage.getItem('token');
            if(this.selectedCategoryImage) {
                const fd = new FormData();
                fd.append('photo', this.selectedCategoryImage, this.selectedCategoryImage.name);
                fd.append('id', this.selectedCategory);
                this.$axios.post(this.$appUrl+'/api/admin/add-quick-category', 
                fd,
                    {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                    }
                )
                .then(function(data) {            
                    if (data.data.result == 'success') {
                        rts.$notify({
                            title: 'Амжилттай',
                            message: `Гялс категори бүртгэгдлээ`,
                            type: 'success'
                        });
                        rts.quickCategory = data.data.data;
                    } else {
                        rts.$notify({
                            title: 'Амжилтгүй',
                            message: `Бүртгэлтэй категори`,
                            type: 'danger'
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
            } else {
                this.$notify({
                    title: 'Амжилтгүй',
                    message: `Зураг оруулна уу`,
                    type: 'danger'
                });
            }
        },
        clickUpload() {
            this.$refs.image.click()
        },
        onCategoryImage(e) {
            const file = e.target.files[0];
            this.selectedCategoryImage = file;
        },
        getQuick () {
            var rts = this;
            var token = localStorage.getItem('token');
            rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/admin/get-quick-category',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(data => {
                rts.quickCategory = data.data.data;
                rts.category = data.data.category;
                rts.selectedCategory = data.data.category[0].id
            });
        }
    }
}
</script>