import store from './store/index';
import { checkUpdate } from '/utils/util.js';
App({
  // require 支持绝对路径
  require: function ($uri) {
    return require($uri);
  },
  onLaunch: function () {
    // 小程序版本检查并更新
    checkUpdate();
  },
  globalData: {
    emojiReg: /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
    userInfo: null,
    isIphoneX: false //手机型号是否是iPhoneX

  },

  onHide() {},

  // 获取设备信号 底部适配
  onShow: function (option) {
    let that = this;
    tt.getSystemInfo({
      success: res => {
        // console.log('手机信息res'+res.model)
        let modelmes = res.model; // 如果是 X,XS,XR,XS MAX 均可适配

        if (modelmes.search('iPhone X') != -1) {
          that.globalData.isIphoneX = true;
        }

        this.globalData.StatusBar = res.statusBarHeight;
        let capsule = tt.getMenuButtonBoundingClientRect();

        if (capsule) {
          this.globalData.CustomBar = capsule.bottom + capsule.top - res.statusBarHeight;
        } else {
          this.globalData.CustomBar = res.statusBarHeight + 50;
        }
      }
    });
  }
});