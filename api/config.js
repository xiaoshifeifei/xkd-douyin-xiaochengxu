module.exports = {
  //请求地址
  //  URL: 'https://jdgjctest.qmwlxcx.com',
  URL: 'http://devbytebapi.qmwlxcx.com',
  // URL:'https://jdgjc.hizhiliao.cn',
  // URL:'http://192.168.110.93:8066',
  //正常状态码 ""
  SUCCESS_CODE: 0,
  //刷新token状态码
  REFRESH_CODE: 401,
  //需要重新登录状态码,
  RELOGIN_CODE: 405,
  //网络不佳提示
  NETWORK_TIP: '当前网络不佳,请稍后再试',
  //token参数,用于判断是否需要登录,默认为'access_token',根据服务端返回设置
  TOKEN: 'token',
  //刷新token参数,用于刷新token字段,默认为'refresh_token',根据服务端返回设置
  REFRESH_TOKEN: 'flashToken',
  //登录页绝对路径
  LOGIN_URL: '/pages/user/user',
  // LOGIN_URL:'/pages/secondaryEntry/secondaryEntry',
  //网络超时
  TIMEOUT: 5000,
  STATUS: 'code',
  //消息
  MESSAGE: 'message'
};