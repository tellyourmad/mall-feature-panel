type ICreateFieldInput = {
  [name: string]:
    | string
    | number
    | ICreateFieldInput
    | Array<ICreateFieldInput>;
};

interface ICreateFieldItem {
  name: Array<string | number>;
  value: string | number;
}

type ICreateFieldResult = Array<ICreateFieldItem | Array<ICreateFieldResult>>;

// 将IElement转化为antd form所需的fields
export const obj2FormFields = function(
  data: ICreateFieldInput,
  prefixKeys: Array<string | number> = []
): ICreateFieldResult {
  return Object.entries(data).map(([k1, v1]) => {
    if (Array.isArray(v1)) {
      return v1.map((v2, k2) => {
        return obj2FormFields(v2, prefixKeys.concat(k1, k2));
      });
    }
    if (Object.prototype.toString.call(v1) === "[object Object]") {
      return obj2FormFields(v1 as ICreateFieldInput, prefixKeys.concat(k1));
    }
    return {
      name: prefixKeys.concat(k1),
      value: v1
    };
  }) as ICreateFieldResult;
};
