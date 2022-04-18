import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'

function AuthCheck(to, from, next) {
  var isAuthenticated = false;
  var token = localStorage.getItem("token");
  if (token) {
    isAuthenticated = true;
  }
  if (isAuthenticated) {
    next();
  } else {
    next("/login");
  }
}

function LoginCheck(to, from, next) {
  var isAuthenticated = true;
  var token = localStorage.getItem("token");
  if (!token) {
    isAuthenticated = false;
  }
  if (!isAuthenticated) {
    next();
  } else {
    next("/dashboard");
  }
}

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      beforeEnter: AuthCheck,
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'Хяналтын самбар',
          component: () => import('./views/Dashboard.vue')
        },
        {
          path: '/orders',
          name: 'Захиалгын жагсаалт',
          component: () => import('./views/Orders.vue')
        },
        {
          path: '/products',
          name: 'Бүтээгдэхүүн',
          component: () => import('./views/Products.vue')
        },
        {
          path: '/users',
          name: 'Хэрэглэгчид',
          component: () => import('./views/Users.vue')
        },
        {
          path: '/coupons',
          name: 'Купон',
          component: () => import('./views/Coupons.vue')
        },
        {
          path: '/quick-category',
          name: 'Нэмэлт талбарууд',
          component: () => import('./views/QuickCategory.vue')
        },
        {
          path: '/show-order/:id',
          name: 'Захиалгын дэлгэрэнгүй',
          component: () => import(/* webpackChunkName: "demo" */ './views/ShowOrder.vue')
        },
        {
          path: '/product-edit/:id',
          name: 'Барааны мэдээлэл засварлах',
          component: () => import(/* webpackChunkName: "demo" */ './views/ProductEdit.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import(/* webpackChunkName: "demo" */ './views/Icons.vue')
        },
        {
          path: '/tables',
          name: 'tables',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tables.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      beforeEnter: LoginCheck,
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        }
      ]
    }
  ]
})
