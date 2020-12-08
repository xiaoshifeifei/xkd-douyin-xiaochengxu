// pages/index/join.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '#146EEB',
    borderColor:'2px solid #146EEB',
    type: 0,
    datas: [],
    page: 1,
    more: 0,
  },

  onclick_menu: function (e) {
    this.setData({
      type: e.target.dataset.type,
      page: 1,
      datas: [],
    });
    this.getUserCouponList();

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getUserCouponList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  loadMore: function (e) {
    this.getUserCouponList();
  },
  getUserCouponList: function (e) {
    // tt.showLoading({
    //   title: '加载中..',
    // });
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
  goToKaBaoDetails(){
    tt.navigateTo({
      url: '/pages/kabao/kabaodetails/kabaodetails' // 指定页面的url
    });
  }
})