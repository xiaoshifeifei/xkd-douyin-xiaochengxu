var formatTime = require('./util.js'); // value改变时


var date;
var currentHours;
var currentMinute; // 格式化的日期

var formatDate = [];

const dataTimePicker = (multiArray, multiIndex) => {
  // 获取当前时间
  date = new Date();
  currentHours = date.getHours();
  currentMinute = date.getMinutes(); // console.log("date",date,"当前时", currentHours, "当前分", currentMinute, date.getSeconds())

  var monthDay = [];
  var hours = [];
  var minute = [];
  var data = {
    multiArray: multiArray,
    multiIndex: multiIndex,
    formatDate: formatDate
  };
  setMonthDay(monthDay, hours, minute, currentHours, currentMinute);

  if (data.multiIndex[0] === 0) {
    // 今天
    if (data.multiIndex[1] === 0) {
      // 当前时
      // loadDay(monthDay,currentHours,currentMinute)
      loadData(hours, minute, currentHours, currentMinute);
    } else {
      // 非当前时
      loadMinute(hours, minute, currentHours, currentMinute);
    }
  } else {
    // 非当前天
    loadHoursMinute(hours, minute);
  }

  data.multiArray[0] = monthDay;
  data.multiArray[1] = hours;
  data.multiArray[2] = minute;
  data.formatDate = formatDate;
  return data;
};

const dataTimePickerColumnChange = (detail, multiArray, multiIndex) => {
  var that = this;
  var monthDay = [];
  var hours = [];
  var minute = [];
  currentHours = date.getHours();
  currentMinute = date.getMinutes();
  console.log("date", date, "dataTimePickerColumnChange 当前时", currentHours, "当前分", currentMinute, date.getSeconds());
  var data = {
    multiArray: multiArray,
    multiIndex: multiIndex
  }; // 把选择的对应值赋值给 multiIndex

  data.multiIndex[detail.column] = detail.value; // 然后再判断当前改变的是哪一列,如果是第1列改变

  if (detail.column === 0) {
    // 如果第一列滚动到第一行
    if (detail.value === 0) {
      loadData(hours, minute, currentHours, currentMinute);
    } else {
      loadHoursMinute(hours, minute);
    }

    data.multiIndex[1] = 0;
    data.multiIndex[2] = 0; // 如果是第2列改变
  } else if (detail.column === 1) {
    // 如果第一列为今天
    if (data.multiIndex[0] === 0) {
      if (detail.value === 0) {
        loadData(hours, minute, currentHours, currentMinute);
      } else {
        loadMinute(hours, minute, currentHours, currentMinute);
      } // 第一列不为今天

    } else {
      loadHoursMinute(hours, minute);
    }

    data.multiIndex[2] = 0; // 如果是第3列改变
  } else {
    // 如果第一列为'今天'
    if (data.multiIndex[0] === 0) {
      // 如果第一列为 '今天'并且第二列为当前时间
      if (data.multiIndex[1] === 0) {
        loadData(hours, minute, currentHours, currentMinute);
      } else {
        loadMinute(hours, minute, currentHours, currentMinute);
      }
    } else {
      loadHoursMinute(hours, minute);
    }
  }

  setMonthDay(monthDay, hours, minute, currentHours, currentMinute);
  data.multiArray[1] = hours;
  data.multiArray[2] = minute;
  return data;
};

const setMonthDay = (monthDay, hours, minute, currentHours, currentMinute) => {
  let day = []; // 今天日期格式化

  let format = formatTime.getDay(date); // 明天日期格式化

  let formatTomorrow = formatTime.getDateStr(date, 1);

  if (currentHours == 23 && currentMinute == 59) {
    day = ['明天'];
    formatDate = [formatTomorrow];
    loadHoursMinute(hours, minute);
  } else {
    day = ['今天', '明天'];
    formatDate = [format, formatTomorrow];
  }

  monthDay.push(...day);
}; // 从当前时 分 开始存入时间数组


const loadData = (hours, minute, currentHours, currentMinute) => {
  // 如果当前分==60，则小时加一，分钟从0开始
  if (currentMinute == 59) {
    // if (currentHours == 23) {
    //   setMonthDay(monthDay, hours, minute, currentHours, currentMinute)
    // } else {
    // 时
    for (var i = currentHours + 1; i < 24; i++) {
      i = timeFix(i);
      hours.push(i);
    } // 分


    for (var i = 0; i < 60; i++) {
      i = timeFix(i);
      minute.push(i);
    } // }

  } else {
    // 否则小时 分从 当前+1 开始
    // 时
    for (var i = currentHours; i < 24; i++) {
      i = timeFix(i);
      hours.push(i);
    } // 分


    for (var i = currentMinute + 1; i < 60; i++) {
      i = timeFix(i);
      minute.push(i);
    }
  }
}; // 非当前天


const loadHoursMinute = (hours, minute) => {
  // 时
  for (var i = 0; i < 24; i++) {
    i = timeFix(i);
    hours.push(i);
  } // 分


  for (var i = 0; i < 60; i++) {
    i = timeFix(i);
    minute.push(i);
  }
}; // 当前天 非当前时  


const loadMinute = (hours, minute, currentHours, currentMinute) => {
  // 当前分为60，当前时加1
  if (currentMinute == 59) {
    // 时
    for (var i = currentHours + 1; i < 24; i++) {
      i = timeFix(i);
      hours.push(i);
    }
  } else {
    // 时
    for (var i = currentHours; i < 24; i++) {
      i = timeFix(i);
      hours.push(i);
    }
  } // 分


  for (var i = 0; i < 60; i++) {
    i = timeFix(i);
    minute.push(i);
  }
}; // 时间双位数


const timeFix = num => {
  num = num.toString();
  return num[1] ? num : '0' + num;
};

module.exports = {
  dataTimePicker: dataTimePicker,
  dataTimePickerColumnChange
};