import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/home";
import Login from "../views/LoginRegister";
import Register from "../views/Registers";
import Single from "../views/Single";
import Category from "../views/Category";
import SubCategory from "../views/SubCategory";
import ErrorPage from "../views/error";
import TopBar from "../components/MainBar";
import TopBar2 from "../components/LoginBar";
import Cart from "../views/Cart";
import Shipping from "../views/Shipping";
import ConfirmOrder from "../views/ConfirmOrder";
import showOrder from "../views/showOrder";
import truckOrder from "../views/truckOrder";
import profile from "../views/profile";
import compare from "../views/compare";
import search from "../views/search";
import bonus from "../views/bonus";
import top20 from "../views/top20";
import trend from "../views/trend";
import contact from "../views/contact";
import newArrival from "../views/newArrival";
import brands from "../views/brands";
import brand from "../views/Brand";
import event from "../views/event";
import { toPairs } from "lodash";

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
  if(from.name != 'login' && from.name != 'register' && from.name != null) {
    window.location.href = window.location.protocol + '//' + window.location.host + '/' + to.name;  
  }
  
  var isAuthenticated = true;
  var token = localStorage.getItem("token");
  if (!token) {
    isAuthenticated = false;
  }
  if (!isAuthenticated) {
    next();
  } else {
    next("/home");
  }
}

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: home,
    meta: {
      title: 'ITLAB ОНЛАЙН ДЭЛГҮҮР'
    }
  },
  {
    path: "/",
    name: "main-home",
    component: home,
    meta: {
      title: 'ITLAB ОНЛАЙН ДЭЛГҮҮР'
    }
  },
  {
    path: "",
    component: TopBar2,
    children: [
      {
        path: "/login",
        beforeEnter: LoginCheck,
        name: "login",
        meta: {
          title: 'Нэвтрэх'
        },
        component: Login
      },
      {
        path: "/register",
        beforeEnter: LoginCheck,
        name: "register",
        meta: {
          title: 'Бүртгүүлэх'
        },
        component: Register
      }
    ]
  },
  {
    path: "",
    component: TopBar,
    children: [
      {
        path: "/profile",
        name: "profile",
        beforeEnter: AuthCheck,
        component: profile,
        meta: {
          title: 'Хувийн мэдээлэл'
        }
      },
      {
        path: "/top-20",
        name: "top20",
        component: top20,
        meta: {
          title: 'Борлуулалт өндөр бүтээгдэхүүн'
        }
      },
      {
        path: "/brands",
        name: "brands",
        component: brands,
        meta: {
          title: 'Брэндүүд'
        }
      },
      {
        path: "/new-arrival",
        name: "new-arrival",
        component: newArrival,
        meta: {
          title: 'Шинэ бүтээгдэхүүн'
        }
      },
      {
        path: "/contact",
        name: "contact",
        component: contact,
        meta: {
          title: 'Дэлгүүрийн байршил'
        }
      },
      {
        path: "/trend",
        name: "trend",
        component: trend,
        meta: {
          title: 'Эрэлттэй бүтээгдэхүүн'
        }
      },
      {
        path: "/search",
        name: "search",
        component: search,
        meta: {
          title: 'Бүтээгдэхүүний жагсаалт'
        }
      },
      {
        path: "/bonus",
        name: "bonus",
        component: bonus,
        meta: {
          title: 'Бонус гэж юу вэ'
        }
      },
      {
        path: "/track-order",
        name: "track-order",
        component: truckOrder,
        meta: {
          title: 'Захиалгаа хянах'
        }
      },
      {
        path: "/show-order/:invoiceId",
        name: "show-order",
        component: showOrder,
        beforeEnter: AuthCheck,
        meta: {
          title: 'Захиалгын дэлгэрэнгүй - ITLAB',
        }
      },
      {
        path: "/confirm-order",
        name: "confirm-order",
        component: ConfirmOrder,
        beforeEnter: AuthCheck,
        meta: {
          title: 'Захиалга баталгаажуулах - ITLAB',
        }
      },
      {
        path: "/shipping",
        name: "shipping",
        component: Shipping,
        beforeEnter: AuthCheck,
        meta: {
          title: 'Захиалгын хаяг - ITLAB',
        }
      },
      {
        path: "/compare",
        name: "compare",
        component: compare,
        meta: {
          title: 'Бүтээгдэхүүн харьцуулах',
        }
      },
      {
        path: "/cart",
        name: "cart",
        component: Cart,
        meta: {
          title: 'Сагс - ITLAB',
        }
      },
      {
        path: "/sub-category/:id",
        name: "sub-category",
        component: SubCategory,
        meta: {
          title: 'Бүтээгдэхүүний жагсаалт',
        }
      },
      {
        path: "/category/:id",
        name: "category",
        component: Category,
        meta: {
          title: 'Бүтээгдэхүүний жагсаалт',
        }
      },
      {
        path: "/brand/:id",
        name: "brand",
        component: brand,
        meta: {
          title: 'Бүтээгдэхүүний жагсаалт'
        }
      },
      {
        path: "/event/:id",
        name: "event",
        component: event,
        meta: {
          title: 'Бүтээгдэхүүний жагсаалт'
        }
      },
      {
        path: "/single-product/:id",
        name: "single-product",
        component: Single,
        meta: {
          title: 'Бүтээгдэхүүний дэлгэрэнгүй',
        }
      },
      {
        path: "/error-page",
        name: "error-page",
        meta: {
          title: 'Алдаа'
        },
        component: ErrorPage
      },
      {
        path: "/*",
        meta: {
          title: 'Алдаа'
        },
        component: ErrorPage
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
