var app = getApp()
Page({
  data: {
    couponInfo: {},
    showStatus: false,
    loadingBtn: false
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
      showStatus: true,
      loadingBtn: true
    })
  },
  imgPic() {
    console.log('弄弄')
    tt.previewImage({
      urls: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604990113955&di=81fd1c45fd533b49ede6d3f5fa15f619&imgtype=0&src=http%3A%2F%2Fimg.haote.com%2Fupload%2Fqrcode%2F1525%2Fhaote4b1d603ab648a89b5a170473627bfb4a.png'], // 图片地址列表
      success: (res) => {
        console.log(res)
      }
    });

  }


  
})
