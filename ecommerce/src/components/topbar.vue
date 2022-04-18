<template>
        <div class="u-header__section">
            <!-- <Backtop /> -->
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
                                        <el-dropdown trigger="click">
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
        </div>
</template>
<script>
import Backtop from "@/components/backtop";
export default {
    components: {
        Backtop
    },
    data() {
        return {
            user: null
        }
    },
    created() {
        this.getUser();
    },
    methods: {
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
        }
    }
}
</script>