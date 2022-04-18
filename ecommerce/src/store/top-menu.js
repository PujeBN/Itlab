const state = () => {
  return {
    menu: [
      {
        icon: "FileTextIcon",
        pageName: "top-menu-menu-layout",
        title: "Хичээл",
        subMenu: [
          {
            icon: "",
            pageName: "top-menu-beginner",
            title: "Анхан",
            
          },
          {
            icon: "",
            pageName: "top-menu-icon",
            title: "Дунд",
          },
          {
            icon: "",
            pageName: "",
            title: "Ахисан",
          }
        ]
      },
      {
        icon: "ListIcon",
        pageName: "top-menu-apps",
        title: "Уралдаан",
        subMenu: [
          {
            icon: "InboxIcon",
            pageName: "top-menu-inbox",
            title: "Онлайн уралдаан"
          },
          {
            icon: "FolderIcon",
            pageName: "top-menu-file-manager",
            title: "Найзаа урих"
          }
        ]
      },
      {
        icon: "HomeIcon",
        pageName: "top-menu-dashboard",
        title: "Шагналтай уралдаан"
      },
      {
        icon: "SettingsIcon",
        pageName: "top-menu-components",
        title: "Тохиргоо",
        subMenu: [
          {
            icon: "",
            pageName: "top-menu-grid",
            title: "Grid",
            subMenu: [
              {
                icon: "",
                pageName: "top-menu-regular-table",
                title: "Regular Table"
              },
              {
                icon: "",
                pageName: "top-menu-tabulator",
                title: "Tabulator"
              }
            ]
          },
          {
            icon: "",
            pageName: "top-menu-accordion",
            title: "Accordion"
          },
          {
            icon: "",
            pageName: "top-menu-button",
            title: "Button"
          },
          {
            icon: "",
            pageName: "top-menu-modal",
            title: "Modal"
          },
          {
            icon: "",
            pageName: "top-menu-alert",
            title: "Alert"
          },
          {
            icon: "",
            pageName: "top-menu-progress-bar",
            title: "Progress Bar"
          },
          {
            icon: "",
            pageName: "top-menu-tooltip",
            title: "Tooltip"
          },
          {
            icon: "",
            pageName: "top-menu-dropdown",
            title: "Dropdown"
          },
          {
            icon: "",
            pageName: "top-menu-toast",
            title: "Toast"
          },
          {
            icon: "",
            pageName: "top-menu-typography",
            title: "Typography"
          },
          {
            icon: "",
            pageName: "top-menu-loading-icon",
            title: "Loading Icon"
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
