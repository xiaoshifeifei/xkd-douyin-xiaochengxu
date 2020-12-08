var app = getApp()
Page({
  data: {
    couponInfo: {},
    showStatus:false,
    loadingBtn:false
  },
  onShow: function () {

  },
  onLoad: function (options) {
    this.setData({
      couponInfo: wx.getStorageSync('couponInfo')
    })
 
  },

  getCoupon: function (options) {
    this.setData({
      showStatus:true,
      loadingBtn:true
    })
  }
})
