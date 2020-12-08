let app = getApp();

const isBusiness = menuId => {
  console.log("app", app);
  let zlXcxMenus = app.globalData.zlXcxMenus;
  let businessHours = null;
  zlXcxMenus.forEach(element => {
    if (element.menuid == menuId) {
      businessHours = element.businessHoursVO;
      console.log("菜单类型", element);
    }
  });

  if (businessHours) {
    let currentTime = Date.parse(new Date()); //当前时间戳

    let startTime = businessHours.startBusinessHours; //开始时间戳

    let endTime = businessHours.endBusinessHours; //结束时间戳

    if (currentTime >= startTime && currentTime <= endTime) {
      console.log("当前时间在营业范围内", currentTime);
      return true;
    }

    return false;
  }

  console.log("营业范围", businessHours);
};

module.exports = {
  isBusiness
};