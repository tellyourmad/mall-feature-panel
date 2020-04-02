// eslint-disable-next-line no-extend-native
Array.prototype.flat = function() {
  let result: SNO[] = [];
  for(let item of this){
      if(Array.isArray(item)){
          result = result.concat(item.flat())
      } else {
          result = result.concat(item)
      }
  }
  return result
};

export {};
