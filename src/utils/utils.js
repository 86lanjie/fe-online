const utils = {
  /**
   * @method 函数防抖
   * @desc 短时间内多次触发同一事件，只执行最后一次，或者只执行最开始的一次，中间的不执行。
   * @param func 目标函数
   * @param wait 延迟执行毫秒数
   * @param immediate true - 立即执行， false - 延迟执行
   */
  debounce(func, wait = 1000, immediate = true) {
    let timer;
    return function () {
      let context = this,
        args = arguments;
      if (timer) clearTimeout(timer);
      if (immediate) {
        let callNow = !timer;
        timer = setTimeout(() => {
          timer = null;
        }, wait);
        if (callNow) func.apply(context, args);
      } else {
        timer = setTimeout(() => {
          func.apply(context, args);
        }, wait);
      }
    };
  },
  /**
   * @method 函数节流
   * @desc 指连续触发事件，但是在 n 秒内只执行一次函数。即 2n 秒内执行 2 次... 。会稀释函数的执行频率。
   * @param func 函数
   * @param wait 延迟执行毫秒数
   * @param type 1 在时间段开始的时候触发 2 在时间段结束的时候触发
   */
  throttle(func, wait = 1000, type = 1) {
    let previous = 0;
    let timeout;
    return function () {
      let context = this;
      let args = arguments;
      if (type === 1) {
        let now = Date.now();
        if (now - previous > wait) {
          func.apply(context, args);
          previous = now;
        }
      } else if (type === 2) {
        if (!timeout) {
          timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
          }, wait);
        }
      }
    };
  },
};

export default utils;
