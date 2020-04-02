import { BgRepeat, BgPosition, BgSize } from "@src/types/ui";
import {
  IElementType,
  IElementValueConditionType,
  IElementValueContentType
} from "@src/types/element";

// eslint-disable-next-line no-extend-native
String.prototype.toName = function(options = {}) {
  const { prefix = "", suffix = "" } = options;
  let str = this.toString();
  switch (str) {
    // BgRepeat
    case BgRepeat.Repeat:
      str = "重复绘制";
      break;
    case BgRepeat.NoRepeat:
      str = "非重复绘制";
      break;

    // BgPosition
    case BgPosition.Center:
      str = "居中";
      break;
    case BgPosition.Left:
      str = "居左";
      break;
    case BgPosition.Right:
      str = "居右";
      break;
    case BgPosition.Top:
      str = "居上";
      break;
    case BgPosition.Bottom:
      str = "居下";
      break;

    // BgSize
    case BgSize.Contain:
      str = "适应";
      break;
    case BgSize.Cover:
      str = "覆盖";
      break;
    case BgSize.Auto:
      str = "自动";
      break;
    case BgSize.Fill:
      str = "拉伸";
      break;

    // IElementType
    case IElementType.BuiltIn:
      str = "内置";
      break;
    case IElementType.Text:
      str = "文字";
      break;
    case IElementType.Image:
      str = "图片";
      break;
    case IElementType.Button:
      str = "按钮";
      break;

    // IElementValueConditionType
    case IElementValueConditionType.Default:
      str = "默认";
      break;
    case IElementValueConditionType.ProductOutStock:
      str = "商品售罄";
      break;
    case IElementValueConditionType.Custom:
      str = "自定义";
      break;

    // IElementValueItemSlotType
    case IElementValueContentType.Fixed:
      str = "固定图片";
      break;
    case IElementValueContentType.Product:
      str = "商品";
      break;

    // 其他
    default:
      return str;
  }
  return prefix + str + suffix;
};
