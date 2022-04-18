<style scoped>
.search {
    width: 30%;
}
@media only screen and (max-width: 600px) {
  .search {
    width: 100%;
  }
}

.form__label {
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  margin-left: 2rem;
  margin-top: 0.7rem;
  display: block;
  transition: all 0.3s;
  transform: translateY(0rem);
}

.form__input {
  font-family: 'Roboto', sans-serif;
  color: #333;
  font-size: 1.2rem;
	margin: 0 auto;
  padding: 1.5rem 2rem;
  border-radius: 0.2rem;
  background-color: rgb(255, 255, 255);
  border: none;
  width: 90%;
  display: block;
  border-bottom: 0.3rem solid transparent;
  transition: all 0.3s;
}

.form__input:placeholder-shown + .form__label {
  opacity: 0;
  visibility: hidden;
  -webkit-transform: translateY(-4rem);
  transform: translateY(-4rem);
}
</style>
<template>
    <div>

        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Зураггүй"
                                type="gradient-orange"
                                :sub-title="String(Number(total.noImage).toLocaleString())"
                                icon="ni ni-image"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Үзүүлэлтгүй категори"
                                type="gradient-red"
                                :sub-title="String(Number(total.noSpec).toLocaleString())"
                                icon="ni ni-collection"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Түлхүүр үггүй"
                                type="gradient-green"
                                :sub-title="String(Number(total.noKey).toLocaleString())"
                                icon="ni ni-key-25"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Бүтээгдэхүүний төрөл"
                                type="gradient-info"
                                :sub-title="String(Number(total.model).toLocaleString())"
                                icon="ni ni-bullet-list-67"
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
                            <form @submit.prevent="searchProduct">
                                <el-input placeholder="Модель дугаараа оруулна уу" v-model="search" clearable class="search"> </el-input>
                                <el-tooltip class="item" effect="dark" content="Бүтээгдэхүүний бонус шинэчлэх" placement="top-end">
                                    <el-button type="primary" icon="el-icon-shopping-cart-full" style="margin-left: 20px;" @click="changeBonus"></el-button>
                                </el-tooltip>
                            </form>
                        </div>
                        <div class="table-responsive mt-2">
                                <base-table class="table align-items-center table-flush thead-light"
                                            tbody-classes="list"
                                            :data="product">
                                <template slot="columns">
                                    <th :style="{'background': '#F6F9FC'}">Зураг</th>
                                    <th :style="{'background': '#F6F9FC'}">Бүтээгдэхүүн</th>
                                    <th :style="{'background': '#F6F9FC'}">Өнгө</th>
                                    <th :style="{'background': '#F6F9FC'}">Үнэ</th>
                                    <th :style="{'background': '#F6F9FC', 'text-align': 'right'}">Үлдэгдэл</th>
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
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm" style="color: #8898aa;">{{row.name}}</span><br>
                                                <span class="name mb-0 text-sm">{{row.model}}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{row.color_name}}</span>
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
                                    <td scope="row" align="right">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">{{Number(row.remain).toLocaleString()}}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td align="right">
                                        <el-tooltip class="item" effect="dark" content="Техникийн үзүүлэлт" placement="top">
                                            <base-button type="primary" @click="goSpec(row.id)" size="sm"><span class="ni ni-bullet-list-67"></span></base-button>
                                        </el-tooltip>
                                        <el-tooltip class="item" effect="dark" content="Засах" placement="top">
                                            <base-button type="primary" @click="goEdit(row.id)" size="sm"><span class="ni ni-settings"></span></base-button>
                                        </el-tooltip>
                                        <el-tooltip class="item" effect="dark" content="Устгах" placement="top">
                                            <base-button type="danger" @click="deleteProduct(row.id)" size="sm"><span class="ni ni-fat-remove"></span></base-button>
                                        </el-tooltip>
                                    </td>
                                </template>
                                </base-table>
                        </div>
                    </div>
                    <span class="mt-3" @click="getProduct">
                        <base-pagination :page-count="pagination" class="mt-3" v-model="page"></base-pagination>
                    </span>
                </div>
            </div>
        </div>

        <modal :show.sync="modals.specs">
            <h6 slot="header" class="modal-title" id="modal-title-default">Бүтээгдэхүүний үзүүлэлт</h6>
              <div class="row">
                <div class="col-md-12" :style="{'max-height': '400px', 'overflow': 'auto'}">
                    <!-- <base-input v-for="(item, index) in specs" :name="'input'" :key="index" value="" :placeholder="item"></base-input> -->
                    <input type="text" class="form-control mt-1 specInput" v-for="(item, index) in specs" :value="productSpec[item]" :name="item" :key="index" :placeholder="item">
                </div>
              </div>

              <template slot="footer">
                <base-button type="primary" @click="saveSpec">Хадгалах</base-button>
                <base-button type="link" class="ml-auto" @click="modals.specs = false">Гарах
            </base-button>
          </template>
        </modal>
    </div>
</template>
<script>
  export default {
    data() {
        return {
            product: [],
            pagination: 0,
            search: '',
            page: 1,
            popover: false,
            modals: {
                specs: false
            },
            specs: [],
            productSpec: [],
            selectedId: '',
            base64: '',
            total: {
                noImage: 0,
                noSpec: 0,
                noKey: 0,
                model: 0
            }
        }
    },
    mounted() {
      this.getProduct();
    },
    methods: {
        changeBonus() {
            this.$prompt('Бонусын хувь', 'Бүх бүтээгдэхүүний бонус шинэчлэх', {
                confirmButtonText: 'Хадгалах',
                cancelButtonText: 'Болих',
                inputPattern: /^[0-9][0-9]?$|^100$/,
                inputErrorMessage: '100-аас хэтрэхгүй зөвхөн тоо оруулна'
            }).then(({ value }) => {
                var rts = this;
                var token = localStorage.getItem('token');
                rts.$axios({
                    method: 'POST',
                    url: rts.$appUrl + '/api/admin/update-bonus-all',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    data: {
                        percent: value
                    }
                }).then(data => {
                    if(data.data.result == 'success') {
                        rts.$notify({
                            title: 'Амжилттай',
                            message: 'Бонус шинэчлэгдлээ',
                            type: 'success'
                        });
                    }
                });
            });
        },
        goEdit(id) {
            this.$router.push({ name: 'Барааны мэдээлэл засварлах', params: {id}})
        },
        saveSpec() {
            var n = [], s = [];
            var el = document.getElementsByClassName('specInput');
            el.forEach((elm) => {
                n.push(elm.getAttribute('name'));
                s.push(elm.value);
            });
            var rts = this;
            var token = localStorage.getItem('token');
            rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/admin/update-product-spec',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    id: this.selectedId, 
                    params: n,
                    values: s
                }
            }).then(data => {
                if(data.data.result == 'success') {
                    rts.$notify({
                        title: 'Амжилттай',
                        message: 'Үзүүлэлт шинэчлэгдлээ',
                        type: 'success'
                    });
                    rts.modals.specs = false;
                }
            });
            
        },  
        goSpec(id) {
            this.selectedId = id;
            this.specs = [];
            this.productSpec = [];
            var rts = this;
            var token = localStorage.getItem('token');
            rts.$axios({
              method: 'POST',
              url: rts.$appUrl + '/api/admin/product-spec',
              headers: {
                  "Authorization": `Bearer ${token}`
              },
              data: {
                  id
              }
          }).then(data => {
                if(data.data.result == 'failed') {
                    rts.$notify({
                        title: 'Амжилтгүй',
                        message: 'Үзүүлэлтийн багана бүртгэгдээгүй байна',
                        type: 'warning'
                    });
                } else {
                    rts.specs = data.data.spec;
                    rts.modals.specs = true;
                    if(data.data.product.length > 0) {
                        rts.productSpec = data.data.product[0];
                    }
                }
          });
        },
        searchProduct() {
            this.page = 1;
            this.getProduct();
        },
        deleteProduct(id) {
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
                        url: rts.$appUrl + '/api/admin/delete-product',
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        data: {
                            id
                        }
                    }).then(data => {
                        if(data.data.result == 'success') {
                            instance.confirmButtonLoading = false;
                            rts.product.forEach((el, index) => {
                                if(el.id == id) {
                                    rts.product.splice(index, 1);
                                }
                            });
                            rts.$notify({
                                title: 'Амжилттай',
                                message: 'Бүтээгдэхүүн устгагдлаа',
                                type: 'success'
                            });
                        }
                        done();
                    });
                } else {
                    done();
                }
            }});
        },
        getProduct() {
            var rts = this;
            var token = localStorage.getItem('token');
            rts.$axios({
              method: 'POST',
              url: rts.$appUrl + '/api/admin/all-product',
              headers: {
                  "Authorization": `Bearer ${token}`
              },
              data: {
                  search: this.search, 
                  page: this.page
              }
          }).then(data => {
                rts.product = data.data.product;
                rts.pagination = data.data.pagination;
                rts.total.noImage = data.data.image;
                rts.total.noSpec = data.data.category;
                rts.total.noKey = data.data.desc;
                rts.total.model = data.data.model;
          });
        }
    }
  }
</script>
