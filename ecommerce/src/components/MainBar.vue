<style scoped>
.backtop {
  opacity: 1;
  transform: rotate(180deg);
  color: #393d3e;
}
</style>
<template>
    <header id="header" class="u-header u-header-left-aligned-nav">
        <div class="u-header__section">
            <div class="u-header-topbar py-2 d-none d-xl-block">
                    <div class="container">
                        <div class="d-flex align-items-center">
                            <div class="topbar-left">
                                <a href="#" class="text-gray-110 font-size-13 hover-on-dark">ITLAB ДЭЛГҮҮРТ ТАВТАЙ МОРИЛНО УУ</a>
                            </div>
                            <div class="topbar-right ml-auto">
                                <ul class="list-inline mb-0">
                                    <li class="list-inline-item mr-0 u-header-topbar__nav-item u-header-topbar__nav-item-border">
                                        <router-link to="/contact" class="u-header-topbar__nav-link"><i class="ec ec-map-pointer mr-1"></i> Дэлгүүрийн байршил</router-link>
                                    </li>
                                    <li class="list-inline-item mr-0 u-header-topbar__nav-item u-header-topbar__nav-item-border">
                                        <router-link to="/track-order" class="u-header-topbar__nav-link"><i class="ec ec-transport mr-1"></i> Захиалга хянах</router-link>
                                    </li>
                                    <li v-if="user != null" class="list-inline-item mr-0 u-header-topbar__nav-item u-header-topbar__nav-item-border u-header-topbar__nav-item-no-border u-header-topbar__nav-item-border-single">
                                        <el-dropdown  trigger="click">
                                        <span class="el-dropdown-link" :style="{'font-size': '13px', 'cursor': 'pointer'}">
                                            Сайн уу, {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item>
                                                <span @click="toProfile" class="active"><i class="far fa-user-circle"></i> Миний булан</span>
                                            </el-dropdown-item>
                                            <el-dropdown-item divided>
                                                <span class=""  @click="Logout"><i class="fas fa-sign-out-alt" title="Logout"></i> Гарах</span>
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                        </el-dropdown>
                                    </li>
                                    <li v-else class="list-inline-item mr-0 u-header-topbar__nav-item u-header-topbar__nav-item-border">
                                        <!-- Account Sidebar Toggle Button -->
                                        <router-link id="sidebarNavToggler" to="/login" role="button" class="u-header-topbar__nav-link">
                                            <i class="ec ec-user mr-1"></i> Нэвтрэх <span class="text-gray-50"> | </span> Бүртгүүлэх
                                        </router-link>
                                        <!-- End Account Sidebar Toggle Button -->
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        <div class="py-2 py-xl-4 bg-primary-down-lg">
                    <div class="container my-0 dot5 my-xl-0">
                        <div class="row align-items-center">
                            <!-- Logo-offcanvas-menu -->
                            <div class="col-auto">
                                <!-- Nav -->
                                <nav class="navbar navbar-expand u-header__navbar py-0 justify-content-xl-between max-width-270 min-width-270">
                                    <!-- Logo -->
                                    <router-link class="order-1 order-xl-0 navbar-brand u-header__navbar-brand u-header__navbar-brand-center" to="/home" aria-label="Electro">
                                        <div style="width: 120px; position: relative;">
                                            <img src="@/assets/images/logo/itlab.png" style="width: 100%; height: auto;">
                                        </div>
                                    </router-link>

                                    <!-- Fullscreen Toggle Button -->
                                    <button id="sidebarHeaderInvokerMenu" type="button" class="navbar-toggler d-block btn u-hamburger mr-3 mr-xl-0"
                                        aria-controls="sidebarHeader"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        data-unfold-event="click"
                                        data-unfold-hide-on-scroll="false"
                                        data-unfold-target="#sidebarHeader1"
                                        data-unfold-type="css-animation"
                                        data-unfold-animation-in="fadeInLeft"
                                        data-unfold-animation-out="fadeOutLeft"
                                        data-unfold-duration="500">
                                        <span id="hamburgerTriggerMenu" class="u-hamburger__box">
                                            <span class="u-hamburger__inner"></span>
                                        </span>
                                    </button>
                                    <!-- End Fullscreen Toggle Button -->
                                </nav>
                                <!-- End Nav -->

                                <!-- ========== HEADER SIDEBAR ========== -->
                                <aside id="sidebarHeader1" class="u-sidebar u-sidebar--left" aria-labelledby="sidebarHeaderInvokerMenu">
                                    <div class="u-sidebar__scroller">
                                        <div class="u-sidebar__container">
                                            <div class="u-header-sidebar__footer-offset pb-0">
                                                <!-- Toggle Button -->
                                                <div class="position-absolute top-0 right-0 z-index-2 pt-4 pr-7">
                                                    <button type="button" class="close ml-auto"
                                                        aria-controls="sidebarHeader"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                        data-unfold-event="click"
                                                        data-unfold-hide-on-scroll="false"
                                                        data-unfold-target="#sidebarHeader1"
                                                        data-unfold-type="css-animation"
                                                        data-unfold-animation-in="fadeInLeft"
                                                        data-unfold-animation-out="fadeOutLeft"
                                                        data-unfold-duration="500">
                                                        <span aria-hidden="true"><i class="ec ec-close-remove text-gray-90 font-size-20"></i></span>
                                                    </button>
                                                </div>
                                                <!-- End Toggle Button -->

                                                <!-- Content -->
                                                <div class="js-scrollbar u-sidebar__body" :style="{'z-index': '-1'}">
                                                    <div id="headerSidebarContent" class="u-sidebar__content u-header-sidebar__content">
                                                        <!-- Logo -->
                                                        <router-link class="order-1 order-xl-0 navbar-brand u-header__navbar-brand u-header__navbar-brand-center" to="/home" aria-label="Electro">
                                                            <div style="width: 120px; position: relative;">
                                                                <img src="@/assets/images/logo/itlab.png" style="width: 100%; height: auto;">
                                                            </div>
                                                        </router-link>
                                                        <!-- End Logo -->

                                                        <!-- List -->
                                                        <ul id="headerSidebarList" class="u-header-collapse__nav">
                                                            <!-- Home Section -->
                                                            <li v-for="(item, index) in categories" :key="index" class="u-has-submenu u-header-collapse__submenu">
                                                                <a class="u-header-collapse__nav-link u-header-collapse__nav-pointer" href="javascript:;" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="headerSidebarHomeCollapse" :data-target="'#headerSidebarHomeCollapse'+index">
                                                                    {{item.category_name}}
                                                                </a>

                                                                <div :id="'headerSidebarHomeCollapse' + index" class="collapse" data-parent="#headerSidebarContent">
                                                                    <ul id="headerSidebarHomeMenu" class="u-header-collapse__nav-list">
                                                                        <!-- Home - v1 -->
                                                                        <li><router-link class="u-header-sidebar__sub-menu-title" :to="'/category/'+item.id">{{item.category_name}}</router-link></li>
                                                                        <li v-for="(sub, i) in filterSub(item.id)" :key="i"><router-link class="u-header-collapse__submenu-nav-link" :to="'/sub-category/'+sub.id">{{sub.sub_category_name}}</router-link></li>
                                                                        <!-- End 404 -->
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                        <!-- End List -->
                                                    </div>
                                                </div>
                                                <!-- End Content -->
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                                <!-- ========== END HEADER SIDEBAR ========== -->
                            </div>
                            <!-- End Logo-offcanvas-menu -->
                            <!-- Primary Menu -->
                            <div class="col d-none d-xl-block">
                                <!-- Nav -->
                                <nav class="js-mega-menu navbar navbar-expand-md u-header__navbar u-header__navbar--no-space">
                                    <!-- Navigation -->
                                    <div id="navBar" class="collapse navbar-collapse u-header__navbar-collapse">
                                        <ul class="navbar-nav u-header__navbar-nav">
                                            <li class="nav-item u-header__nav-item">
                                                <router-link class="nav-link u-header__nav-link" to="/top-20" aria-haspopup="true" aria-expanded="false" aria-labelledby="pagesSubMenu">Best seller</router-link>
                                            </li>

                                            <!-- Featured Brands -->
                                            <li class="nav-item u-header__nav-item">
                                                <router-link class="nav-link u-header__nav-link" to="/trend" aria-haspopup="true" aria-expanded="false" aria-labelledby="pagesSubMenu">Трэнд бүтээгдэхүүн</router-link>
                                            </li>
                                            <!-- End Featured Brands -->

                                            <!-- Trending Styles -->
                                            <li class="nav-item u-header__nav-item">
                                                <router-link class="nav-link u-header__nav-link text-sale" to="/new-arrival" aria-haspopup="true" aria-expanded="false" aria-labelledby="blogSubMenu">Шинэ</router-link>
                                            </li>
                                            
                                            <li class="nav-item u-header__nav-item">
                                                <router-link class="nav-link u-header__nav-link" to="/brands" aria-haspopup="true" aria-expanded="false" aria-labelledby="blogSubMenu">Брэндүүд</router-link>
                                            </li>

                                            <!-- Gift Cards -->
                                            <!-- <li class="nav-item u-header__nav-item">
                                                <a class="nav-link u-header__nav-link" href="javascript:;" @click="goBonus" aria-haspopup="true" aria-expanded="false">{{checkBonus()}}</a>
                                            </li> -->
                                            <li class="nav-item u-header__nav-item mr-1" v-for="(items, index) in hashtags" :key="index+'tag'">
                                                <router-link :to="'/event/'+items.id" class="nav-link u-header__nav-link" href="javascript:;" aria-haspopup="true" aria-expanded="false"
                                                :style="{'border': '1px solid grey', 'padding': '0', 'padding-left': '10px', 'padding-right': '10px', 'border-radius': '3px', 'background': '#e3fd38', 'text-transform': 'uppercase', 'position': 'relative'}">
                                                    <span>#{{items.event_name}}</span>
                                                </router-link>
                                            </li>
                                            
                                            <!-- <li class="nav-item u-header__nav-last-item">
                                                <a class="text-gray-90" href="javascript:;" @click="goBonus">
                                                    <strong>{{checkBonus()}}</strong>
                                                </a>
                                            </li> -->
                                        </ul>
                                    </div>
                                    <!-- End Navigation -->
                                </nav>
                                <!-- End Nav -->
                            </div>
                            
                            <div class="d-none d-xl-block col-md-auto">
                                <div class="d-flex">
                                    <i class="ec ec-support font-size-50 text-primary"></i>
                                    <div class="ml-2">
                                        <div class="phone">
                                            <strong>Тусламж</strong> <a href="tel:800856800604" class="text-gray-90">(+976) 7511 7733</a>
                                        </div>
                                        <div class="email">
                                            Имэйл: <a href="mailto:info@electro.com?subject=Help Need" class="text-gray-90">support@itlab.mn</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="d-xl-none col col-xl-auto text-right text-xl-left pl-0 pl-xl-3 position-static">
                                <div class="d-inline-flex">
                                    <ul class="d-flex list-unstyled mb-0 align-items-center">
                                        <!-- Search -->
                                        <li class="col d-xl-none px-2 px-sm-3 position-static">
                                            <el-tooltip class="item" effect="dark" content="Хайлт" placement="top">
                                            <el-dropdown trigger="click">
                                                <span class="el-dropdown-link">
                                                    <a id="searchClassicInvoker" class="font-size-22 text-gray-90 text-lh-1 btn-text-secondary" href="javascript:;" role="button">
                                                        <span class="ec ec-search"></span>
                                                    </a>
                                                </span>
                                                <el-dropdown-menu slot="dropdown" style="width: 100%;">
                                                    <div class="left-0 mx-2" aria-labelledby="searchClassicInvoker">
                                                        <form class="js-focus-state input-group px-3" @submit.prevent="addSearch">
                                                            <input class="form-control" v-model="search" type="search" placeholder="Бүтээгдэхүүн хайх3">
                                                            <div class="input-group-append">
                                                                <button class="btn btn-primary px-3" type="submit"><i class="font-size-18 ec ec-search"></i></button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                            </el-tooltip>
                                        </li>
                                        <!-- End Search -->
                                        <li class="col d-none d-xl-block">
                                            <el-tooltip class="item" effect="dark" content="Харьцуулах" placement="top">
                                                <router-link to="/compare" class="text-gray-90"><i class="font-size-22 ec ec-compare"></i></router-link>
                                            </el-tooltip>
                                        </li>
                                        <li class="col d-none d-xl-block">
                                            <el-tooltip class="item" effect="dark" content="Хадгалсан" placement="top">
                                                <router-link :to="'/profile?role=saved'" class="text-gray-90"><i class="font-size-22 ec ec-favorites"></i></router-link>
                                            </el-tooltip>
                                        </li>
                                        <li class="col d-xl-none px-2 px-sm-3">
                                            <el-tooltip class="item" effect="dark" content="Хувийн мэдээлэл" placement="top">
                                                <router-link to="/profile" class="text-gray-90"><i class="font-size-22 ec ec-user"></i></router-link>
                                            </el-tooltip>
                                        </li>
                                        <li class="col pr-xl-0 px-2 px-sm-3">
                                            <el-tooltip class="item" effect="dark" content="Сагс" placement="top">
                                            <router-link to="/cart" class="text-gray-90 position-relative d-flex ">
                                                <i class="font-size-22 ec ec-shopping-bag"></i>
                                                <span class="width-22 height-22 bg-dark position-absolute d-flex align-items-center justify-content-center rounded-circle left-12 top-8 font-weight-bold font-size-12 text-white">{{cart.total}}</span>
                                                <span class="d-none d-xl-block font-weight-bold font-size-16 text-gray-90 ml-3">₮{{cart.amount}}</span>
                                            </router-link>
                                            </el-tooltip>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- End Header Icons -->
                        </div>
                    </div>
                </div>
                <div class="d-none d-xl-block bg-primary">
                    <div class="container">
                        <div class="row align-items-stretch min-height-50">
                            <!-- Vertical Menu -->
                            <div class="col-md-auto d-none d-xl-flex align-items-end">
                                <div class="max-width-270 min-width-270">
                                    <!-- Basics Accordion -->
                                    <div id="basicsAccordion">
                                        <!-- Card -->
                                        <div class="card border-0 rounded-0">
                                            <div class="card-header bg-primary rounded-0 card-collapse border-0" id="basicsHeadingOne">
                                                <button type="button" class="btn-link btn-remove-focus btn-block d-flex card-btn py-3 text-lh-1 px-4 shadow-none btn-primary rounded-top-lg border-0 font-weight-bold text-gray-90"
                                                    data-toggle="collapse"
                                                    data-target="#basicsCollapseOne"
                                                    aria-expanded="true"
                                                    aria-controls="basicsCollapseOne" style="background: #e3fd38;">
                                                    <span class="pl-1 text-gray-90">Ангилал</span>
                                                    <span class="text-gray-90 ml-3">
                                                        <span class="ec ec-arrow-down-search"></span>
                                                    </span>
                                                </button>
                                            </div>
                                            <div id="basicsCollapseOne" class="collapse vertical-menu v1"
                                                aria-labelledby="basicsHeadingOne"
                                                data-parent="#basicsAccordion">
                                                <div class="card-body p-0">
                                                    <nav class="js-mega-menu navbar navbar-expand-xl u-header__navbar u-header__navbar--no-space hs-menu-initialized">
                                                        <div id="navBar" class="collapse navbar-collapse u-header__navbar-collapse">
                                                            <ul class="navbar-nav u-header__navbar-nav border-primary border-top-0">
                                                                <li v-for="(item, index) in categories" :key="index" class="nav-item hs-has-mega-menu u-header__nav-item"
                                                                    data-event="hover"
                                                                    data-position="left">
                                                                    <router-link id="basicMegaMenu1" class="nav-link u-header__nav-link u-header__nav-link-toggle" data-toggle="collapse" data-target="#basicsCollapseOne" :to="'/category/'+item.id" aria-haspopup="true" aria-expanded="false">
                                                                        <span style="width: 12%;">
                                                                            <!-- <i class="fas fa-briefcase"></i> -->
                                                                            <img :src="$appUrl+'/images/menu/'+item.icon" :style="{'width': '15px', height: '15px'}">
                                                                        </span>
                                                                        <span style="width: 87%">    
                                                                            {{item.category_name}}
                                                                        </span>
                                                                    </router-link>

                                                                    <!-- Nav Item - Mega Menu -->
                                                                    <div class="hs-mega-menu vmm-tfw u-header__sub-menu" aria-labelledby="basicMegaMenu1">
                                                                        <div class="vmm-bg">
                                                                            <img class="img-fluid" :src="$appUrl+'/images/category/'+item.image" alt="Image Description" :style="{'height': '398px', 'width': 'auto'}">
                                                                        </div>
                                                                        <div class="row u-header__mega-menu-wrapper">
                                                                            <div v-if="filterSub(item.id).length > 5" class="row">
                                                                                <div class="col mb-3 mb-sm-0">
                                                                                    <span class="u-header__sub-menu-title">{{item.category_name}}</span>
                                                                                    <ul class="u-header__sub-menu-nav-group mb-3">
                                                                                        <li v-for="(sub, i) in filterSub(item.id).slice(0,5)" :key="i">
                                                                                            <router-link class="nav-link u-header__sub-menu-nav-link" data-toggle="collapse" data-target="#basicsCollapseOne" :to="'/sub-category/'+sub.id">{{sub.sub_category_name}}</router-link>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>

                                                                                <div class="col mb-3 mb-sm-0">
                                                                                    <span class="u-header__sub-menu-title">{{item.category_name}}</span>
                                                                                    <ul class="u-header__sub-menu-nav-group">
                                                                                        <li v-for="(sub, i) in filterSub(item.id).slice(5,filterSub(item.id).length)" :key="i">
                                                                                            <router-link class="nav-link u-header__sub-menu-nav-link" data-toggle="collapse" data-target="#basicsCollapseOne" :to="'/sub-category/'+sub.id">{{sub.sub_category_name}}</router-link>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <div v-else>
                                                                                <div class="col mb-3 mb-sm-0">
                                                                                    <span class="u-header__sub-menu-title">{{item.category_name}}</span>
                                                                                    <ul class="u-header__sub-menu-nav-group mb-3">
                                                                                        <li v-for="(sub, i) in filterSub(item.id)" :key="i">
                                                                                            <router-link class="nav-link u-header__sub-menu-nav-link" data-toggle="collapse" data-target="#basicsCollapseOne" :to="'/sub-category/'+sub.id">{{sub.sub_category_name}}</router-link>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <!-- End Nav Item - Mega Menu -->
                                                                </li>
                                                                
                                                                <!-- End Nav Item MegaMenu-->
                                                            </ul>
                                                        </div>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- End Card -->
                                    </div>
                                    <!-- End Basics Accordion -->
                                </div>
                            </div>
                            <!-- End Vertical Menu -->
                            <!-- Search bar -->
                            <div class="col align-self-center">
                                <!-- Search-Form -->
                                <form class="js-focus-state" @submit.prevent="addSearch">
                                    <label class="sr-only" for="searchProduct">Search</label>
                                    <div class="input-group">
                                        <input type="text" v-model="search" class="form-control py-2 pl-5 font-size-15 border-0 height-40 rounded-left-pill" name="email" id="searchProduct" placeholder="Бүтээгдэхүүн хайх" aria-label="Search for Products" aria-describedby="searchProduct1" required>
                                        <div class="input-group-append">
                                            <button class="btn btn-dark height-40 py-2 px-3 rounded-right-pill" type="button" id="searchProduct1">
                                                <span class="ec ec-search font-size-24"></span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <!-- End Search-Form -->
                            </div>
                            <!-- End Search bar -->
                            <!-- Header Icons -->
                            <div class="col-md-auto align-self-center">
                                <div class="d-flex">
                                    <ul class="d-flex list-unstyled mb-0">
                                        <li class="col">
                                            <el-tooltip class="item" effect="dark" content="Харьцуулах" placement="top">
                                                <router-link to="/compare" class="text-gray-90"><i class="font-size-22 ec ec-compare"></i></router-link>
                                            </el-tooltip>
                                            </li>
                                        <li class="col">
                                            <el-tooltip class="item" effect="dark" content="Хадгалсан" placement="top">
                                                <router-link :to="'/profile?role=saved'" class="text-gray-90"><i class="font-size-22 ec ec-favorites"></i></router-link>
                                            </el-tooltip>
                                        </li>
                                        <li class="col pr-0">
                                            <el-tooltip class="item" effect="dark" content="Сагс" placement="top">
                                            <router-link to="/cart" class="text-gray-90 position-relative d-flex ">
                                                <i class="font-size-22 ec ec-shopping-bag"></i>
                                                <span class="width-22 height-22 bg-dark position-absolute flex-content-center text-white rounded-circle left-12 top-8 font-weight-bold font-size-12">{{cart.total}}</span>
                                                <span class="font-weight-bold font-size-16 text-gray-90 ml-3">₮{{cart.amount}}</span>
                                            </router-link>
                                            </el-tooltip>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- End Header Icons -->
                        </div>
                    </div>
                </div>

            <div class="content">
                <router-view v-on:changeCart="cart" v-on:addCompare="addCompare" v-on:getJquery="getJquery" v-on:addCart="addCart" v-on:addFavourite="addFavourite" v-on:calcCart="calcCart" v-on:removeCart="removeCart" v-on:updateUser="getUser"/>
            </div>
        </div>
    </header>
</template>

<script>
import TopBar from "@/components/topbar";
// import Vue from "vue";
// import VueFbCustomerChat from 'vue-fb-customer-chat';
let timer = null;
export default {
    components: {
        TopBar
    },
    // created() {
    //     if (!document.getElementById("facebook-jssdk")) {
    //         Vue.use(VueFbCustomerChat, {
    //             page_id: 1662965160606906,
    //             theme_color: '#393d3e',
    //             locale: 'en_US',
    //         })
    //     }
    // },
    data() {
        return {
            categories: [],
            subCategories: [],
            cart: {
                total: 0,
                amount: 0
            },
            user: null,
            search: '',
            events: [],
            eventIndex : -1,
            hashtags: []
        }
    },
    mounted() {
        this.getCategories();
        this.calcCart();
        this.getUser();
    },
    methods: {
        goBonus() {
           const user = JSON.parse(localStorage.getItem('user'));
            if(user) {
                this.$router.push('/profile');
            } else {
                this.$router.push('/bonus');
            } 
        },
        checkBonus() {
            const user = JSON.parse(localStorage.getItem('user'));
            if(user) {
                return `Миний бонус ${Number(user.bonus).toLocaleString()}`
            } else {
                return 'Бонус';
            }
        },
        addSearch() {
            if(this.search != '') {
                this.$router.push('/search?p='+this.search);
            }
        },
        addFavourite(value) {
            const token = localStorage.getItem('token');
            if(token) {
                var rts = this;
                rts.$axios({
                    method: 'POST',
                    url: rts.$appUrl + '/api/product/add-favourite-product',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    data: {
                        id: value
                    }
                }).then(data => {
                    if(data.data.result == 'success') {
                        this.$notify({
                            title: 'Амжилттай',
                            message: `Бүтээгдэхүүн хадгалагдлаа`,
                            type: 'success'
                        });
                    } else {
                        this.$notify({
                            title: 'Амжилтгүй',
                            message: `5-аас дээш бүтээгдэхүүн хадгалах боломжгүй`,
                            type: 'error'
                        });
                    }
                });
            } else {
                this.$notify({
                    title: 'Амжилтгүй',
                    message: `Нэвтэрсэн байх шаардлагатай`,
                    type: 'error'
                });
                this.$router.push('/login');
            }
        },
        toProfile() {
            const token = localStorage.getItem('token');
            if(!token) {
                this.$notify({
                    title: 'Амжилтгүй',
                    message: `Нэвтэрсэн байх шаардлагатай`,
                    type: 'error'
                });
                this.$router.push('/login');
            } else {
                this.$router.push('/profile');
            }
        
        },
        getUser() {
            var user = JSON.parse(localStorage.getItem('user'));
            if(user) {
                this.user = user;
            }
        },
        Logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.user = null;
            if(this.$route.name == 'profile') {
                this.$router.push('/home');
            }
        },
        removeCart(id) {
            let cart = JSON.parse(localStorage.getItem('cart'));
            cart.forEach((element, index) => {
                if(element.id == id) {
                    cart.splice(index, 1);
                }
            });
            localStorage.cart = JSON.stringify(cart);
            this.calcCart();
        },
        calcCart() {
            let cart = JSON.parse(localStorage.getItem('cart'));
            if(cart != null && cart.length > 0) {
                var t = 0; var a= 0;
                cart.forEach(element => {
                    t = t + element.qty;
                    if(element.discount > 0) {
                        a = a + element.price * ((100 - element.discount) / 100)
                    } else {
                        a = a + (element.price * element.qty);
                    }
                });
                if(t > 9) {
                    this.cart.total = '9+';
                } else {
                    this.cart.total = t;
                }
                this.cart.amount = Number(a).toLocaleString();
            } else {
                this.cart.total = 0;
                this.cart.amount = 0;
            }
        },
        addCompare(id) {
            var products = [];
            let compare = JSON.parse(localStorage.getItem('compare'));
            if(compare != null && compare.length > 0) {
                if(compare.length > 3) {
                    this.$notify({
                        title: 'Амжилтгүй',
                        message: `Уучлаарай 4-өөс илүү бараа нэмэх боломжгүй`,
                        type: 'error'
                    });
                } else {
                    let ex = compare.some(function(field) {
                        return field == id
                    });
                    if(ex) {
                        this.$notify({
                            title: 'Амжилттай',
                            message: `Бүтээгдэхүүн нэмэгдлээ`,
                            type: 'success'
                        });
                    } else {
                        compare.forEach(element => {
                            products.push(element);
                        });
                        products.push(id);
                        localStorage.compare = JSON.stringify(products);
                        this.$notify({
                            title: 'Амжилттай',
                            message: `Бүтээгдэхүүн нэмэгдлээ`,
                            type: 'success'
                        });
                    }
                }
            } else {
                products.push(id);
                localStorage.compare = JSON.stringify(products);
                this.$notify({
                    title: 'Амжилттай',
                    message: `Бүтээгдэхүүн нэмэгдлээ`,
                    type: 'success'
                });
            }
        },
        addCart(value) {
            var products = [];
            let cart = JSON.parse(localStorage.getItem('cart'));
            if(cart != null && cart.length > 0) {
                let ex = cart.some(function(field) {
                    return field.id == value[1].id
                });
                if(ex) {

                    cart.forEach(element => {
                        if(element.id == value[1].id) {
                            if(value[1].remain >= (element.qty + value[0])) {
                                element.qty = element.qty + value[0];
                                // var p = {id: value[1].id, name: value[1].name, price: value[1].sale_price, image: value[1].image, model: value[1].model, qty: (element.qty + value[0]), color: value[1].color_name, discount: value[1].discount, bonus: value[1].bonus};
                                // localStorage.cart = JSON.stringify(products);
                                this.$notify({
                                    title: 'Амжилттай',
                                    dangerouslyUseHTMLString: true,
                                    message: `<strong>${element.model}</strong> бүтээгдэхүүн нэмэгдлээ`,
                                    type: 'success'
                                });
                            } else {
                                this.$notify({
                                    title: 'Амжилтгүй',
                                    message: `Үлдэгдэл хүрэлцэхгүй байна`,
                                    type: 'error'
                                });
                            }
                        }
                        products.push(element);
                    });
                    localStorage.cart = JSON.stringify(products);
                } else {
                    cart.forEach(element => {
                        products.push(element);
                    });
                    if(value[1].remain >= value[0]) {
                        var p = {id: value[1].id, name: value[1].name, price: value[1].sale_price, image: value[1].image, model: value[1].model, qty: value[0], color: value[1].color_name, discount: value[1].discount, bonus: value[1].bonus_percent};
                        products.push(p);
                        localStorage.cart = JSON.stringify(products);
                        this.$notify({
                            title: 'Амжилттай',
                            dangerouslyUseHTMLString: true,
                            message: `<strong>${value[1].model}</strong> бүтээгдэхүүн нэмэгдлээ`,
                            type: 'success'
                        });
                    } else {
                        this.$notify({
                            title: 'Амжилтгүй',
                            message: `Үлдэгдэл хүрэлцэхгүй байна`,
                            type: 'error'
                        });
                    }
                }
            } else {
                if(value[1].remain >= value[0]) {
                    var p = {id: value[1].id, name: value[1].name, price: value[1].sale_price, image: value[1].image, model: value[1].model, qty: value[0], color: value[1].color_name, discount: value[1].discount, bonus: value[1].bonus_percent};
                    products.push(p);
                    localStorage.cart = JSON.stringify(products);
                    this.$notify({
                        title: 'Амжилттай',
                        dangerouslyUseHTMLString: true,
                        message: `<strong>${value[1].model}</strong> бүтээгдэхүүн нэмэгдлээ`,
                        type: 'success'
                    });
                } else {
                    this.$notify({
                        title: 'Амжилтгүй',
                        message: `Үлдэгдэл хүрэлцэхгүй байна`,
                        type: 'error'
                    });
                }
            }

            this.calcCart();
        },
        updateTimer() {
            if(this.eventIndex == this.events.length - 1) {
                this.eventIndex = 0;
            } else {
                this.eventIndex++;
            }
            this.hashtags = [];
            this.hashtags = this.events[this.eventIndex];
        },
        processTags () {
            var main = []; var sub = [];
            this.events.forEach((el, index) => {
                if((index + 1) % 3 != 0) {
                    sub.push(el);
                    if((index + 1) == this.events.length) {
                        main.push(sub);
                    }
                } else {
                    sub.push(el);
                    main.push(sub);
                    sub = [];
                }
            });

            this.events = [];
            this.events = main;
            this.updateTimer();
        },
        filterSub(id) {
            var cats = [];
            this.subCategories.forEach(element => {
                if(element.categoryID == id) {
                    cats.push(element);
                }
            });
            return cats;
        },
        getCategories() {
            var rts = this;
            rts.$axios({
                method: 'POST',
                url: rts.$appUrl + '/api/home/categories',
                headers: {}
            }).then(function(data) {
                rts.categories = data.data.category;  
                rts.subCategories = data.data.subCategory;  
                rts.events = data.data.events;
                rts.processTags();
                timer = setInterval(rts.updateTimer, 5000)
            }).catch(error => {
                console.log(error);
            })
        },
        getJquery() {
            $('.js-mega-menu').HSMegaMenu({
                    event: 'hover',
                    direction: 'horizontal',
                    pageContainer: $('.container'),
                    breakpoint: 767.98,
                    hideTimeOut: 0
            });

            $.HSCore.components.HSSlickCarousel.init('.js-slick-carousel');
            $.HSCore.components.HSUnfold.init($('[data-unfold-target]'));
        }
    }
}
</script>