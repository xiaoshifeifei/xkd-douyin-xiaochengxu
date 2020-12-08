// pages/user/user.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
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

  handleInput(event) {
    console.log('输入的值', event.detail);
  },
  // 基础信息
  info() {
    console.log("基础信息")
    tt.navigateTo({
      url: '/pages/myInfo/myInfo', // 指定页面的url
      success(res) {
        console.log(res);
      },
      fail(res) {
        console.log("navigateTo调用失败", res);
      },
    });
  },
  // 商户信息
  MerchantsInfo(){
    console.log("商户信息")
    tt.navigateTo({
      url: '/pages/merchants/merchants', // 指定页面的url
      success(res) {
        console.log(res);
      },
      fail(res) {
        console.log("navigateTo调用失败", res);
      },
    });
  },
  // 关于小程序信息
  aboutInfo(){
    console.log(999)
    tt.navigateTo({
      url: '/pages/aboutInfo/aboutInfo', // 指定页面的url
      success(res) {
        console.log(res);
      },
      fail(res) {
        console.log("navigateTo调用失败", res);
      },
    });
  },
});