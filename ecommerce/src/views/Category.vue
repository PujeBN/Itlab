<style scoped>
.current-page {
    color: #fff;
    background-color: #393d3e;
}
</style>
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
                                <li class="breadcrumb-item flex-shrink-0 flex-xl-shrink-1 active" aria-current="page">{{category.name}}</li>
                            </ol>
                        </nav>
                    </div>
                    <div class="container">
                        <div class="row mb-8">
                            <div class="d-none d-xl-block col-xl-3 col-wd-2gdot5">
                                <div class="mb-6">
                                    <!-- <div class="border-bottom border-color-1 mb-5">
                                        <h3 class="section-title section-title__sm mb-0 pb-2 font-size-18">Сонголтууд</h3>
                                    </div> -->

                                    <div class="border-bottom pb-1 mb-1">
                                        <div style="position: relative;">
                                            <span class="font-size-14 mb-3 font-weight-bold">Ангилал</span>
                                        </div>
                                        <div class="mt-1"></div>

                                        <div v-for="(item, index) in category.sub" :key="index" class="form-group d-flex align-items-center justify-content-between mb-2 pb-1" style="position: relative;">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" @click="changeSub(item.id)" :id="'sub'+item.sub_category_name" :ref="'sub'+item.id">
                                                <label class="custom-control-label" :for="'sub'+item.sub_category_name">{{item.sub_category_name}}</label>
                                            </div>
                                            <span class="text-gray-25 font-size-12 font-weight-normal" style="position: absolute; right: 0;">{{item.total}}</span>
                                        </div>
                                    </div>

                                    <div class="border-bottom pb-1 mb-1">
                                        <div style="position: relative;">
                                            <span class="font-size-14 mb-3 font-weight-bold">Брэнд</span>

                                            <a class="link link-collapse small font-size-13 text-gray-27 d-inline-flex" v-if="category.brand.length > 0" data-toggle="collapse" href="#collapseBrand" role="button" aria-expanded="false" aria-controls="collapseBrand" style="position: absolute; right: 0;">
                                                <span class="link-collapse__default"> <i class="el-icon-arrow-down"></i></span>
                                                <span class="link-collapse__active"> <i class="el-icon-arrow-up"></i></span>
                                            </a>
                                        </div>
                                        <div class="mt-1"></div>

                                        <div v-if="category.brand.length > 0" class="collapse" id="collapseBrand">
                                            <div v-for="(item, index) in category.brand.slice(0,category.brand.length)" :key="index" class="form-group d-flex align-items-center justify-content-between mb-1 pb-0" style="position: relative;">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" @click="changeBrand(item.id)" :id="'nav-brand'+item.brandname" :ref="'nav-brand'+item.id">
                                                    <label class="custom-control-label" :for="'nav-brand'+item.brandname">{{item.brandname}}</label>
                                                </div>
                                                <span class="text-gray-25 font-size-12 font-weight-normal" style="position: absolute; right: 0;">{{item.total}}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="border-bottom pb-1 mb-1" v-for="(main, index) in spec.list" :key="index">
                                        <div style="position: relative;">
                                            <span class="font-size-14 mb-1 font-weight-bold">{{main.replace('_', ' ')}}</span>

                                            <a class="link link-collapse small font-size-13 text-gray-27 d-inline-flex" v-if="spec.parametrs[main].length > 0" data-toggle="collapse" :href="'#collapseSpec' + main" role="button" aria-expanded="false" aria-controls="collapseBrand" style="position: absolute; right: 0;">
                                                <span class="link-collapse__default"> <i class="el-icon-arrow-down"></i></span>
                                                <span class="link-collapse__active"> <i class="el-icon-arrow-up"></i></span>
                                            </a>
                                        </div>
                                        <div class="mt-1"></div>
                                        <!-- <div v-for="(item, index) in spec.parametrs[main].slice(0,0)" :key="index" class="form-group d-flex align-items-center justify-content-between mb-2 pb-1" style="position: relative;">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" @click="changeSpec(main, item.name)" :id="'nav-spec'+item.name" :ref="'nav-spec'+item.name">
                                                <label class="custom-control-label" :for="'nav-spec'+item.name">{{item.name}}</label>
                                            </div>
                                            <span class="text-gray-25 font-size-12 font-weight-normal" style="position: absolute; right: 0;">{{item.total}}</span>
                                        </div> -->

                                        <div v-if="spec.parametrs[main].length > 0" class="collapse" :id="'collapseSpec' + main">
                                            <div v-for="(item, index) in spec.parametrs[main].slice(0,spec.parametrs[main].length)" :key="index" class="form-group d-flex align-items-center justify-content-between mb-1 pb-0" style="position: relative;">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" @click="changeSpec(main, item.name)" :id="'nav-spec'+item.name" :ref="'nav-spec'+item.name">
                                                    <label class="custom-control-label" :for="'nav-spec'+item.name">{{item.name}}</label>
                                                </div>
                                                <span class="text-gray-25 font-size-12 font-weight-normal" style="position: absolute; right: 0;">{{item.total}}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="border-bottom pb-1 mb-1">
                                        <div style="position: relative;">
                                            <span class="font-size-14 mb-3 font-weight-bold">Өнгө</span>

                                            <a class="link link-collapse small font-size-13 text-gray-27 d-inline-flex" v-if="category.color.length > 0" data-toggle="collapse" href="#collapseColor" role="button" aria-expanded="false" aria-controls="collapseColor" style="position: absolute; right: 0;">
                                                <span class="link-collapse__default"> <i class="el-icon-arrow-down"></i></span>
                                                <span class="link-collapse__active"> <i class="el-icon-arrow-up"></i></span>
                                            </a>
                                            
                                        </div>
                                        <div class="mt-1"></div>

                                        <div v-if="category.color.length > 5" class="collapse" id="collapseColor">
                                            <div v-for="(item, index) in category.color.slice(0, category.color.length)" :key="index" class="form-group d-flex align-items-center justify-content-between mb-1 pb-0" style="position: relative;">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" @click="changeColor(item.color_name)" :id="'nav-color'+item.color_name" :ref="'nav-color'+item.color_name">
                                                    <label class="custom-control-label" :for="'nav-color'+item.color_name">{{item.color_name}}</label>
                                                </div>
                                                <span class="text-gray-25 font-size-12 font-weight-normal" style="position: absolute; right: 0;">{{item.total}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="range-slider">
                                        <h4 class="font-size-14 mb-1 font-weight-bold">Үнэ</h4>
                                        
                                       <div class="block">
                                            <el-slider
                                            v-model="price.range"
                                            input-size="mini"
                                            range
                                            @change="changedPriceLimit"
                                            :max="price.max">
                                            </el-slider>
                                        </div>
                                        
                                        <div class="mt-1 text-gray-111 d-flex mb-4">
                                            <span class="mr-0dot5">Үнэ: </span>
                                            <span>₮</span>
                                            <span id="rangeSliderExample3MinResult" class="">{{Number(price.range[0]).toLocaleString()}}</span>
                                            <span class="mx-0dot5"> — </span>
                                            <span>₮</span>
                                            <span id="rangeSliderExample3MaxResult" class="">{{Number(price.range[1]).toLocaleString()}}</span>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="mb-8">
                                    <div class="border-bottom border-color-1 mb-5">
                                        <h3 class="section-title section-title__sm mb-0 pb-2 font-size-18">Сүүлд үзсэн</h3>
                                    </div>
                                    <ul class="list-unstyled">
                                        <li v-for="(item, index) in recently.slice(0,5)" :key="index" class="mb-4">
                                            <div class="row">
                                                <div class="col-auto">
                                                    <router-link :to="'/single-product/'+item.id" class="d-block width-75">
                                                        <img class="img-fluid" :src="$appUrl+'/images/product/'+item.image" :alt="item.name">
                                                    </router-link>
                                                </div>
                                                <div class="col">
                                                    <h3 class="text-lh-1dot2 font-size-14 mb-0"><router-link :to="'/single-product/'+item.id">{{item.model}} {{item.name}}</router-link></h3>
                                                    <div class="text-warning text-ls-n2 font-size-16 mb-1" style="width: 80px;">
                                                        <small class="fas fa-star"></small>
                                                        <small class="fas fa-star"></small>
                                                        <small class="fas fa-star"></small>
                                                        <small class="fas fa-star"></small>
                                                        <small class="fas fa-star"></small>
                                                    </div>
                                                     
                                                    <div v-if="item.discount > 0" class="font-weight-bold">
                                                        <del class="font-size-11 text-gray-9 d-block">₮{{Number(item.sale_price).toLocaleString()}}</del>
                                                        <ins class="font-size-15 text-red text-decoration-none d-block">₮{{Number(item.sale_price * ((100 - item.discount) / 100)).toLocaleString()}}</ins>
                                                    </div>
                                                    <div v-else class="font-weight-bold">
                                                        <ins class="font-size-15 text-decoration-none d-block">₮{{Number(item.sale_price).toLocaleString()}}</ins>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-xl-9 col-wd-9gdot5">
                                <div class="bg-gray-1 flex-center-between borders-radius-9 py-1">
                                    <div class="d-xl-none">
                                        
                                        <a id="sidebarNavToggler1" class="btn btn-sm py-1 font-weight-normal" href="javascript:;" role="button"
                                            aria-controls="sidebarContent1"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            data-unfold-event="click"
                                            data-unfold-hide-on-scroll="false"
                                            data-unfold-target="#sidebarContent1"
                                            data-unfold-type="css-animation"
                                            data-unfold-animation-in="fadeInLeft"
                                            data-unfold-animation-out="fadeOutLeft"
                                            data-unfold-duration="500">
                                            <i class="fas fa-sliders-h"></i> <span class="ml-1">Сонголтууд</span>
                                        </a>
                                        
                                    </div>
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
                                            <li v-for="(item, index) in category.product" :key="index" class="col-6 col-md-3 col-wd-2gdot4 product-item" v-bind:class="{'remove-divider-wd': (index + 1) % 5 == 0 || (index + 1) == category.product.length}">
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
                                            <li v-for="(item, index) in category.product" :key="index" class="product-item remove-divider">
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
                                                                <a href="javascript:;" @click="addFav(item.id)" class="text-gray-6 font-size-12"><i class="ec ec-favorites font-size-15"></i> Хадгалах</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <nav v-if="page.total > 1" class="d-md-flex justify-content-between align-items-center border-top pt-3 mb-5" aria-label="Page navigation example">
                                    <div class="text-center text-md-left mb-3 mb-md-0"></div>
                                    <ul class="pagination mb-0 pagination-shop justify-content-center justify-content-md-start">
                                        <li v-for="(item) in page.total" :key="item" class="page-item"><a class="page-link" v-bind:class="{'current-page': item == page.current}" @click="changePage(item)" href="javascript:;">{{item}}</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <aside id="sidebarContent1" class="u-sidebar u-sidebar--left" aria-labelledby="sidebarNavToggler1">
            <div class="u-sidebar__scroller">
                <div class="u-sidebar__container">
                    <div class="">
                        <div class="d-flex align-items-center pt-3 px-4 bg-white">
                            <button type="button" class="close ml-auto"
                                aria-controls="sidebarContent1"
                                aria-haspopup="true"
                                aria-expanded="false"
                                data-unfold-event="click"
                                data-unfold-hide-on-scroll="false"
                                data-unfold-target="#sidebarContent1"
                                data-unfold-type="css-animation"
                                data-unfold-animation-in="fadeInLeft"
                                data-unfold-animation-out="fadeOutLeft"
                                data-unfold-duration="500">
                                <span aria-hidden="true"><i class="ec ec-close-remove"></i></span>
                            </button>
                        </div>

                        <!-- Content -->
                        <div class="js-scrollbar u-sidebar__body">
                            <div class="u-sidebar__content u-header-sidebar__content px-4">
                                <div class="mb-6">
                                    <!-- <div class="border-bottom border-color-1 mb-5">
                                        <h3 class="section-title section-title__sm mb-0 pb-2 font-size-18">Сонголтууд</h3>
                                    </div> -->

                                    <div class="border-bottom pb-1 mb-1">
                                        <div style="position: relative;">
                                            <span class="font-size-14 mb-3 font-weight-bold">Ангилал</span>
                                        </div>
                                        <div class="mt-1"></div>

                                        <div v-for="(item, index) in category.sub" :key="index" class="form-group d-flex align-items-center justify-content-between mb-2 pb-1" style="position: relative;">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" @click="changeSub(item.id)" :id="'sub'+item.sub_category_name" :ref="'sub'+item.id">
                                                <label class="custom-control-label" :for="'sub'+item.sub_category_name">{{item.sub_category_name}}</label>
                                            </div>
                                            <span class="text-gray-25 font-size-12 font-weight-normal" style="position: absolute; right: 0;">{{item.total}}</span>
                                        </div>
                                    </div>

                                    <div class="border-bottom pb-1 mb-1">
                                        <div style="position: relative;">
                                            <span class="font-size-14 mb-3 font-weight-bold">Брэнд</span>

                                            <a class="link link-collapse small font-size-13 text-gray-27 d-inline-flex" v-if="category.brand.length > 0" data-toggle="collapse" href="#collapseBrand" role="button" aria-expanded="false" aria-controls="collapseBrand" style="position: absolute; right: 0;">
                                                <span class="link-collapse__default"> <i class="el-icon-arrow-down"></i></span>
                                                <span class="link-collapse__active"> <i class="el-icon-arrow-up"></i></span>
                                            </a>
                                            <!-- End View More - Collapse -->
                                        </div>
                                        <div class="mt-1"></div>

                                        <div v-if="category.brand.length > 0" class="collapse" id="collapseBrand">
                                            <div v-for="(item, index) in category.brand.slice(0,category.brand.length)" :key="index" class="form-group d-flex align-items-center justify-content-between mb-1 pb-0" style="position: relative;">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" @click="changeBrand(item.id)" :id="'brand'+item.brandname" :ref="'brand'+item.id">
                                                    <label class="custom-control-label" :for="'brand'+item.brandname">{{item.brandname}}</label>
                                                </div>
                                                <span class="text-gray-25 font-size-12 font-weight-normal" style="position: absolute; right: 0;">{{item.total}}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="border-bottom pb-1 mb-1">
                                        <div style="position: relative;">
                                            <span class="font-size-14 mb-3 font-weight-bold">Өнгө</span>

                                            <a class="link link-collapse small font-size-13 text-gray-27 d-inline-flex" v-if="category.color.length > 0" data-toggle="collapse" href="#collapseColor" role="button" aria-expanded="false" aria-controls="collapseColor" style="position: absolute; right: 0;">
                                                <span class="link-collapse__default"> <i class="el-icon-arrow-down"></i></span>
                                                <span class="link-collapse__active"> <i class="el-icon-arrow-up"></i></span>
                                            </a>
                                            <!-- End View More - Collapse -->
                                        </div>
                                        <div class="mt-1"></div>

                                        <div v-if="category.color.length > 0" class="collapse" id="collapseColor">
                                            <div v-for="(item, index) in category.color.slice(0, category.color.length)" :key="index" class="form-group d-flex align-items-center justify-content-between mb-1 pb-0" style="position: relative;">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" @click="changeColor(item.color_name)" :id="'color'+item.color_name" :ref="'color'+item.color_name">
                                                    <label class="custom-control-label" :for="'color'+item.color_name">{{item.color_name}}</label>
                                                </div>
                                                <span class="text-gray-25 font-size-12 font-weight-normal" style="position: absolute; right: 0;">{{item.total}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="range-slider">
                                        <h4 class="font-size-14 mb-1 font-weight-bold">Үнэ</h4>
                                        <!-- Range Slider -->
                                       <div class="block">
                                            <el-slider
                                            v-model="price.range"
                                            input-size="mini"
                                            range
                                            @change="changedPriceLimit"
                                            :max="price.max">
                                            </el-slider>
                                        </div>
                                        <!-- End Range Slider -->
                                        <div class="mt-1 text-gray-111 d-flex mb-4">
                                            <span class="mr-0dot5">Үнэ: </span>
                                            <span>₮</span>
                                            <span id="rangeSliderExample3MinResult" class="">{{Number(price.range[0]).toLocaleString()}}</span>
                                            <span class="mx-0dot5"> — </span>
                                            <span>₮</span>
                                            <span id="rangeSliderExample3MaxResult" class="">{{Number(price.range[1]).toLocaleString()}}</span>
                                        </div>
                                        <!-- <button type="button" @click="filter" class="btn px-4 btn-primary-dark-w py-2 rounded-lg">Шүүх</button> -->
                                    </div>
                                </div>
                                <div class="mb-6">
                                    <div class="border-bottom border-color-1 mb-5">
                                        <h3 class="section-title section-title__sm mb-0 pb-2 font-size-18">Сүүлд үзсэн</h3>
                                    </div>
                                    <ul class="list-unstyled">
                                        <li v-for="(item, index) in recently.slice(0,5)" :key="index" class="mb-4">
                                            <div class="row">
                                                <div class="col-auto">
                                                    <router-link :to="'/single-product/'+item.id" class="d-block width-75">
                                                        <img class="img-fluid" :src="$appUrl+'/images/product/'+item.image" :alt="item.name">
                                                    </router-link>
                                                </div>
                                                <div class="col">
                                                    <h3 class="text-lh-1dot2 font-size-14 mb-0"><router-link :to="'/single-product/'+item.id">{{item.model}} {{item.name}}</router-link></h3>
                                                    <div class="text-warning text-ls-n2 font-size-16 mb-1" style="width: 80px;">
                                                        <small class="fas fa-star"></small>
                                                        <small class="fas fa-star"></small>
                                                        <small class="fas fa-star"></small>
                                                        <small class="fas fa-star"></small>
                                                        <small class="fas fa-star"></small>
                                                    </div>
                                                     <!--₮{{Number(item.sale_price * ((100 - item.discount) / 100)).toLocaleString()}}  -->
                                                    <div v-if="item.discount > 0" class="font-weight-bold">
                                                        <del class="font-size-11 text-gray-9 d-block">₮{{Number(item.sale_price).toLocaleString()}}</del>
                                                        <ins class="font-size-15 text-red text-decoration-none d-block">₮{{Number(item.sale_price * ((100 - item.discount) / 100)).toLocaleString()}}</ins>
                                                    </div>
                                                    <div v-else class="font-weight-bold">
                                                        <ins class="font-size-15 text-decoration-none d-block">₮{{Number(item.sale_price).toLocaleString()}}</ins>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!-- End Content -->
                    </div>
                </div>
            </div>
        </aside>
        <Brands />
    </div>
</template>
<script>
import Brands from "@/components/brands";
export default {
    components: {
        Brands
    },
    created() {
        var r = JSON.parse(localStorage.getItem('recently'));
        if(r != null ) {
            for (let i = r.length - 1; i >= 0; i--) {
                this.recently.push(r[i]); 
                
            }
        }
    },
    data() {
        return {
            search: false,
            recently: [],
            fullscreenLoading: false,
            category: {
                id: 0,
                product: [],
                brand: [],
                color: [],
                sub: [],
                name: ''
            },
            page: {
                current: 1,
                total: 0
            },
            spec: {
                list: [],
                paramaters: []
            },
            selected: {
                brand: [],
                color: [],
                sub: [],
                spec: [],
                params: []
            },
            price: {
                range: [0,0],
                max: 0
            }
        }
    },
    mounted() {
        this.$emit('getJquery');
        this.category.id = this.$route.params.id; 
        this.getProducts();
    },
    beforeRouteUpdate (to, from, next) {
        this.page.current = 1;
        this.category.brand.forEach(element => {
            if(this.$refs['brand'+element.id][0].checked) {
                this.$refs['brand'+element.id][0].checked = false;
            }
        });

        this.category.color.forEach(element => {
            if(this.$refs['color'+element.color_name][0].checked) {
                this.$refs['color'+element.color_name][0].checked = false;
            }
        });
        this.search = false;
        this.category.id = to.params.id;
        this.page.current = 1;
        this.selected.brand = [];
        this.selected.sub = [];
        this.selected.color = [];
        this.spec.list = [];
        this.spec.parametrs = [];
        this.price.range = [0,0]
        this.getProducts();
        next();
    },
    methods: {
        changedPriceLimit() {
            this.filter();
        },
        addCompare(item) {
            this.$emit('addCompare', item);
        },
        addFav(item) {
            this.$emit('addFavourite', item);
        },
        cart(item) {
            this.$emit('addCart', [1, item]);
        },
        changeBrand(id) {
            let ex = this.selected.brand.some(function(field) {
                return field == id
            });

            if(ex) {
                this.selected.brand.forEach((element, index) => {
                    if(element == id) {
                        this.selected.brand.splice(index, 1);
                    }
                });
            } else {
                this.selected.brand.push(id);
            }

            this.filter();
        },
        changeSub(id) {
            let ex = this.selected.sub.some(function(field) {
                return field == id
            });

            if(ex) {
                this.selected.sub.forEach((element, index) => {
                    if(element == id) {
                        this.selected.sub.splice(index, 1);
                    }
                });
            } else {
                this.selected.sub.push(id);
            }

            this.filter();
        },
        changeColor(color) {
            let ex = this.selected.color.some(function(field) {
                return field == color
            });

            if(ex) {
                this.selected.color.forEach((element, index) => {
                    if(element == color) {
                        this.selected.color.splice(index, 1);
                    }
                });
            } else {
                this.selected.color.push(color);
            }
            this.filter();
        },
        filter() {
            this.page.current = 1;
            this.search = true;
            this.getProducts();
        },
        changePage(index) {
            this.page.current = index;
            this.getProducts();
        },
        changeSpec(main, item) {
            if(this.selected.spec.includes(main)) {
                let ex = this.selected.params[main].some(function(field) {
                    return field == item
                });
                
                if(ex) {
                    this.selected.params[main].forEach((element, index) => {
                        if(element == item) {
                            this.selected.params[main].splice(index, 1);
                        }
                    });

                    if(this.selected.params[main].length <= 0) {
                        this.selected.spec.forEach((el, index) => {
                            if(el == main) {
                                this.selected.spec.splice(index, 1);
                            }
                        });
                    }
                } else {
                    this.selected.params[main].push(item);
                }
            } else {
                this.selected.spec.push(main);
                this.selected.params[main] = [];
                this.selected.params[main].push(item);
            }
            this.filter();
        },
        buildSpecs(params) {
            var p = [];
            this.spec.list.forEach(el => {                
                p[el] = [];
            });
            this.spec.list.forEach(el => {                
                params.forEach(el2 => {
                    var ch = false
                    p[el].forEach(s => {
                        if(s.name == el2[el]) {
                            s.total++;
                            ch = true;
                        }
                    });
                    if(!ch) {
                        if(el2[el] != '-') {
                            p[el].push({name: el2[el], total: 1});
                        }
                    }
                });
            });
            this.spec.parametrs = p;
        },
        getProducts() {

            var p = '';
            if(this.selected.spec.length > 0) {
                this.selected.spec.forEach(el => {
                    var p1 = '';
                    this.selected.params[el].forEach(els => {
                        if(p1 == '') {
                            p1 = `'${els}'`;
                        } else {
                            p1 += `, '${els}'`;
                        }
                    });

                    if(p == '') {
                        p = ` ${el} in (${p1})`
                    } else {
                        p += ` AND ${el} in (${p1})`
                    }
                });
            }
            var rts = this;
            // this.fullscreenLoading = true;
            this.$axios({
                method: 'post',
                url: rts.$appUrl +'/api/product/category-product',
                headers: {},
                data: {
                    id: this.category.id,
                    page: this.page.current,
                    brand: this.selected.brand,
                    sub: this.selected.sub,
                    color: this.selected.color,
                    price: this.price.range,
                    specs: p
                }
            }).then(data => {
                // rts.fullscreenLoading = false;
                if(data.data.result == 'success') {
                    rts.page.total = data.data.pagination;
                    rts.category.product = data.data.product;
                    rts.category.brand = data.data.brand;
                    rts.category.sub = data.data.sub;
                    rts.category.color = data.data.color;
                    if(rts.search == false) {
                        rts.price.max = data.data.max;
                        rts.price.range = [rts.price.range[0],data.data.max];
                    }
                    if (data.data.spcs.length > 0) {
                        rts.spec.list = data.data.spcs;
                        rts.buildSpecs(data.data.specs);
                    }
                    rts.category.name = data.data.category;
                    document.querySelector('head title').textContent = data.data.category;
                } else {
                    rts.$router.push('/error-page');
                }
            });
        }
    }
}
</script>