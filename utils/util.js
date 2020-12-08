var n_time;
var r_year;
var r_month;
var r_date;
var n_time_riqi;
var r_fount_month = 6;
var dayIndex = 0;

const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

const ClickToFind = (val, json) => {
  var eqx = new RegExp(val);
  var jsonList = JSON.parse(JSON.stringify(json));
  var arr = [];

  for (var i = 0; i < jsonList.length; i++) {
    if (eqx.exec(jsonList[i].name)) {
      arr.push(jsonList[i]);
    }
  }

  return arr;
};

const getDay = (time, x) => {
  var t_time = new Date(time);
  var t_year = t_time.getFullYear();
  var t_month = t_time.getMonth() + 1;
  t_month = t_month.toString();

  if (t_month.length == 1) {
    t_month = "0" + t_month;
  }

  var t_date = t_time.getDate();
  var t_date1 = t_date;
  t_date1 = t_date1.toString();

  if (t_date1.length == 1) {
    t_date1 = "0" + t_date;
  }

  var t_day = t_time.getDay();

  if (x == 1) {
    return t_date;
  } else if (x == 2) {
    return t_day;
  } else if (x == 3) {
    return t_month + "月" + t_date1 + "日";
  } else {
    return t_year + "-" + t_month + "-" + t_date1;
  }
};

const getDate = (num, day, time, today) => {
  var date = [];

  for (var i = 0; i < day; i++) {
    date.push({
      type: 0,
      day1: 0,
      day2: 0,
      select: 0,
      today: 0,
      dayIndex: dayIndex
    });
    dayIndex++;
  }

  if (today) {
    for (var j = 0; j <= (parseInt(num / 7) + 1) * 7; j++) {
      if (j < today - 1) {
        date.push({
          type: 0,
          day1: getDay(time + 86400000 * j),
          day2: getDay(time + 86400000 * j, 1),
          day3: getDay(time + 86400000 * j, 3),
          select: 0,
          today: 0,
          dayIndex: dayIndex
        });
      } else if (j == today - 1) {
        date.push({
          type: 1,
          day1: getDay(time + 86400000 * j),
          day2: getDay(time + 86400000 * j, 1),
          day3: getDay(time + 86400000 * j, 3),
          select: 0,
          today: 1,
          //今天
          dayIndex: dayIndex
        });
      } else if (j > today - 1 && j < num) {
        date.push({
          type: 1,
          day1: getDay(time + 86400000 * j),
          day2: getDay(time + 86400000 * j, 1),
          day3: getDay(time + 86400000 * j, 3),
          select: 0,
          today: 0,
          dayIndex: dayIndex
        });
      } else {
        date.push({
          type: 0,
          day1: 0,
          day2: 0,
          day3: 0,
          select: 0,
          today: 0,
          dayIndex: dayIndex
        });
      }

      dayIndex++;
    }
  } else {
    for (var j = 0; j <= (parseInt(num / 7) + 1) * 7; j++) {
      var local = [];

      if (j < num) {
        date.push({
          type: 1,
          day1: getDay(time + 86400000 * j),
          day2: getDay(time + 86400000 * j, 1),
          day3: getDay(time + 86400000 * j, 3),
          select: 0,
          today: 0,
          dayIndex: dayIndex
        });
      } else {
        date.push({
          type: 0,
          day1: 0,
          day2: 0,
          day3: 0,
          select: 0,
          today: 0,
          dayIndex: dayIndex
        });
      }

      dayIndex++;
    }
  }

  return date;
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
}; //校验手机格式


const checkMobile = mobile => {
  return RegExp(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(19[0-9]{1}))+\d{8})$/).test(mobile);
}; // 页面分享公用


const shareData = (ops, title, path, imageUrl) => {
  if (ops.from === 'button') {
    //区分按钮分享
    if (ops.target.id === "btn") {
      return {
        title: title,
        path: path,
        imageUrl: imageUrl
      };
    }
  }

  return {
    title: title,
    path: path,
    imageUrl: imageUrl
  };
}; //获取当前日期的相邻日期


const getDateStr = (today, addDayCount) => {
  var dd;

  if (today) {
    dd = new Date(today);
  } else {
    dd = new Date();
  }

  dd.setDate(dd.getDate() + addDayCount); //获取AddDayCount天后的日期 

  var y = dd.getFullYear();
  var m = dd.getMonth() + 1; //获取当前月份的日期 

  var d = dd.getDate();

  if (m < 10) {
    m = '0' + m;
  }

  ;

  if (d < 10) {
    d = '0' + d;
  }

  ;
  return y + "-" + m + "-" + d;
};

const getMonthDate = () => {
  var datelist = [];
  var day, month; //初始化数据

  n_time = new Date();
  r_year = n_time.getFullYear();
  r_month = n_time.getMonth() + 1;
  r_date = n_time.getDate();
  n_time_riqi = r_year + "-" + r_month + "-" + r_date;
  dayIndex = 0;

  for (var z = 0; z < r_fount_month; z++) {
    var r_day = new Date(r_year + "/" + r_month + "/" + "1").getDay(); //获得本月一号的星期

    var n_time_s = new Date(r_year + "/" + r_month + "/" + "1").getTime(); //获得本月一号的毫秒数

    if (r_month == 12) {
      var n_time_date = new Date(new Date(r_year + 1 + "/1/1").getTime() - 86400000).getDate(); //获得本月的天数
    } else {
      var n_time_date = new Date(new Date(r_year + "/" + parseInt(r_month + 1) + "/" + "1").getTime() - 86400000).getDate(); //获得本月的天数
    }

    month = r_year + '/' + r_month;

    if (z == 0) {
      day = getDate(n_time_date, r_day, n_time_s, r_date);
    } else {
      day = getDate(n_time_date, r_day, n_time_s);
    }

    datelist.push({
      month: month,
      day: day
    });

    if (r_month == 12) {
      r_month = 1;
      r_year++;
    } else {
      r_month++;
    }
  }

  return datelist;
};

const DateDiff = (sDate1, sDate2) => {
  var aDate, oDate1, oDate2, iDays;
  aDate = sDate1.split("-");
  oDate1 = new Date(aDate[0] + '-' + aDate[1] + '-' + aDate[2]);
  aDate = sDate2.split("-");
  oDate2 = new Date(aDate[0] + '-' + aDate[1] + '-' + aDate[2]);
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
  return iDays;
}; // 格式化数字为 123，456，789.13213465


export function numberComma(source, length = 3) {
  source = String(source).split('.');
  source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), '$1,');
  return source.join('.');
} // 保留金额 小数点后 2位

export function formatMoney(money, length = 2) {
  try {
    money += '';
    let result = money.split('.');

    if (result.length > 1) {
      // 有小数点
      let deci = result[1] + 0.000000000000000001;
      deci = deci.slice(0, length);
      result[1] = deci;
    }

    return +result.join('.');
  } catch (error) {
    console.log(error);
  }
} // 检查版本更新

export function checkUpdate() {
  if (tt.canIUse("getUpdateManager")) {
    const updateManager = tt.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log("hasUpdate: " + res.hasUpdate);
    });
    updateManager.onUpdateReady(function (res) {
      tt.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',

        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }

      });
    });
    updateManager.onUpdateFailed(function (res) {
      // 新的版本下载失败
      tt.showModal({
        title: "升级失败",
        content: "新版本更新失败，请检查网格",
        showCancel: false
      });
    });
  } else {
    tt.showModal({
      title: "温馨提示",
      content: '微信版本低，请更新到微信最新版。'
    });
  }
}
/**
 * @param {Number} time 时间戳
 * @param {Boolean} hasWeek 星期
 * @return: {String} 年-月-日 时：分
 */

export function formatDate(time, hasWeek) {
  if (!time) return;
  let d = new Date(time),
      dateStr = '';
  let [year, month, date, week, h, m] = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getDay(), d.getHours(), d.getMinutes()];
  if (month < 10) month = '0' + month;
  if (date < 10) date = '0' + date;
  if (h < 10) h = '0' + h;
  if (m < 10) m = '0' + m;

  if (hasWeek) {
    let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    dateStr = [[year, month, date].join('-'), weeks[week], [h, m].join(':')].join(' ');
  } else {
    dateStr = [[year, month, date].join('-'), [h, m].join(':')].join(' ');
  }

  return dateStr;
}
/**
   * 富文本 标签转义
   * @param {String} str
   * @return: {String} 
   */

export function escape2Html(str) {
  if (!str) return '';
  var arrEntities = {
    'lt': '<',
    'gt': '>',
    'nbsp': ' ',
    'amp': '&',
    'quot': '"'
  };
  str = str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
    return arrEntities[t];
  }).replace('<section', '<div');
  str = str.replace(/<img[^>]*>/gi, function (match, capture) {
    // 修改img  style
    let style = "";
    match = match.replace(/style="[^"]+"/gi, function (m) {
      if (m.indexOf('height') >= 0) {
        m = m.slice(0, -1) + ';max-width:100%;"';
      } else {
        m = m.slice(0, -1) + ';max-width:100%;height:auto;"';
      }

      style = m;
      return "";
    });

    if (!style) {
      style = 'style="max-width:100%;height:auto;"';
    }

    match = match.replace(/width="[^"]+"/gi, '');
    match = match.replace(/height="[^"]+"/gi, '');
    match = match.replace(/<img/gi, "<img " + style);
    return match;
  }); // 去掉<br/>标签

  str = str.replace(/<br[^>]*\/>/gi, '');
  return str;
}
module.exports = {
  formatMoney,
  checkMobile,
  shareData,
  getDateStr,
  getMonthDate,
  DateDiff,
  formatTime,
  ClickToFind,
  getDay,
  getDate,
  numberComma,
  checkUpdate,
  formatDate,
  escape2Html
};