import api from '../api/index.js';
import user from './user'; // 所属模块: 1便利店;2餐饮服务;3情趣用品;4土特产

const MODULE = {
  1: 'supermarket',
  2: 'takeaway',
  3: 'sextoys',
  4: 'native'
};
export default {
  data: {
    module: MODULE,
    userInfo: null,
    canIUse: tt.canIUse('button.open-type.getUserInfo'),
    // 含优惠券
    user: user.data,
    supermarket: {
      menus: [],
      goods: {},
      cart: []
    },
    takeaway: {
      cart: [],
      goods: {},
      menus: {}
    },
    sextoys: {
      cart: [],
      goods: {},
      menus: []
    },
    native: {
      menus: ['全部'],
      cart: [],
      goods: {}
    },
    roomService: {
      cart: []
    },
    banners: [] //酒店超市 轮播图

  },

  // 获取酒店超市轮播图
  getBanners() {
    api.reqModuleBanners({
      hotelId: getApp().globalData.hotelId,
      menuId: 3
    }).then(res => {
      this.data.banners = res.data;
      this.update();
    }).catch(err => {
      console.log(err);
    });
  },

  /** 
   * 指定商品 id  同步
   * @param {Number} count 商品数量
   * @param {Number} skuId 从购物车同步到 商品列表的 skuId 
   * @param {Object|| Array} objList 待同步的商品列表  结构为[] || {key:{list:...}}
   * @param {String} idKey 商品 id key
   * @return: {Object} 同步完成的 商品列表Object
   */
  count2List(count, skuId, objList, idKey = "hotelGoodsSkuId") {
    if (objList instanceof Array) {
      objList.some(v => {
        if (v[idKey] === skuId) {
          console.log(v.goodsCount);
          v.goodsCount = count;
        }

        return v[idKey] === skuId;
      });
    } else {
      Object.keys(objList).forEach(key => {
        return objList[key].list.some(v => {
          if (skuId === v[idKey]) {
            v.goodsCount = count;
          }

          return v[idKey] === skuId;
        });
      });
    }

    return objList;
  },

  /**
   * 购物车 数量 同步到 商品列表
   * @param {Array}  cart 购物车
   * @param {Array}  list 商品列表
   * @param {String} idKey 商品 id key
   * @return: {Array} 同步完数量的 商品列表
   */
  cartCount2List(cart, list, idKey = "hotelGoodsSkuId") {
    // 把购物车 数量同步到 商品列表
    list.forEach(v => v.goodsCount = 0);

    if (cart.length) {
      list.forEach(g => {
        g.goodsCount = 0;
      });
      cart.map(v => {
        list.some(k => {
          if (v[idKey] === k[idKey]) {
            k.goodsCount = v.goodsCount;
          }

          return v[idKey] === k[idKey];
        });
      });
    }

    return list;
  },

  /**
   * 同步 多模块 购物车数量 到商品列表
   * @param {Array} belongModules 购物车模块
   * 
   */
  updateGoodsList(belongModules) {
    if (!(belongModules instanceof Array) || !belongModules.length) return;
    belongModules.forEach(v => {
      if (+v === 4) return false;
      let key = this.data.module[v];
      let {
        goods,
        cart
      } = this.data[key];
      Object.keys(goods).forEach(menuKey => {
        goods[menuKey].list = this.cartCount2List(cart, goods[menuKey].list);
      });
      this.update({
        [key + '.goods']: goods
      });
    });
  },

  /**
   * 购物车 增删 更新数量
   * @param {Array} cart 购物车
   * @param {Number} count 数量
   * @param {Object} goods 需要更新的商品数据
   * @param {String} idKey 商品id key
   * @return: {Array} cart 更新完的购物车
   */
  updateCart(cart, count, goods, idKey = 'hotelGoodsSkuId') {
    let i = cart.findIndex(v => v[idKey] === goods[idKey]);

    if (count === 0) {
      // 数量 0 删除
      cart.splice(i, 1);
    } else if (count < goods.goodsCount) {
      // 减
      cart[i].goodsCount = count;
      cart[i].checked = true;
    } else {
      if (i >= 0) {
        // 加数量
        cart[i].goodsCount = count;
        cart[i].checked = true;
      } else {
        // 新增
        cart.unshift({ ...goods,
          checked: true,
          goodsCount: count
        });
      }
    }

    return cart;
  },

  custom: {
    $api: api
  }
};