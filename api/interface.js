/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */

/**
 * 请求的响应会返回自定义状态码
 *   config['SUCCESS_CODE']  正常请求
 *   config['MESSAGE'] 返回data 里消息
 *   config['REFRESH_CODE']  刷新token
 */
import getNoLoginRequiredToken from '../utils/AESUtil';
import config from './config.js'; //配置文件

let _token = config['TOKEN'] || 'access_token'; //token字段


let _refresh_token = config['REFRESH_TOKEN'] || 'refresh_token'; //token字段


let reqSqueue = []; // 请求队列

let isRefreshing = false; // 是否正在刷新token

const http = {
  //默认配置
  config: {
    baseUrl: config['URL'],
    header: {// 'Content-Type':'application/json;charset=UTF-8',
      // 'Content-Type':'application/x-www-form-urlencoded'
    },
    dataType: "json",
    method: 'GET',
    data: {},

    // timeout:config['TIMEOUT'],
    success() { },

    fail() { },

    configOPT: {},
    interResponse: null,
    interRequest: null,
    needToken: true // 默认请求需要token

  },

  // 请求
  request(options) {
    let serverAddress = getApp().globalData.serverAddress || '';
    let url = this.config.baseUrl + options.mod;

    if (serverAddress) {
      url = serverAddress + options.mod;
    } // 参数合并


    options = {
      ...this.config,
      ...options,
      url
    };
    return new Promise((resolve, reject) => {
      //请求失败
      options.fail = err => {
        console.log(err, `！！！-${options.method}-请求失败的err`);
        showToast(config['NETWORK_TIP']);
        reject(err);
      }; // 请求成功


      options.success = response => {
        console.log(response, `>>>-${options.method}-请求成功的response`);
        response.config = options; //请求后的拦截器

        if (response.statusCode === 200 && options.interResponse) {
          options.interResponse(response, resolve, reject);
        } else if (response.statusCode === 200) {
          resolve(response);
        } else {
          tt.showToast({
            title: 'statusCode:' + response.statusCode,
            icon: 'none'
          });
          reject(response);
        }
      }; // 用于请求前拦截器 config 参数合并


      if (options.interRequest) {
        //请求前的拦截器
        options.interRequest({
          ...options
        }, reject);
      } else {
        //没有请求前拦截 直接发起请求
        tt.request(options);
      }
    });
  },

  get(mod, data = {}, configOPT = {}, options = {}) {
    let _options = {
      ...options,
      mod,
      data,
      configOPT,
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...options.header
      }
    };
    return this.request(_options);
  },

  post(mod, data = {}, configOPT = {}, options = {}) {
    options = {
      ...options,
      mod,
      data,
      configOPT,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        // 'Content-Type':'application/x-www-form-urlencoded',
        ...options.header
      }
    };
    return this.request(options);
  }

}; //添加请求拦截器

http.config.interRequest = (_config, reject) => {
  //检查网络环境
  // wx.onNetworkStatusChange((res) =>{
  //     if(!res.isConnected){
  // 		showToast(config['NETWORK_TIP']);
  // 		return reject({[config['MESSAGE']]:config['NETWORK_TIP']});
  // 	}
  // });
  let configOPT = _config['configOPT'] || {}; // 默认请求需要token

  if (_config.needToken) {
    console.log(_config.needToken); //  登录请求
    console.log(_config.url.toLowerCase().indexOf('login') >= 0)
    if (_config.url.toLowerCase().indexOf('login') >= 0 || _config.url.toLowerCase().indexOf('loginout') < 0 || _config.url.toLowerCase().indexOf('loginlog') < 0) {
      console.log('我进来了')
      let token = getNoLoginRequiredToken();
      _config.header[_token] = token;
    } // 刷新token 请求
    else if (_config.url.indexOf('flashToken') >= 0) {
      let refresh_token = tt.getStorageSync('userInfo')[_refresh_token];

      _config.header[_token] = refresh_token;
    } // 需要登录
    else {
      //如果没有登录
      let token = tt.getStorageSync('userInfo')[_token] || '';

      if (!token) {
        goLogin();
        return reject({
          [config['MESSAGE']]: '请登录'
        });
      } else {
        //如果已登录,将缓存中的token赋值给请求参数
        _config.header[_token] = token;
      }
    }
  }

  return tt.request(_config);
}; //添加响应拦截器


http.config.interResponse = (response, resolve, reject) => {
  console.log(response);
  console.log(resolve);
  console.log(reject);
  let data = response.data;

  switch (parseInt(data[config['STATUS']])) {
    case config['SUCCESS_CODE']:
      // 正常返回
      resolve(data);
      break;

    case config['REFRESH_CODE']:
      //刷新token
      reqSqueue.push(() => resolve(http.request(response.config)));
      handleRefresh();
      break;

    case config['RELOGIN_CODE']:
      // 刷新token 失败
      reject(data);
      break;

    default:
      // 请求参数错误等
      console.log('111111111111');
      let message = data[config['MESSAGE']];
      message && showToast(message);
      reject(data);
      break;
  }
}; // 跳转登录


function goLogin(isRedirect) {
  reqSqueue.length = 0;
  isRefreshing = false;
  tt.removeStorageSync('userInfo');
  getApp().globalData.userInfo = null;
  showToast('请前往登录', () => {
    if (isRedirect == "isRedirect") {
      tt.redirectTo({
        url: config['LOGIN_URL']
      });
    } else {
      let redirectObj = getUrl();
      tt.setStorageSync('redirectObj', redirectObj);
      tt.switchTab({
        url: config['LOGIN_URL']
      });
    }
  });
} // 获取当前路由


function getUrl() {
  let pages = getCurrentPages();
  let cPage = pages[pages.length - 1];
  let url = '/' + cPage.route;
  let navType = 'redirectTo';

  if (url.toLowerCase().indexOf('user/user') >= 0) {
    url = '';
    navType = '';
    cPage.update({
      userInfo: null
    });
  } else if (url.toLowerCase().indexOf('home/home') >= 0 || url.toLowerCase().indexOf('shopping/shopping') >= 0) {
    navType = 'switchTab';
  }

  let options = cPage.options;
  let query = [];
  Object.keys(options).forEach(key => {
    query.push(`${key}=${options[key]}`);
  });
  query = query.length ? `?${query.join('&')}` : '';
  url += query;
  return {
    navType,
    url
  };
} // 刷新token


function refreshToken() {
  let userInfo = tt.getStorageSync('userInfo') || {};

  if (!userInfo[_refresh_token]) {
    return Promise.reject({
      [config['MESSAGE']]: '请登录'
    });
  } else {
    return http.post('/flashToken/getNewToken');
  }
} // 重发请求队列


function handleRefresh() {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshToken().then(res => {
      let userInfo = tt.getStorageSync('userInfo') || {};
      userInfo[_token] = res.data.token;
      tt.setStorageSync('userInfo', userInfo);
      isRefreshing = false;
      reqSqueue.forEach(request => request());
      reqSqueue.length = 0;
    }).catch(err => {
      console.log(err);
      reqSqueue.length = 0;
      goLogin();
    });
  }
}

function showToast(title, callback, mask) {
  tt.showToast({
    title: title,
    icon: "none",
    position: "bottom",
    mask: mask || false,

    success() {
      if (typeof callback == "function") {
        setTimeout(function () {
          callback();
        }, 1500);
      }
    }

  });
}

export default http;