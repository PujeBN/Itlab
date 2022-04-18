<template>
    <div>
        <!-- <header id="header" class="u-header u-header-left-aligned-nav">
            <div class="u-header__section">
                <TopBar />
                <MainBar />
            </div>
        </header> -->
        <main id="content" role="main" v-loading.fullscreen.lock="fullscreenLoading">
            <div class="bg-gray-13 bg-md-transparent">
                <div class="container">
                    <!-- breadcrumb -->
                    <div class="my-md-3">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-3 flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble">
                                <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1"><router-link to="/home">Нүүр хуудас</router-link></li>
                                <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1"><router-link :to="'/category/'+product.info.type">{{product.info.category_name}}</router-link></li>
                                <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1"><router-link :to="'/sub-category/'+product.info.category_sub_id">{{product.info.sub_category_name}}</router-link></li>
                                <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1 active" aria-current="page">{{product.info.name}}</li>
                            </ol>
                        </nav>
                    </div>
                    <!-- End breadcrumb -->
                </div>
            </div>

            <div class="container">
                <div class="mb-14">
                    <div class="row">
                        <div class="col-md-6 col-lg-4 col-xl-5 mb-4 mb-md-0">
                            <div id="sliderSyncingNav" class="js-slick-carousel u-slick mb-2"
                                data-infinite="true"
                                data-arrows-classes="d-none d-lg-inline-block u-slick__arrow-classic u-slick__arrow-centered--y rounded-circle"
                                data-arrow-left-classes="fas fa-arrow-left u-slick__arrow-classic-inner u-slick__arrow-classic-inner--left ml-lg-2 ml-xl-4"
                                data-arrow-right-classes="fas fa-arrow-right u-slick__arrow-classic-inner u-slick__arrow-classic-inner--right mr-lg-2 mr-xl-4"
                                data-nav-for="#sliderSyncingThumb">
                                <div class="js-slide">
                                    <img class="img-fluid" v-if="product.images.big_image1 != null && product.images.big_image1 != undefined" :src="$appUrl+'/images/product/'+product.images.big_image1" :alt="product.info.name">
                                    <img class="img-fluid" v-else src="@/assets/images/product/524X520.jpg" :alt="product.info.name">
                                </div>
                                <div class="js-slide">
                                    <img class="img-fluid" v-if="product.images.big_image2 != null && product.images.big_image2 != undefined" :src="$appUrl+'/images/product/'+product.images.big_image2" :alt="product.info.name">
                                    <img class="img-fluid" v-else src="@/assets/images/product/524X520.jpg" :alt="product.info.name">
                                </div>
                                <div class="js-slide">
                                    <img class="img-fluid" v-if="product.images.big_image3 != null && product.images.big_image3 != undefined" :src="$appUrl+'/images/product/'+product.images.big_image3" :alt="product.info.name">
                                    <img class="img-fluid" v-else src="@/assets/images/product/524X520.jpg" :alt="product.info.name">
                                </div>
                                <div class="js-slide">
                                    <img class="img-fluid" v-if="product.images.big_image4 != null && product.images.big_image4 != undefined" :src="$appUrl+'/images/product/'+product.images.big_image4" :alt="product.info.name">
                                    <img class="img-fluid" v-else src="@/assets/images/product/524X520.jpg" :alt="product.info.name">
                                </div>
                            </div>

                            <div id="sliderSyncingThumb" class="js-slick-carousel u-slick u-slick--slider-syncing u-slick--slider-syncing-size u-slick--gutters-1 u-slick--transform-off"
                                data-infinite="true"
                                data-slides-show="5"
                                data-is-thumbs="true"
                                data-nav-for="#sliderSyncingNav">
                                <div class="js-slide" style="cursor: pointer;">
                                    <img class="img-fluid" v-if="product.images.big_image1 != null && product.images.big_image1 != undefined" :src="$appUrl+'/images/product/'+product.images.big_image1" :alt="product.info.name">
                                    <img class="img-fluid" v-else src="@/assets/images/product/524X520.jpg" :alt="product.info.name">
                                </div>
                                <div class="js-slide" style="cursor: pointer;">
                                    <img class="img-fluid" v-if="product.images.big_image2 != null && product.images.big_image2 != undefined" :src="$appUrl+'/images/product/'+product.images.big_image2" :alt="product.info.name">
                                    <img class="img-fluid" v-else src="@/assets/images/product/524X520.jpg" :alt="product.info.name">
                                </div>
                                <div class="js-slide" style="cursor: pointer;">
                                    <img class="img-fluid" v-if="product.images.big_image3 != null && product.images.big_image3 != undefined" :src="$appUrl+'/images/product/'+product.images.big_image3" :alt="product.info.name">
                                    <img class="img-fluid" v-else src="@/assets/images/product/524X520.jpg" :alt="product.info.name">
                                </div>
                                <div class="js-slide" style="cursor: pointer;">
                                    <img class="img-fluid" v-if="product.images.big_image4 != null && product.images.big_image4 != undefined" :src="$appUrl+'/images/product/'+product.images.big_image4" :alt="product.info.name">
                                    <img class="img-fluid" v-else src="@/assets/images/product/524X520.jpg" :alt="product.info.name">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 col-lg-4 col-xl-4 mb-md-6 mb-lg-0">
                            <div class="mb-2">
                                <router-link :to="'/category/'+product.info.type" class="font-size-12 text-gray-5 mb-2 d-inline-block">{{product.info.category_name}}</router-link>
                                <h2 class="font-size-25 text-lh-1dot2">{{product.info.model}} {{product.info.name}}</h2>
                                <div class="mb-2">
                                    <a class="d-inline-flex align-items-center small font-size-15 text-lh-1" href="#">
                                        <div v-if="product.info.total_rate != null" class="text-warning mr-2">
                                            <small v-for="item in product.info.total_rate" :key="item" class="fas fa-star"></small>
                                            <small v-for="(s, index) in 5 - product.info.total_rate" :key="index" class="far fa-star text-muted"></small>
                                        </div>
                                        <div v-else>
                                            <small v-for="(s, index) in 5" :key="index" class="far fa-star text-muted"></small>
                                        </div>
                                        <span class="text-secondary font-size-13">({{product.review.length}} хэрэглэгч үнэлсэн)</span>
                                    </a>
                                </div>
                                <a href="#" class="d-inline-block max-width-150 ml-n2 mb-2">
                                    <img v-if="product.info.images != null && product.info.images != undefined" class="img-fluid" :src="$appUrl+'/images/brand/'+product.info.images" :alt="product.info.brandname" :style="{'width': '100px', 'height': 'auto'}">
                                    <img v-else class="img-fluid" src="@/assets/images/product/default.png" :alt="product.info.brandname" :style="{'width': '100px', 'height': 'auto'}">
                                </a>
                                <div class="mb-2">
                                    <ul class="font-size-14 pl-3 ml-1 text-gray-110">
                                        <li>{{product.info.brandname}}</li>
                                        <li>{{product.info.model}}</li>
                                        <li>{{product.info.color_name}}</li>
                                        <!-- <li>20 MP Electro and 28 megapixel CMOS rear camera</li> -->
                                    </ul>
                                </div>
                                <p style="font-size: 13px;">Таны захиалга төлбөр төлөгдөж баталгаажсаны дараа <b>ажлын 24 цагийн</b> дотор хүргэгдэнэ.</p>
                                <div class="card p-4 border-width-2 border-color-1 borders-radius-17">
                                    <span style="font-size: 13px;">Энэхүү бүтээгдэхүүнийг худалдаж авснаар танд <b>₮{{Number((product.info.sale_price / 100 ) * product.info.bonus_percent).toLocaleString()}}</b> бонус нэмэгдэнэ. Нэмэгдсэн бонусаа та дараагийн худалдан авалтанд ашиглах боломжтой.</span>
                                </div>
                            </div>
                        </div>

                        <div class="mx-md-auto mx-lg-0 col-md-6 col-lg-4 col-xl-3">
                            <div class="mb-2">
                                <div class="card p-5 border-width-2 border-color-1 borders-radius-17">
                                    <div class="text-gray-9 font-size-14 pb-2 border-color-1 border-bottom mb-3">Боломжит үлдэгдэл:
                                         <span v-if="product.info.remain > 100" class="text-green font-weight-bold">100+</span>
                                         <span v-else class="text-green font-weight-bold">{{product.info.remain}}</span>
                                         <span class="ml-1" style="font-weight: 700;">{{product.info.color_name}}</span>
                                         </div>
                                    <div class="mb-3">
                                        <div v-if="product.info.discount > 0" class="d-flex align-items-baseline">
                                            <ins class="font-size-36 text-decoration-none">₮{{Number(product.info.sale_price * ((100 - product.info.discount) / 100)).toLocaleString()}}</ins>
                                            <del class="font-size-20 ml-2 text-gray-6">₮{{Number(product.info.sale_price).toLocaleString()}}</del>
                                        </div>
                                        <div v-else class="d-flex align-items-baseline">
                                            <ins class="font-size-36 text-decoration-none">₮{{Number(product.info.sale_price).toLocaleString()}}</ins>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <h6 class="font-size-14">Тоо ширхэг</h6>
                                        <!-- Quantity -->
                                        <el-input-number v-model="product.count" :min="1" :max="product.info.remain" size="small"></el-input-number>
                                        <!-- End Quantity -->
                                    </div>
                                    <div class="mb-3">
                                        <h6 class="font-size-14">Өнгөний сонголт</h6>
                                    
                                        <label style="margin-left: 10px; margin-top: 2px;">
                                            <input type="radio" name="test" :value="product.id" class="color-radio" @click="ChangeColor(product.id)" checked>
                                            <img v-if="product.info.image != null && product.info.image != undefined" :src="$appUrl+'/images/product/'+product.info.image" style="width: 50px; height: 50px;" :title="product.info.color_name">
                                            <img v-else src="@/assets/images/product/default.png" style="width: 50px; height: 50px;" :title="product.info.color_name">
                                        </label>
                                        <label v-for="(item, index) in product.other" :key="index" style="margin-left: 10px; margin-top: 2px;">
                                            <input type="radio" name="test" :value="item.id" @click="ChangeColor(item.id)" class="color-radio">
                                            <img :src="$appUrl+'/images/product/'+item.image" style="width: 50px; height: 50px;" :title="item.color_name">
                                        </label>
                                        
                                    </div>
                                    <div class="mb-2 pb-0dot5">
                                        <a href="javascript:;" @click="addCart" class="btn btn-block btn-primary-dark"><i class="ec ec-add-to-cart mr-2 font-size-20"></i> Сагсанд нэмэх</a>
                                    </div>
                                    <div class="mb-3">
                                        <a href="javascript:;" @click="addBuy" class="btn btn-block btn-dark">Худалдаж авах</a>
                                    </div>
                                    <div class="flex-content-center flex-wrap">
                                        <a href="javascript:;" @click="addFav(product.info.id)" class="text-gray-6 font-size-13 mr-2"><i class="ec ec-favorites mr-1 font-size-15"></i> Хадгалах</a>
                                        <a href="javascript:;" @click="addCompare(product.info.id)" class="text-gray-6 font-size-13 ml-2"><i class="ec ec-compare mr-1 font-size-15"></i> Харьцуулах</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="bg-gray-7 pt-6 pb-3 mb-6">
                <div class="container">
                    <div class="js-scroll-nav">
                        <div class="bg-white pt-4 pb-6 px-xl-11 px-md-5 px-4 mb-6 overflow-hidden">
                            <div id="Description" class="mx-md-2">
                                <div class="position-relative mb-6">
                                    <ul class="nav nav-classic nav-tab nav-tab-lg justify-content-xl-center mb-6 flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble border-lg-down-bottom-0 pb-1 pb-xl-0 mb-n1 mb-xl-0">
                                        <li class="nav-item flex-shrink-0 flex-xl-shrink-1 z-index-2">
                                            <a class="nav-link active" href="#Description">
                                                <div class="d-md-flex justify-content-md-center align-items-md-center">
                                                    Нэмэлт тайлбар
                                                </div>
                                            </a>
                                        </li>
                                        <li class="nav-item flex-shrink-0 flex-xl-shrink-1 z-index-2">
                                            <a class="nav-link" href="#Specification">
                                                <div class="d-md-flex justify-content-md-center align-items-md-center">
                                                    Үзүүлэлт
                                                </div>
                                            </a>
                                        </li>
                                        <li class="nav-item flex-shrink-0 flex-xl-shrink-1 z-index-2">
                                            <a class="nav-link" href="#Reviews">
                                                <div class="d-md-flex justify-content-md-center align-items-md-center">
                                                    Үнэлгээ
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="mx-md-4 pt-1">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="pt-lg-8 pt-xl-10">
                                                <h3 class="font-size-18 mb-3" style="font-weight: 700;">{{product.images.title1}}</h3>
                                                <p class="mb-6 font-size-18">{{product.images.desc1}}</p>
                                                <h3 class="font-size-18 mb-3" style="font-weight: 700;">{{product.images.title2}}</h3>
                                                <p class="mb-6 font-size-18">{{product.images.desc2}}</p>
                                                <h3 class="font-size-18 mb-3" style="font-weight: 700;">{{product.images.title3}}</h3>
                                                <p class="mb-6 font-size-18">{{product.images.desc3}}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-6 text-right">
                                            <img class="img-fluid mr-n4 mr-md-n10 mr-xl-n15" v-if="product.images.big_image1 != null && product.images.big_image1 != undefined" :src="$appUrl+'/images/product/'+product.images.big_image1" alt="Image Description">
                                            <img class="img-fluid mr-n4 mr-md-n10 mr-xl-n15" v-else src="@/assets/images/product/524X520.jpg" :alt="product.info.name">
                                        </div>
                                        <div class="col-md-6 text-left">
                                            <img class="img-fluid ml-n4 ml-md-n10 ml-xl-n15" v-if="product.images.big_image4 != null && product.images.big_image4 != undefined"  :src="$appUrl+'/images/product/'+product.images.big_image4" alt="Image Description">
                                            <img class="img-fluid mr-n4 mr-md-n10 mr-xl-n15" v-else src="@/assets/images/product/524X520.jpg" :alt="product.info.name">
                                        </div>
                                        <div class="col-md-6 align-self-center">
                                            <div class="pt-lg-8 pt-xl-10 text-right">
                                                <h3 class="font-size-18 mb-3" style="font-weight: 700;">{{product.images.title4}}</h3>
                                                <p class="mb-6 font-size-18">{{product.images.desc4}}</p>
                                                <h3 class="font-size-18 mb-3" style="font-weight: 700;">{{product.images.title5}}</h3>
                                                <p class="mb-6 font-size-18">{{product.images.desc5}}</p>
                                                <h3 class="font-size-18 mb-3" style="font-weight: 700;">{{product.images.title6}}</h3>
                                                <p class="mb-6 font-size-18">{{product.images.desc6}}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <ul class="nav flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble mt-5">
                                        <li class="nav-item text-gray-111 flex-shrink-0 flex-xl-shrink-1"><strong>Ангилал:</strong> <router-link :to="'/category/'+product.info.type" class="text-blue">{{product.info.category_name}}</router-link></li>
                                        <li class="nav-item text-gray-111 mx-3 flex-shrink-0 flex-xl-shrink-1">/</li>
                                        <li class="nav-item text-gray-111 flex-shrink-0 flex-xl-shrink-1"><strong>Дэд ангилал:</strong> <a href="#" class="text-blue">{{product.info.sub_category_name}}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white py-4 px-xl-11 px-md-5 px-4 mb-6">
                            <div id="Specification" class="mx-md-2">
                                <div class="position-relative mb-6">
                                    <ul class="nav nav-classic nav-tab nav-tab-lg justify-content-xl-center mb-6 flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble border-lg-down-bottom-0 pb-1 pb-xl-0 mb-n1 mb-xl-0">
                                        <li class="nav-item flex-shrink-0 flex-xl-shrink-1 z-index-2">
                                            <a class="nav-link" href="#Description">
                                                <div class="d-md-flex justify-content-md-center align-items-md-center">
                                                    Нэмэлт тайлбар
                                                </div>
                                            </a>
                                        </li>
                                        <li class="nav-item flex-shrink-0 flex-xl-shrink-1 z-index-2">
                                            <a class="nav-link active" href="#Specification">
                                                <div class="d-md-flex justify-content-md-center align-items-md-center">
                                                    Үзүүлэлт
                                                </div>
                                            </a>
                                        </li>
                                        <li class="nav-item flex-shrink-0 flex-xl-shrink-1 z-index-2">
                                            <a class="nav-link" href="#Reviews">
                                                <div class="d-md-flex justify-content-md-center align-items-md-center">
                                                    Үнэлгээ
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="mx-md-5 pt-1">
                                    <h3 class="font-size-18 mb-4">Техникийн үзүүлэлт</h3>
                                    <div class="table-responsive">
                                        <table class="table table-hover">
                                            <tbody>
                                                <tr>
                                                    <th class="px-4 px-xl-5 border-top-0">Brand</th>
                                                    <td class="border-top-0">{{product.info.brandname}}</td>
                                                </tr>
                                                <tr>
                                                    <th class="px-4 px-xl-5">Model</th>
                                                    <td>{{product.info.model}}</td>
                                                </tr>
                                                <tr>
                                                    <th class="px-4 px-xl-5">Color</th>
                                                    <td>{{product.info.color_name}}</td>
                                                </tr>
                                                <tr v-for="(item) in this.checkSpecs()" :key="item">
                                                    <th class="px-4 px-xl-5">{{item}}</th>
                                                    <td>{{product.specs[0][item]}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white py-4 px-xl-11 px-md-5 px-4 mb-6">
                            <div id="Reviews" class="mx-md-2">
                                <div class="position-relative mb-6">
                                    <ul class="nav nav-classic nav-tab nav-tab-lg justify-content-xl-center mb-6 flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble border-lg-down-bottom-0 pb-1 pb-xl-0 mb-n1 mb-xl-0">
                                        <li class="nav-item flex-shrink-0 flex-xl-shrink-1 z-index-2">
                                            <a class="nav-link" href="#Description">
                                                <div class="d-md-flex justify-content-md-center align-items-md-center">
                                                    Нэмэлт тайлбар
                                                </div>
                                            </a>
                                        </li>
                                        <li class="nav-item flex-shrink-0 flex-xl-shrink-1 z-index-2">
                                            <a class="nav-link" href="#Specification">
                                                <div class="d-md-flex justify-content-md-center align-items-md-center">
                                                    Үзүүлэлт
                                                </div>
                                            </a>
                                        </li>
                                        <li class="nav-item flex-shrink-0 flex-xl-shrink-1 z-index-2">
                                            <a class="nav-link active" href="#Reviews">
                                                <div class="d-md-flex justify-content-md-center align-items-md-center">
                                                    Үнэлгээ
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="mb-4 px-lg-4">
                                    <div class="row mb-8">
                                        <div class="col-md-6">
                                            <div class="mb-3">
                                                <h3 class="font-size-18 mb-6">{{product.review.length}} хэрэглэгч үнэлсэн</h3>
                                                <h2 class="font-size-30 font-weight-bold text-lh-1 mb-0">{{this.avgRate()}}</h2>
                                                <div class="text-lh-1">дундаж</div>
                                            </div>

                                            <!-- Ratings -->
                                            <ul class="list-unstyled">
                                                <li class="py-1">
                                                    <a class="row align-items-center mx-gutters-2 font-size-1" href="javascript:;">
                                                        <div class="col-auto mb-2 mb-md-0">
                                                            <div class="text-warning text-ls-n2 font-size-16" style="width: 80px;">
                                                                <small class="fas fa-star"></small>
                                                                <small class="fas fa-star"></small>
                                                                <small class="fas fa-star"></small>
                                                                <small class="fas fa-star"></small>
                                                                <small class="fas fa-star"></small>
                                                            </div>
                                                        </div>
                                                        <div class="col-auto mb-2 mb-md-0">
                                                            <div class="progress ml-xl-5" style="height: 10px; width: 200px;">
                                                                <div class="progress-bar" role="progressbar" :style="{'width': `${this.progressRate(5)}%`}" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-auto text-right">
                                                            <span class="text-gray-90">{{this.checkRate(5)}}</span>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li class="py-1">
                                                    <a class="row align-items-center mx-gutters-2 font-size-1" href="javascript:;">
                                                        <div class="col-auto mb-2 mb-md-0">
                                                            <div class="text-warning text-ls-n2 font-size-16" style="width: 80px;">
                                                                <small class="fas fa-star"></small>
                                                                <small class="fas fa-star"></small>
                                                                <small class="fas fa-star"></small>
                                                                <small class="fas fa-star"></small>
                                                                <small class="far fa-star text-muted"></small>
                                                            </div>
                                                        </div>
                                                        <div class="col-auto mb-2 mb-md-0">
                                                            <div class="progress ml-xl-5" style="height: 10px; width: 200px;">
                                                                <div class="progress-bar" role="progressbar" :style="{'width': `${this.progressRate(4)}%`}" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-auto text-right">
                                                            <span class="text-gray-90">{{this.checkRate(4)}}</span>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li class="py-1">
                                                    <a class="row align-items-center mx-gutters-2 font-size-1" href="javascript:;">
                                                        <div class="col-auto mb-2 mb-md-0">
                                                            <div class="text-warning text-ls-n2 font-size-16" style="width: 80px;">
                                                                <small class="fas fa-star"></small>
                                                                <small class="fas fa-star"></small>
                                                                <small class="fas fa-star"></small>
                                                                <small class="far fa-star text-muted"></small>
                                                                <small class="far fa-star text-muted"></small>
                                                            </div>
                                                        </div>
                                                        <div class="col-auto mb-2 mb-md-0">
                                                            <div class="progress ml-xl-5" style="height: 10px; width: 200px;">
                                                                <div class="progress-bar" role="progressbar" :style="{'width': `${this.progressRate(3)}%`}" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-auto text-right">
                                                            <span class="text-gray-90">{{this.checkRate(3)}}</span>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li class="py-1">
                                                    <a class="row align-items-center mx-gutters-2 font-size-1" href="javascript:;">
                                                        <div class="col-auto mb-2 mb-md-0">
                                                            <div class="text-warning text-ls-n2 font-size-16" style="width: 80px;">
                                                                <small class="fas fa-star"></small>
                                                                <small class="fas fa-star"></small>
                                                                <small class="far fa-star text-muted"></small>
                                                                <small class="far fa-star text-muted"></small>
                                                                <small class="far fa-star text-muted"></small>
                                                            </div>
                                                        </div>
                                                        <div class="col-auto mb-2 mb-md-0">
                                                            <div class="progress ml-xl-5" style="height: 10px; width: 200px;">
                                                                <div class="progress-bar" role="progressbar" :style="{'width': `${this.progressRate(2)}%`}" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-auto text-right">
                                                            <span class="text-gray-90">{{this.checkRate(2)}}</span>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li class="py-1">
                                                    <a class="row align-items-center mx-gutters-2 font-size-1" href="javascript:;">
                                                        <div class="col-auto mb-2 mb-md-0">
                                                            <div class="text-warning text-ls-n2 font-size-16" style="width: 80px;">
                                                                <small class="fas fa-star"></small>
                                                                <small class="far fa-star text-muted"></small>
                                                                <small class="far fa-star text-muted"></small>
                                                                <small class="far fa-star text-muted"></small>
                                                                <small class="far fa-star text-muted"></small>
                                                            </div>
                                                        </div>
                                                        <div class="col-auto mb-2 mb-md-0">
                                                            <div class="progress ml-xl-5" style="height: 10px; width: 200px;">
                                                                <div class="progress-bar" role="progressbar" :style="{'width': `${this.progressRate(1)}%`}" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-auto text-right">
                                                            <span class="text-gray-90">{{this.checkRate(1)}}</span>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                            <!-- End Ratings -->
                                        </div>
                                        <div class="col-md-6">
                                            <h3 class="font-size-18 mb-5">Үнэлгээ өгөх</h3>
                                            <!-- Form -->
                                            <form class="js-validate" @submit.prevent="setReview">
                                                <div class="row align-items-center mb-4">
                                                    <div class="col-md-4 col-lg-3">
                                                        <label for="rating" class="form-label mb-0">Миний үнэлгээ</label>
                                                    </div>
                                                    <div class="col-md-8 col-lg-9">
                                                        <div class="rating left">
                                                            <div v-if="myReview == 0" class="stars right">
                                                                <a class="star rated" @click="HandleRate(1)"></a>
                                                                <a class="star" @click="HandleRate(2)"></a>
                                                                <a class="star" @click="HandleRate(3)"></a>
                                                                <a class="star" @click="HandleRate(4)"></a>
                                                                <a class="star" @click="HandleRate(5)"></a>
                                                            </div>
                                                            <div v-else class="stars right">
                                                                <a v-for="(item, index) in myReview" :key="index" class="star rated" @click="HandleRate(index + 1)"></a>
                                                                <a v-for="(item, index) in 5 - myReview" :key="'a' + index" class="star" @click="HandleRate(myReview + index + 1)"></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="js-form-message form-group mb-3 row">
                                                    <div class="col-md-4 col-lg-3">
                                                        <label for="descriptionTextarea" class="form-label">Сэтгэгдэл</label>
                                                    </div>
                                                    <div class="col-md-8 col-lg-9">
                                                        <textarea class="form-control" rows="3" id="descriptionTextarea"
                                                        data-msg="Please enter your message."
                                                        data-error-class="u-has-error"
                                                        data-success-class="u-has-success" v-model="reviewMessage"></textarea>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="offset-md-4 offset-lg-3 col-auto">
                                                        <button type="submit" class="btn btn-primary-dark btn-wide transition-3d-hover">Илгээх</button>
                                                    </div>
                                                </div>
                                            </form>
                                            <!-- End Form -->
                                        </div>
                                    </div>
                                    <!-- Review -->
                                    <div v-for="(item, index) in product.review.slice(0,3)" :key="index" class="border-bottom border-color-1 pb-4 mb-4">
                                        <!-- Review Rating -->
                                        <div class="d-flex justify-content-between align-items-center text-secondary font-size-1 mb-2">
                                            <div class="text-warning text-ls-n2 font-size-16" style="width: 80px;">
                                                <small v-for="r in item.rate" :key="r" class="fas fa-star"></small>
                                                <small v-for="(s, i) in 5 - item.rate" :key="i" class="far fa-star text-muted"></small>
                                            </div>
                                        </div>
                                        <!-- End Review Rating -->

                                        <p class="text-gray-90">{{item.message}}</p>

                                        <!-- Reviewer -->
                                        <div class="mb-2">
                                            <strong>{{item.name}}</strong>
                                            <span class="font-size-13 text-gray-23">- {{new Date(item.created_at).toDateString()}}</span>
                                        </div>
                                        <!-- End Reviewer -->
                                    </div>
                                    <!-- End Review -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <!-- Related products -->
                <div class="mb-6">
                    <div class="d-flex justify-content-between align-items-center border-bottom border-color-1 flex-lg-nowrap flex-wrap mb-4">
                        <h3 class="section-title mb-0 pb-2 font-size-22">Төстэй бүтээгдэхүүн</h3>
                    </div>
                    <ul class="row list-unstyled products-group no-gutters">
                        <li v-for="(item, index) in related" :key="index" class="col-6 col-md-3 col-xl-2gdot4-only col-wd-2 product-item">
                            <div class="product-item__outer h-100">
                                <div class="product-item__inner px-xl-4 p-3">
                                    <div class="product-item__body pb-xl-2">
                                        <div class="mb-2"><router-link :to="'/category/'+product.info.type" class="font-size-12 text-gray-5">{{product.info.category_name}}</router-link></div>
                                        <h5 class="mb-1 product-item__title"><router-link :to="'/single-product/'" class="text-blue font-weight-bold">{{item.name}}</router-link></h5>
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
                                            <a href="javascript:;" @click="addCompare(item.id)" class="text-gray-6 font-size-13"><i class="ec ec-compare mr-1 font-size-15"></i> Харьцуулах</a>
                                            <a href="javascript:;" @click="addFav(item.id)" class="text-gray-6 font-size-13"><i class="ec ec-favorites mr-1 font-size-15"></i> Хадгалах</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
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
            product: {
                id: 0,
                info: '',
                images: '',
                other: [],
                count: 0,
                specs: null,
                review: []
            },
            myReview: 0,
            reviewMessage: '',
            related: []
        }
    },
    mounted() {
        this.$emit('getJquery');
        this.product.id = this.$route.params.id; 
        this.getProduct();
    },
    beforeRouteUpdate (to, from, next) {
        this.product.id = to.params.id;
        this.product.count = 1;
        this.getProduct();
        next();
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
        addCart() {
            this.$emit('addCart', [this.product.count, this.product.info]);
        },
        async addBuy() {
            await this.$emit('addCart', [this.product.count, this.product.info]);
            this.$router.push('/cart');
        },
        updateRecently() {
            var rec = [];
            let recently = JSON.parse(localStorage.getItem('recently'));
            if(recently) {
                recently.forEach((element, index) => {
                   if(element.id == this.product.info.id) {
                       recently.splice(index, 1);
                   }
                });

                if(recently.length >= 10) {
                    for (let i = recently.length - 1; i > 0; i--) {
                        rec.push(recently[i]);
                    }
                } else {
                    rec = recently;
                    // rec.push(this.product.info);
                }
                rec.push(this.product.info);
                localStorage.recently = JSON.stringify(rec);
            } else {
                rec.push(this.product.info);
                localStorage.recently = JSON.stringify(rec);
            }
        },
        ChangeColor(id) {
            // this.fullscreenLoading = true;
            var rts = this;
            this.$axios({
                method: 'post',
                url: rts.$appUrl +'/api/product/change-product-color',
                headers: {},
                data: {
                    id: id
                }
            }).then(data => {
                // rts.fullscreenLoading = false;
                // rts.product.id = id;
                // rts.product.info.id = id;
                rts.product.info.color_name = data.data.product.color_name;
                rts.product.info.remain = data.data.product.remain;
                rts.product.info.sale_price = data.data.product.sale_price;
                rts.product.info.discount = data.data.product.discount;
            }).then(err => {
                console.log(err);
            });
        },
        setReview() {
            const token = localStorage.getItem('token');
            if(!token) {
                this.$message({
                    message: 'Нэвтэрсэн байх шаардлагатай',
                    type: 'warning'
                });
                this.$router.push('/login');
            } else {
                var rts = this;
                this.$axios({
                    method: 'post',
                    url: rts.$appUrl +'/api/product/add-product-review',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    data: {
                        id: this.product.id,
                        rate: this.myReview,
                        message: this.reviewMessage
                    }
                }).then(data => {
                   rts.reviewMessage = '';
                });
            }
        },
        HandleRate(star) {
            this.myReview = star;
        },
        avgRate() {
            if(this.product.review.length > 0) {
                var sum = 0;
                this.product.review.forEach(element => {
                    sum = sum + element.rate;
                });
                return sum / this.product.review.length.toFixed(1);
            } else {
                return 5;
            }
        },
        checkRate(star) {
            var i = 0;
            this.product.review.forEach(element => {
                if(element.rate == star) {
                    i++;
                }
            });
            return i;
        },
        progressRate(star) {
            var i = 0;
            this.product.review.forEach(element => {
                if(element.rate == star) {
                    i++;
                }
            });
            return parseInt(i * 100 / this.product.review.length);
        },
        checkSpecs() {  

            if(this.product.info.specs != null && this.product.specs != null) {
                return this.product.info.specs.split('#');
            } else {
                return 0;
            }
        },
        getProduct() {
            this.fullscreenLoading = true;
            var rts = this;
            const token = localStorage.getItem('token');
            this.$axios({
                method: 'post',
                url: rts.$appUrl +'/api/product/single-product',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    id: this.product.id
                }
            }).then(data => {
                rts.fullscreenLoading = false;
                if(data.data.result == 'failed') {
                    rts.$router.push('/error-page');
                } else {
                    rts.product.info = data.data.single[0];
                    document.querySelector('head title').textContent = data.data.single[0].model + ' ' +data.data.single[0].name;
                    rts.product.other = data.data.others;
                    if(data.data.images[0] != undefined) {
                        rts.product.images = data.data.images[0]
                    }
                    
                    if(data.data.specs != null) {
                        if(data.data.specs.length > 0) {
                            rts.product.specs = data.data.specs
                        }
                        
                    }
                    rts.product.review = data.data.review;
                    rts.myReview = data.data.my_review;
                    rts.related = data.data.related;
                    rts.updateRecently();
                }
                
            }).catch(err => {
                console.log(err);
                rts.fullscreenLoading = false;
            });
        }
    }
}
</script>