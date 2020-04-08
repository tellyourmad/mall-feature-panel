import {
  IElement,
  IElementType,
  IElementValueConditionType,
  IElementValueDetail,
  IElementValueContentType
} from "@src/types/element";
import {
  UISize,
  UIPosition,
  BgRepeat,
  BgPosition,
  BgSize
} from "@src/types/ui";
import { v1 as uuidv1, v4 as uuidv4 } from "uuid";

export default class ElementStore {
  // 图片
  getImageDefaultValue = (): IElementValueDetail =>
    ({
      bg: {
        image: {
          type: IElementValueContentType.Fixed,
          value: ""
        },
        repeat: BgRepeat.NoRepeat,
        position: BgPosition.Center,
        size: BgSize.Contain,
        color: ""
      }
    } as const);

  // 文本
  getTextDefaultValue = (): IElementValueDetail =>
    ({
      text: {
        content: {
          type: IElementValueContentType.Fixed,
          value: ""
        },
        maxLine: 1,
        lineHeight: 1,
        size: "inherit",
        color: "#000"
      }
    } as const);

  getButtonDefaultValue = (): IElementValueDetail => ({
    ...this.getImageDefaultValue(),
    ...this.getTextDefaultValue()
  });

  // 创建新的element
  createItem = (
    type: IElementType,
    size: UISize,
    position: UIPosition,
    zIndex: number
  ): IElement | null => {
    const result: IElement = {
      nickname: "",
      id: uuidv1(),
      type,
      position,
      size,
      zIndex,
      values: [
        {
          _key: uuidv4(),
          condition: {
            type: IElementValueConditionType.Default
          },
          detail: {}
        }
      ]
    };
    switch (type) {
      case IElementType.Image:
        result.nickname = "图片";
        result.values[0].detail = this.getImageDefaultValue();
        break;
      case IElementType.Text:
        result.nickname = "文字";
        result.values[0].detail = this.getTextDefaultValue();
        break;
      case IElementType.Button:
        result.nickname = "按钮";
        result.values[0].detail = this.getButtonDefaultValue();
        break;
      case IElementType.BuiltIn:
      default:
        return null;
    }
    return result;
  };
}
