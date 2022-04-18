<template>
    <div>
        <main id="content" role="main" v-loading.fullscreen.lock="fullscreenLoading">
            <div class="container">
                <div class="my-md-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-3 flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble">
                            <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1"><router-link to="/home">Нүүр хуудас</router-link></li>
                            <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1 active" aria-current="page">Өндөр борлуулалттай 20 бүтээгдэхүүн</li>
                        </ol>
                    </nav>
                </div>
                <div class="row">
                    <div class="col-xl-12 col-wd-12gdot5">
                                <div class="bg-gray-1 flex-center-between borders-radius-9 py-1">
                                    <div class="px-3 d-none d-xl-block">
                                        <ul class="nav nav-tab-shop" id="pills-tab" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="pills-one-example1-tab" data-toggle="pill" href="#pills-one-example1" role="tab" aria-controls="pills-one-example1" aria-selected="false">
                                                    <div class="d-md-flex justify-content-md-center align-items-md-center">
                                                        <i class="fa fa-th"></i>
                                                    </div>
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="pills-three-example1-tab" data-toggle="pill" href="#pills-three-example1" role="tab" aria-controls="pills-three-example1" aria-selected="true">
                                                    <div class="d-md-flex justify-content-md-center align-items-md-center">
                                                        <i class="fa fa-list"></i>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="tab-content" id="pills-tabContent">
                                    <div class="tab-pane fade pt-2 show active" id="pills-one-example1" role="tabpanel" aria-labelledby="pills-one-example1-tab" data-target-group="groups">
                                        <ul class="row list-unstyled products-group no-gutters">
                                            <li v-for="(item, index) in products" :key="index" class="col-6 col-md-3 col-wd-2gdot4 product-item" v-bind:class="{'remove-divider-wd': (index + 1) % 5 == 0 || (index + 1) == products.length}">
                                                <div class="product-item__outer h-100">
                                                    <div class="product-item__inner px-xl-4 p-3">
                                                        <div class="product-item__body pb-xl-2">
                                                            <div class="mb-2"><router-link :to="'/category/'+item.type" class="font-size-12 text-gray-5">{{item.category_name}}</router-link></div>
                                                            <h5 class="mb-1 product-item__title"><router-link :to="'/single-product/'+item.id" class="text-blue font-weight-bold">{{item.model}} {{item.name}}</router-link></h5>
                                                            <div class="mb-2">
                                                                <router-link :to="'/single-product/'+item.id" class="d-block text-center"><img class="img-fluid" :src="$appUrl+'/images/product/'+item.image" alt="Image Description"></router-link>
                                                            </div>
                                                            <div class="flex-center-between mb-1">
                                                                <div v-if="item.discount > 0" class="prodcut-price d-flex align-items-center flex-wrap position-relative">
                                                                    <ins class="font-size-20 text-red text-decoration-none mr-2">₮{{Number(item.sale_price * ((100 - item.discount) / 100)).toLocaleString()}}</ins>
                                                                    <del class="font-size-12 tex-gray-6 position-absolute bottom-100" style="top: -9px;">₮{{Number(item.sale_price).toLocaleString()}}</del>
                                                                </div>
                                                                <div v-else class="prodcut-price d-flex align-items-center flex-wrap position-relative">
                                                                    <ins class="font-size-20 text-decoration-none mr-2">₮{{Number(item.sale_price).toLocaleString()}}</ins>
                                                                    <ins class="font-size-12 text-decoration-none tex-gray-6 position-absolute bottom-100" style="top: -9px; vertical-align: middle;"><i class="fas fa-gift"></i> {{Number(item.sale_price / 100 * item.bonus_percent).toLocaleString()}}₮</ins>
                                                                </div>
                                                                <div class="d-none d-xl-block prodcut-add-cart">
                                                                    <a href="javascript:;" @click="cart(item)" class="btn-add-cart btn-primary transition-3d-hover"><i class="ec ec-add-to-cart"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="product-item__footer">
                                                            <div class="border-top pt-2 flex-center-between flex-wrap">
                                                                <a href="javascript:;" @click="addCompare(item.id)" class="text-gray-6 font-size-12"><i class="ec ec-compare font-size-15"></i> Харьцуулах</a>
                                                                <a href="javascript:;" @click="addFav(item.id)" class="text-gray-6 font-size-12"><i class="ec ec-favorites font-size-15"></i> Хадгалах</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tab-pane fade pt-2" id="pills-three-example1" role="tabpanel" aria-labelledby="pills-three-example1-tab" data-target-group="groups">
                                        <ul class="d-block list-unstyled products-group prodcut-list-view">
                                            <li v-for="(item, index) in products" :key="index" class="product-item remove-divider">
                                                <div class="product-item__outer w-100">
                                                    <div class="product-item__inner remove-prodcut-hover py-4 row">
                                                        <div class="product-item__header col-6 col-md-3">
                                                            <div class="mb-2">
                                                                <router-link :to="'/single-product/'+item.id" class="d-block text-center"><img class="img-fluid" :src="$appUrl+'/images/product/'+item.image" :style="{'width': '180px', 'height': 'auto'}" alt="Image Description"></router-link>
                                                            </div>
                                                        </div>
                                                        <div class="product-item__body col-6 col-md-6">
                                                            <div class="pr-lg-10">
                                                                <div class="mb-2"><router-link :to="'/category/'+item.type" class="font-size-12 text-gray-5">{{item.category_name}}</router-link></div>
                                                                <h5 class="product-item__title"><router-link :to="'/single-product/'+item.id" class="text-blue font-weight-bold">{{item.model}} {{item.name}}</router-link></h5>
                                                                <div class="mb-1 d-none d-md-block">
                                                                    <a class="d-inline-flex align-items-center small font-size-14" href="#">
                                                                        <div class="text-warning mr-2">
                                                                            <small v-for="item in item.total_rate" :key="item" class="fas fa-star"></small>
                                                                            <small v-for="(s, index) in 5 - item.total_rate" :key="index" class="far fa-star text-muted"></small>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                                <ul class="font-size-12 p-0 text-gray-110 mb-4 d-none d-md-block">
                                                                    <li class="line-clamp-1 mb-1 list-bullet">{{item.brandname}}</li>
                                                                    <li class="line-clamp-1 mb-1 list-bullet">{{item.color_name}}.</li>
                                                                </ul>
                                                                <div v-if="item.discount > 0" class="prodcut-price d-flex align-items-center flex-wrap position-relative d-md-none mt-3">
                                                                    <ins class="font-size-20 text-red text-decoration-none mr-2">₮{{Number(item.sale_price * ((100 - item.discount) / 100)).toLocaleString()}}</ins>
                                                                    <del class="font-size-12 tex-gray-6 position-absolute bottom-100" style="top: -9px;">₮{{Number(item.sale_price).toLocaleString()}}</del>
                                                                </div>
                                                                <div v-else class="prodcut-price d-flex align-items-center flex-wrap position-relative d-md-none mt-3">
                                                                    <ins class="font-size-20 text-decoration-none mr-2">₮{{Number(item.sale_price).toLocaleString()}}</ins>
                                                                    <ins class="font-size-12 text-decoration-none tex-gray-6 position-absolute bottom-100" style="top: -9px; vertical-align: middle;"><i class="fas fa-gift"></i> {{Number(item.sale_price / 100 * item.bonus_percent).toLocaleString()}}₮</ins>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="product-item__footer col-md-3 d-md-block">
                                                            <div class="mb-3">
                                                                <div v-if="item.discount > 0" class="prodcut-price d-flex align-items-center flex-wrap position-relative">
                                                                    <ins class="font-size-20 text-red text-decoration-none mr-2">₮{{Number(item.sale_price * ((100 - item.discount) / 100)).toLocaleString()}}</ins>
                                                                    <del class="font-size-12 tex-gray-6 position-absolute bottom-100" style="top: -9px;">₮{{Number(item.sale_price).toLocaleString()}}</del>
                                                                </div>
                                                                <div v-else class="prodcut-price d-flex align-items-center flex-wrap position-relative">
                                                                    <ins class="font-size-20 text-decoration-none mr-2">₮{{Number(item.sale_price).toLocaleString()}}</ins>
                                                                    <ins class="font-size-12 text-decoration-none tex-gray-6 position-absolute bottom-100" style="top: -9px; vertical-align: middle;"><i class="fas fa-gift"></i> {{Number(item.sale_price / 100 * item.bonus_percent).toLocaleString()}}₮</ins>
                                                                </div>
                                                                <div class="prodcut-add-cart">
                                                                    <a href="javascript:;" @click="cart(item)" class="btn btn-sm btn-block btn-primary-dark btn-wide transition-3d-hover">Сагсанд нэмэх</a>
                                                                </div>
                                                            </div>
                                                            <div class="flex-horizontal-center justify-content-between justify-content-wd-center flex-wrap">
                                                                <a href="javascript:;" @click="addCompare(item.id)" class="text-gray-6 font-size-12"><i class="ec ec-compare font-size-15"></i> Харьцуулах</a>
                                                                <a href="javascript:;" @click="addFav(item.id)" class="text-gray-6 font-size-13 mx-wd-3"><i class="ec ec-favorites mr-1 font-size-15"></i> Хадгалах</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
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
export default {
    components: {
        Brands
    },
    data() {
        return {
            fullscreenLoading: false,
            products: []
        }
    },
    mounted() {
        this.$emit('getJquery');
        this.getProduct();
    },
    methods: {
        addCompare(item) {
            this.$emit('addCompare', item);
        },
        addFav(item) {
            this.$emit('addFavourite', item);
        },
        cart(item) {
            this.$emit('addCart', [1, item]);
        },
        getProduct() {
            var rts = this;
            this.$axios({
                method: 'post',
                url: rts.$appUrl +'/api/product/top20',
                headers: {}
            }).then(data => {
                rts.products = data.data.top;
            });
        }
    }
}
</script>