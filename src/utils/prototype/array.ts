// 平铺数组
// eslint-disable-next-line no-extend-native
Array.prototype.flat = function() {
  let result: SNO[] = [];
  for (let item of this) {
    if (Array.isArray(item)) {
      result = result.concat(item.flat());
    } else {
      result = result.concat(item);
    }
  }
  return result;
};

// 数组去重
// eslint-disable-next-line no-extend-native
Array.prototype.distinct = function(getKey) {
  let result = [];
  let obj: any = {};

  for (let i of this) {
    const key = getKey ? getKey(i) : i;
    if (!obj[key]) {
      result.push(i);
      obj[key] = true;
    }
  }

  return result;
};

export {};
