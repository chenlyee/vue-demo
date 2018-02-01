var Time = {
  // 获取当前时间戳
  getUnix: function() {
    return new Date();
  },
  // 获取今天 0 时 0 分 0 秒的时间戳
  getTodayUnix: function() {
    return (new Date()).setHours(0, 0, 0, 0);
  },
  // 获取今年1月1日0时0分0秒的时间戳
  getYearUnix: function() {
    let day = (new Date()).setMonth(0, 1);

    // debugger;
    return new Date(day).setHours(0, 0, 0, 0);
  },
  // 获取标准格式化的年月
  getLastDate: function(time) {
    const date = new Date(time);
    const month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
    const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    return date.getFullYear() + '-' + month + '-' + day;
  },
  // 转换为提示时间格式
  getFormatTime: function(timestamp) {
    const now = new Date();
    const today = this.getTodayUnix(now);
    const year = this.getYearUnix(now);

    const timeDiff = (now - timestamp) / 1000;
    let tip = '';

    if (timeDiff <= 0) {
      tip = '刚刚';
    } else if (timeDiff / 60 < 1) {
      tip = '刚刚';
    } else if (timeDiff < 3600) {
      tip = Math.floor(timeDiff / 60) + '分钟前';
    } else if (timestamp >= today) {
      tip = Math.floor(timeDiff / 3600) + '小时前';
    } else if (timestamp >= year) {
      tip = Math.floor(timeDiff / (24 * 3600)) + '天前'
    } else {
      tip = this.getLastDate(timestamp);
    }

    return tip;
  }
}

Vue.directive('time', {
  bind: function(el, binding) {
    el.innerHTML = Time.getFormatTime(binding.value);
    el.__timeout__ = setInterval(function() {
      el.innerHTML = Time.getFormatTime(binding.value);
    }, 60000);
  },
  unbing: function(el) {
    clearInterval(el.__timeout__);
    delete el.__timeout__;
  }
})