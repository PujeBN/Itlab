<template>
    <div>
        <div class="mb-8 container mt-8">
            <div class="py-2 border-top border-bottom" v-if="brand != null">
                <slick ref="slick" :options="slickOptions">
                    <!-- <a v-for="(item, index) in brand" :key="index" href="javascript:;" class="">
                        <img class="img-fluid m-auto max-height-50 link-hover__brand" :src="$appUrl+'/images/brand/'+item.images" :alt="item.brandname" :style="{'width': '100px', 'height': 'auto'}">
                    </a> -->
                    <a href="javascript:;" v-for="(item, index) in brand" :key="index">
                        <img class="img-fluid m-auto max-height-50 link-hover__brand" :src="$appUrl+'/images/brand/'+item.images" :alt="item.brandname" :style="{'width': '100px', 'height': 'auto'}">
                    </a>
                </slick>
            </div>
        </div>
        <footer>
            <!-- Footer-top-widget -->
            <div class="container d-none d-lg-block mb-3">
                <div class="row">
                    <div class="col-wd-3 col-lg-4">
                        <div class="widget-column">
                            <div class="border-bottom border-color-1 mb-5">
                                <h3 class="section-title section-title__sm mb-0 pb-2 font-size-18">Санал болгох</h3>
                            </div>
                            <ul class="list-unstyled products-group">
                                <li v-for="(item, index) in featured" :key="index" class="product-item product-item__list row no-gutters mb-6 remove-divider">
                                    <div class="col-auto">
                                        <router-link :to="'/single-product/'+item.id" class="d-block width-75 text-center"><img class="img-fluid" :src="$appUrl+'/images/product/'+item.image" alt="Image Description"></router-link>
                                    </div>
                                    <div class="col pl-4 d-flex flex-column">
                                        <h5 class="product-item__title mb-0"><router-link :to="'/single-product/'+item.id" class="text-blue font-weight-bold">{{item.model}} {{item.name}}</router-link></h5>
                                        <div class="prodcut-price mt-auto">
                                            <div class="font-size-15">₮{{Number(item.sale_price).toLocaleString()}}</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-wd-3 col-lg-4">
                        <div class="border-bottom border-color-1 mb-5">
                            <h3 class="section-title section-title__sm mb-0 pb-2 font-size-18">Хямдралтай</h3>
                        </div>
                        <ul class="list-unstyled products-group">
                            <li v-for="(item, index) in discount" :key="index" class="product-item product-item__list row no-gutters mb-6 remove-divider">
                                <div class="col-auto">
                                    <router-link :to="'/single-product/'+item.id" class="d-block width-75 text-center"><img class="img-fluid" :src="$appUrl+'/images/product/'+item.image" alt="Image Description"></router-link>
                                </div>
                                <div class="col pl-4 d-flex flex-column">
                                    <h5 class="product-item__title mb-0"><router-link :to="'/single-product/'+item.id" class="text-blue font-weight-bold">{{item.model}} {{item.name}}</router-link></h5>
                                    <div class="prodcut-price mt-auto flex-horizontal-center">
                                        <ins class="font-size-15 text-decoration-none">₮{{Number(item.sale_price * ((100 - item.discount) / 100)).toLocaleString()}}</ins>
                                        <del class="font-size-12 text-gray-9 ml-2">₮{{Number(item.sale_price).toLocaleString()}}</del>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="col-wd-3 col-lg-4">
                        <div class="border-bottom border-color-1 mb-5">
                            <h3 class="section-title section-title__sm mb-0 pb-2 font-size-18">Өндөр үнэлгээтэй</h3>
                        </div>
                        <ul class="list-unstyled products-group">
                            <li v-for="(item, index) in top" :key="index" class="product-item product-item__list row no-gutters mb-6 remove-divider">
                                <div class="col-auto">
                                    <router-link :to="'/single-product/'+item.id" class="d-block width-75 text-center"><img class="img-fluid" :src="$appUrl+'/images/product/'+item.image" alt="Image Description"></router-link>
                                </div>
                                <div class="col pl-4 d-flex flex-column">
                                    <h5 class="product-item__title mb-0"><router-link :to="'/single-product/'+item.id" class="text-blue font-weight-bold">{{item.model}} {{item.name}}</router-link></h5>
                                    <div class="text-warning mb-2">
                                        <small class="fas fa-star"></small>
                                        <small class="fas fa-star"></small>
                                        <small class="fas fa-star"></small>
                                        <small class="fas fa-star"></small>
                                        <small class="fas fa-star"></small>
                                    </div>
                                    <div class="prodcut-price mt-auto">
                                        <div class="font-size-15">₮{{Number(item.sale_price).toLocaleString()}}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="col-wd-3 d-none d-wd-block">
                        <!-- <a href="../shop/shop.html" class="d-block"><img class="img-fluid" src="@/assets/images/product/default.png" alt="Image Description"></a> -->
                        <iframe width="350" height="250" src="https://www.youtube.com/embed/AlTF6VhVzPM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
            <!-- End Footer-top-widget -->
            <!-- Footer-newsletter -->
            <div class="bg-primary py-3">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-12 mb-md-3 mb-lg-0" align="center">
                            <div class="row align-items-center">
                                <div class="col my-4 my-md-0">
                                    <h5 class="font-size-15 ml-4 mb-0">Шинэ хэрэглэгчээр бүртгүүлээд <strong>2020</strong> бонус бэлгэнд аваарай!</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Footer-newsletter -->
            <!-- Footer-bottom-widgets -->
            <div class="pt-8 pb-4 bg-gray-13">
                <div class="container mt-1">
                    <div class="row">
                        <div class="col-lg-5">
                            <div class="mb-6">
                                <a href="#" class="d-inline-block">
                                    <img src="@/assets/images/logo/itlab.png" style="width: 150px; height: auto;">
                                </a>
                            </div>
                            <div class="mb-4">
                                <div class="row no-gutters">
                                    <div class="col-auto">
                                        <i class="ec ec-support text-primary font-size-56"></i>
                                    </div>
                                    <div class="col pl-3">
                                        <div class="font-size-13 font-weight-light">Бидэнтэй холбогдохыг хүсвэл</div>
                                        <a href="tel:+97675117733" class="font-size-20 text-gray-90">(976) 7511-7733, </a>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-4">
                                <h6 class="mb-1 font-weight-bold">Хаяг</h6>
                                <address class="">
                                    Монгол улс, Улаанбаатар хот, ЧД 1-р хороо, 1-р 40 50 мянгат, <br> Ноён хутагт Данзанравжаа гудамж 17/1 барилга 3-302 тоот
                                </address>
                            </div>
                            <div class="my-4 my-md-4">
                                <ul class="list-inline mb-0 opacity-7">
                                    <li class="list-inline-item mr-0">
                                        <a class="btn font-size-20 btn-icon btn-soft-dark btn-bg-transparent rounded-circle" href="javascript:;">
                                            <span class="fab fa-facebook-f btn-icon__inner"></span>
                                        </a>
                                    </li>
                                    <li class="list-inline-item mr-0">
                                        <a class="btn font-size-20 btn-icon btn-soft-dark btn-bg-transparent rounded-circle" href="javascript:;">
                                            <span class="fab fa-google btn-icon__inner"></span>
                                        </a>
                                    </li>
                                    <li class="list-inline-item mr-0">
                                        <a class="btn font-size-20 btn-icon btn-soft-dark btn-bg-transparent rounded-circle" href="javascript:;">
                                            <span class="fab fa-instagram btn-icon__inner"></span>
                                        </a>
                                    </li>
                                    <li class="list-inline-item mr-0">
                                        <a class="btn font-size-20 btn-icon btn-soft-dark btn-bg-transparent rounded-circle" href="javascript:;">
                                            <span class="fab fa-github btn-icon__inner"></span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <div class="row">
                                <div class="col-12 col-md mb-4 mb-md-0">
                                    <h6 class="mb-3 font-weight-bold">Ангилал</h6>
                                    <!-- List Group -->
                                    <ul class="list-group list-group-flush list-group-borderless mb-0 list-group-transparent">
                                        <li v-for="(item, index) in categories.slice(0,8)" :key="index"><router-link class="list-group-item list-group-item-action" :to="'/category/'+item.id">{{item.category_name}}</router-link></li>
                                    </ul>
                                    <!-- End List Group -->
                                </div>

                                <div class="col-12 col-md mb-4 mb-md-0">
                                    <!-- List Group -->
                                    <ul class="list-group list-group-flush list-group-borderless mb-0 list-group-transparent mt-md-6">
                                        <li v-for="(item, index) in categories.slice(8,categories.length)" :key="index"><router-link class="list-group-item list-group-item-action" :to="'/category/'+item.id">{{item.category_name}}</router-link></li>
                                    </ul>
                                    <!-- End List Group -->
                                </div>

                                <div class="col-12 col-md mb-4 mb-md-0">
                                    <h6 class="mb-3 font-weight-bold">Тусламж</h6>
                                    <!-- List Group -->
                                    <ul class="list-group list-group-flush list-group-borderless mb-0 list-group-transparent">
                                        <li><a class="list-group-item list-group-item-action" href="javascript:;">Хувийн мэдээлэл</a></li>
                                        <li><a class="list-group-item list-group-item-action" href="javascript:;">Миний захиалга</a></li>
                                        <li><a class="list-group-item list-group-item-action" href="javascript:;">Дэлгүүрийн байршил</a></li>
                                        <li><a class="list-group-item list-group-item-action" href="https://hurdanhuruu.mn" target="_blank">Hurdanhuruu.mn</a></li>
                                        <li><a class="list-group-item list-group-item-action" href="http://toptoner.mn" target="_blank">Toptoner.mn</a></li>
                                    </ul>
                                    <!-- End List Group -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Footer-bottom-widgets -->
            <!-- Footer-copy-right -->
            <div class="bg-gray-14 py-2">
                <div class="container">
                    <div class="flex-center-between d-block d-md-flex">
                        <div class="mb-3 mb-md-0">© <a href="#" class="font-weight-bold text-gray-90">ITLAB</a> - Бүх эрх хуулиар хамгаалагдсан</div>
                        <div class="text-md-right">
                            <span class="d-inline-block bg-white border rounded p-1">
                                <img class="max-width-5" src="@/assets/images/payment/qpay.png">
                            </span>
                            <span class="d-inline-block bg-white border rounded p-1">
                                <img class="max-width-5" src="@/assets/images/payment/mongolchat.png">
                            </span>
                            <span class="d-inline-block bg-white border rounded p-1">
                                <img class="max-width-5" src="@/assets/images/payment/socialpay.png">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Footer-copy-right -->
        </footer>
    </div>
</template>
<script>
import Slick from 'vue-slick';
export default {
    components: {
        Slick
    },
    created() {
        this.getBrands();
    },
    data() {
        return {
            slickOptions: {
                        slidesToShow: 10,
                        infinite: true,
                        accessibility: true,
                        adaptiveHeight: false,
                        arrows: false,
                        dots: false,
                        draggable: true,
                        edgeFriction: 0.30,
                        swipe: true
            },
            brand: null,
            categories: [],
            top: [],
            featured: [],
            discount: []
        }
    },
    mounted() {
        // this.getBrands();
    },
    methods: {
        getBrands() {
            var rts = this;
            rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/home/brands',
                headers: {}
            }).then(data => {
                rts.brand = data.data.brand;
                rts.featured = data.data.featured;
                rts.top = data.data.top;
                rts.discount = data.data.discount;
                rts.categories = data.data.categories;
            });
        }
    }
}
</script>