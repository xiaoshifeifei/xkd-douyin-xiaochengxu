Component({
  options: {
    addGlobalClass: true //在组件使用全局样式

  },

  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
    index: 0,
    color: "#333333",
    selectedColor: "#146EEB",
    isIphoneX: true,
    list: [{
      "pagePath": "/pages/home/home",
      "iconPath": "/libs/images/home/ic_tab_main.png",
      "selectedIconPath": "/libs/images/home/ic_tab_main_selected.png",
      "text": "首页"
    }, {
      "pagePath": "/pages/user/user",
      "iconPath": "/libs/images/home/ic_tab_my.png",
      "selectedIconPath": "/libs/images/home/ic_tab_my_selected.png",
      "text": "我的"
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      console.log(data);
      console.log(url);
      this.setData({
        selected: data.index
      });
      tt.switchTab({
        url
      });

      if (tt.pageScrollTo) {
        console.log("点击", e);
        tt.pageScrollTo({
          scrollTop: 0
        });
      } else {
        tt.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        });
      }
    }

  }
});