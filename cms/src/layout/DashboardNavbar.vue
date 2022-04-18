<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
        <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
        </form>
        <ul class="navbar-nav align-items-center d-none d-md-flex">
          <el-dropdown trigger="click" class="nav-item">
            <span class="el-dropdown-link">
              <div class="media align-items-center" slot="title">
                <span class="avatar avatar-sm rounded-circle">
                <img alt="Image placeholder" :src="user.img">
                </span>
                <div class="media-body ml-2 d-none d-lg-block">
                  <span class="mb-0 text-sm font-weight-bold" :style="{'color': '#fff'}">{{user.name}}</span>
                </div>
              </div>
            </span>
            <el-dropdown-menu slot="dropdown">
              <li class="nav-link">
                <div class="dropdown-header noti-title">
                  <h6 class="text-overflow m-0">Тавтай морил!</h6>
                </div>
                <a href="javascript:;" class="dropdown-item">
                  <i class="ni ni-single-02 mr-1"></i>
                  <span class="text-sm">Хувийн мэдээлэл</span>
                </a>
                <div class="dropdown-divider"></div>
                <a href="javascript:;" @click="logout" class="dropdown-item">
                  <i class="ni ni-user-run mr-1"></i>
                  <span class="text-sm">Гарах</span>
                </a>
              </li>
            </el-dropdown-menu>
          </el-dropdown>
        </ul>
    </base-nav>
</template>
<script>
  export default {
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchQuery: '',
        user: []
      };
    },
    mounted() {
      this.getInfo();
    },
    methods: {
      logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.$router.push('/login');
      },
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
      getInfo() {
        this.user = JSON.parse(localStorage.getItem('user'));
      }
    }
  };
</script>
