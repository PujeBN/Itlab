<style scoped>
.cut-text { 
  text-overflow: ellipsis;
  overflow: hidden; 
  width: 212px; 
  height: 1.2em; 
  white-space: nowrap;
  display: block;

}
</style>
<template>
    <div>
        <main id="content" role="main" v-loading.fullscreen.lock="fullscreenLoading">
            <div class="bg-gray-13 bg-md-transparent">
                <div class="container">
                    <div class="my-md-3">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-3 flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble">
                                <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1"><router-link to="/home">Нүүр хуудас</router-link></li>
                                <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1 active" aria-current="page">Бүтээгдэхүүн харьцуулалт</li>
                            </ol>
                        </nav>
                    </div>
                    <div class="table-responsive table-bordered table-compare-list mb-10 border-0">
                        <div align="center">
                            <p v-if="products.length <= 0" class="text-gray-90 font-size-20 mb-0 font-weight-light">ХАРЬЦУУЛАХ БҮТЭЭГДЭХҮҮНЭЭ СОНГОНО УУ</p>
                            <table v-else class="table">
                                <tbody>
                                    <tr>
                                        <th class="min-width-200">Бүтээгдэхүүн</th>
                                        <td v-for="(item, index) in products" :key="index" align="center">
                                            <router-link :to="'/single-product/'+item.id" class="product d-block">
                                                <div class="product-compare-image">
                                                    <div class="d-flex mb-3">
                                                        <img class="img-fluid mx-auto"  :src="$appUrl+'/images/product/'+item.image" :alt="item.model" style="width:212px; height: auto;">
                                                    </div>
                                                </div>
                                                <div align="center">
                                                    <h3 class="product-item__title text-blue font-weight-bold mb-3 cut-text">{{item.model}} {{item.name}}</h3>
                                                </div>
                                            </router-link>
                                            <div class="text-warning mb-2">
                                            
                                            <!-- @for($i=1; $i<=$pro->total_rate; $i++)
                                            <small class="fas fa-star"></small>
                                            @endfor
                                            @for($i=1; $i <= 5 - $pro->total_rate; $i++)
                                            <small class="far fa-star"></small>
                                            @endfor -->
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Үнэ</th>
                                        <td v-for="(item, index) in products" :key="index">
                                            <div class="product-price">₮{{Number(item.sale_price).toLocaleString()}}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Үлдэгдэл</th>
                                        <td v-for="(item, index) in products" :key="index"><span style="font-weight: 700;">{{Number(item.remain).toLocaleString()}}</span></td>
                                    </tr>
                                    <tr>
                                        <th>Сагсанд нэмэх</th>
                                        <td v-for="(item, index) in products" :key="index">
                                            <div class="">
                                                <button type="button" @click="cart(item)" class="btn btn-primary-dark-w" style="width: 120px; border-radius: 12px;">Нэмэх</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-for="(item, index) in specs" :key="index">
                                        <th>{{item.replace('_',' ')}}</th>
                                        <td v-for="(p, index) in products" :key="index+'p'">
                                            {{checkSpecs(item, p.id)}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Устгах</th>
                                        <td v-for="(item, index) in products" :key="index" class="text-center">
                                            <a href="javascript:;" @click="removeproduct(item.id)" class="text-gray-90 text-danger"><i class="far fa-trash-alt"></i></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
export default {
    components: {
        Brands
    },
    data() {
        return {
            fullscreenLoading: false,
            products:[],
            specs: [],
            specPro: []
        }
    },
    mounted() {
        this.$emit('getJquery');
        this.getProduct();
    },
    methods: {
        removeproduct(id) {
            let products = JSON.parse(localStorage.getItem('compare'));
            products.forEach((el, index) => {
                if(el == id) {
                    products.splice(index, 1);
                }
            });
            localStorage.compare = JSON.stringify(products);
            this.products.forEach((el, index) => {
                if(el.id == id) {
                    this.products.splice(index,1);
                }
            });
        },
        checkSpecs(item, pId) {
            let r = '-';
            let ex = this.specPro.some(function(field) {
                return field.product_id == pId
            });
            if(ex) {
                this.specPro.forEach(s => {
                    if(pId == s.product_id) {
                        // console.log(s, item);
                        r = s[item];
                    }
                });
                return r;
            } else {
                return r;
            }
        },
        cart(item) {
            this.$emit('addCart', [1, item]);
        },
        getProduct() {
            let products = JSON.parse(localStorage.getItem('compare'));
            console.log(products);
            var rts = this;
            this.$axios({
                method: 'post',
                url: rts.$appUrl +'/api/product/compare',
                headers: {},
                data: {
                    id: products
                }
            }).then(data => {
                console.log(data);
                rts.products = data.data.product;
                rts.specs = data.data.specs;
                rts.specPro = data.data.sp;
            });
        }
    }
}
</script>