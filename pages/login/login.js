import $api from '../../api/index';
import config from '../../api/config.js'; //配置文件
let _token = config['TOKEN'] || 'access_token'; //token字段
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    // canIUse: tt.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    host: app.globalData.host,
    showlogin: false,
    clickLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 查看是否授权
    tt.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.getDYuserinfo()
        } else {
          this.setData({
            isHide: true,
            showlogin: false
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.UserID != undefined && app.globalData.UserID != null) {
      var parms = {
        userID: app.globalData.UserID
      };
      tt.navigateBack({
        delta: 1
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },

  // 获取用户手机号
  getPhoneNumberHandler(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },


  //用户信息授权
  getDYuserinfo() {
    let _this=this
    tt.login({
      provider: 'xkd',
      success: function (res) {
        console.log("login", res)
        tt.getUserInfo({
          success(res) {
            console.log(res)
            if (res.userInfo) {
              _this.setData({
                clickLogin: true
              })
            }
            // $api.login({})
            // tt.navigateBack({
            //   delta: 1
            // });
            // uni.setStorageSync('authInfo', res.userInfo);

          },
          fail(res) {
            tt.openSetting()
          }
        })
      }
    });
  },



});