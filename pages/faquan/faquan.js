// pages/index/join.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    datas: [{ 'activity_id': 1, "money": "100", "title": "天降红包", "end_date": "2019-11-11", "num": 100 }, { 'activity_id': 1, "money": "100", "title": "天降红包", "end_date": "2019-11-11", "num": 100 }, { 'activity_id': 1, "money": "100", "title": "天降红包", "end_date": "2019-11-11", "num": 100 }],
    activity_id: 0,
  },

  /**
   * 获取优惠券
   */
  getCoupon: function (e) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getActivity();
  },


  getActivity: function (e) {

  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goToMakeCoupon() {
    tt.navigateTo({
      url: '/pages/faquan/makeCoupon/makeCoupon' // 指定页面的url
    });
  },

})