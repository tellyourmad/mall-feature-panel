/* eslint-disable no-extend-native */
import {
  UISize,
  UIPosition,
  BgRepeat,
  BgPosition,
  BgSize,
  HEXA,
  CSSTransparent,
  CSSInherit,
  CSSAuto
} from "./ui";
import { Hotspot } from "./hotspot";
import { BundleName } from "./common";

export enum IElementType {
  BuiltIn = "BUILT_IN", // 内置
  Text = "TEXT",
  Image = "IMAGE",
  Button = "BUTTON"
}

export enum IElementValueConditionType {
  Default = "DEFAULT",
  ProductOutStock = "PRODUCT_OUT_STOCK",
  Custom = "CUSTOM"
}

// export enum IElementValueItemType {
//   Empty = "EMPTY", // 空
//   Raw = "RAW", // 不特殊处理（用于UnitType.BuiltIn）
//   Text = "TEXT", // 纯文本
//   Background = "BACKGROUN",
//   BgColor = "BG_COLOR"
// }

export enum IElementValueContentType {
  Fixed = "FIXED",
  Product = "PRODUCT"
}

// export type RemoveUndefinable<Type> = {
//   [Key in keyof Type]: undefined extends Type[Key] ? never : Key;
// }[keyof Type];

// export type RemoveNullableProperties<Type> = {
//   [Key in RemoveUndefinable<Type>]: Type[Key];
// };

// export type IElementValueItem = _IElementValueItem<IElementValueItemType>;

// export type IElementValueItemRemoveNull = RemoveNullableProperties<
//   _IElementValueItem<IElementValueItemType>
// >;

export type IElementValues = Array<IElementValueGroup>;

export interface IElement {
  id: string;
  nickname: string;
  type: IElementType;
  size: UISize;
  position: UIPosition;
  zIndex: number;
  hotspot?: Hotspot<true>;
  values: IElementValues;
}

export interface IElementValueGroup {
  _key: string;
  condition: IElementValueCondition;
  detail: IElementValueDetail;
}

export interface IElementValueCondition {
  type: IElementValueConditionType;
  bundleName?: BundleName;
  value?: string;
}

export interface IElementValueContent<T> {
  type: IElementValueContentType;
  bundleName?: BundleName;
  value: T;
}

export interface IElementValueDetail {
  text?: IElementValueTextStyle;
  bg?: IElementValueBgStyle;
}

export interface IElementValueTextStyle {
  hidden?: boolean;
  content?: IElementValueContent<string>;
  maxLine?: number
  lineHeight?: number;
  size?: number | CSSInherit;
  color?: string | CSSInherit | CSSTransparent;
}

export interface IElementValueBgStyle {
  hidden?: boolean;
  image?: IElementValueContent<string>;
  repeat?: BgRepeat;
  position?: BgPosition;
  size?: BgSize;
  color?: HEXA | CSSTransparent;
}

// /**
//  * IElement
//  */

// // 内置元素
// export interface IElementBuiltIn extends IElement {
//   type: IElementType.BuiltIn;
//   values: Array<
//     IElementValueGroup<
//       Array<
//         RemoveNullableProperties<IElementValueItem<IElementValueItemType.Raw>>
//       >
//     >
//   >;
// }

// // 图片
// export interface IElementImage extends IElement {
//   type: IElementType.Image;
//   values: Array<
//     IElementValueGroup<
//       [RemoveNullableProperties<IElementValueItem<IElementValueItemType.BgSrc>>]
//     >
//   >;
// }

// // 文本
// export interface IElementText extends IElement {
//   type: IElementType.Text;
//   values: Array<
//     IElementValueGroup<
//       [
//         RemoveNullableProperties<
//           IElementValueItem<
//             IElementValueItemType.Text | IElementValueItemType.TextSlot
//           >
//         >
//       ]
//     >
//   >;
// }

// // 按钮
// export interface IElementButton extends IElement {
//   type: IElementType.Button;
//   values: Array<
//     IElementValueGroup<
//       [
//         RemoveNullableProperties<
//           IElementValueItem<IElementValueItemType.BgSrc>
//         >,
//         RemoveNullableProperties<
//           IElementValueItem<
//             IElementValueItemType.Text | IElementValueItemType.TextSlot
//           >
//         >
//       ]
//     >
//   >;
// }
