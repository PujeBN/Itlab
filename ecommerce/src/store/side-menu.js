const state = () => {
  return {
    menu: [
      {
        icon: "UserIcon",
        pageName: "side-menu-profile",
        title: "Хувийн мэдээлэл"
      },
      {
        icon: "UsersIcon",
        pageName: "side-menu-users-layout-2",
        title: "Админууд",
        subMenu: [
          {
            icon: "ListIcon",
            pageName: "side-menu-users-layout-2",
            title: "Жагсаалт"
          },
          {
            icon: "PlusIcon",
            pageName: "side-menu-wizard-layout-3",
            title: "Бүртгэх"
          }
        ]
      },
      {
        icon: "FileTextIcon",
        pageName: "side-menu-wizard-layout-2",
        title: "Текстүүд",
        subMenu: [
          {
            icon: "PlusIcon",
            pageName: "side-menu-wizard-layout-2",
            title: "Текст бүртгэх"
          },
          {
            icon: "ListIcon",
            pageName: "side-menu-tabulator",
            title: "Жагсаалт"
          },
          {
            icon: "ServerIcon",
            pageName: "side-menu-race-text",
            title: "Уралдааны жагсаалт"
          },
          {
            icon: "PlayIcon",
            pageName: "side-menu-online-race-text",
            title: "Онлайн уралдааны текст"
          }
        ]
      },
      {
        icon: "ListIcon",
        pageName: "side-menu-banners",
        title: "Баннерын жагсаалт"
      },
      {
        icon: "UsersIcon",
        pageName: "side-menu-users",
        title: "Хэрэглэгчдийн жагсаалт"
      },
      {
        icon: "HashIcon",
        pageName: "side-menu-coupon-codes",
        title: "Купон код"
      },
      {
        icon: "PlayIcon",
        pageName: "",
        title: "Хичээлүүд",
        subMenu: [
          {
            icon: "PlusIcon",
            pageName: "side-menu-add-lesson",
            title: "Хичээл бүртгэх"
          },
          {
            icon: "BookIcon",
            pageName: "side-menu-lesson-list",
            title: "Хичээлийн жагсаалт"
          }
        ]
      }
    ]
  };
};

// getters
const getters = {
  menu: state => state.menu
};

// actions
const actions = {};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
