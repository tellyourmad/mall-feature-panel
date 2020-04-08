import {
  UISize,
  UIPosition,
  TextAlign,
  BgRepeat,
  BgPosition,
  BgSize,
  HEXA
} from "./ui";
import { ImageUrl, BundleName } from "./common";

export interface Material {
  name: string;
  width: number;
  height: number;
  elements: Array<MaterialAtom>;
}

export enum MaterialAtomType {
  Text = "TEXT",
  Image = "IMAGE"
}

export interface MaterialAtom {
  id: string;
  nickname: string;
  type: MaterialAtomType;
  size: UISize;
  position: UIPosition;
  // zIndex: number;
  rotateZ: number; // 旋转角度
  text?: MaterialAtomTextStyle;
  image?: MaterialAtomImageStyle;
}

export interface MaterialAtomTextStyle {
  replaceable: boolean; // 内容是否可被替换
  bundleName?: BundleName;
  content: string; // 内容
  align: TextAlign; // 对齐方式
  family: string; // 字体
  bold: boolean; // 是否加粗
  italic: boolean; // 是否斜体
  lineThrough: boolean; // 是否划线
  size: number; // 大小
  color: HEXA; // 颜色
}

export interface MaterialAtomImageStyle {
  replaceable: boolean; // 内容是否可被替换
  bundleName?: BundleName;
  content: ImageUrl; // 内容
  repeat: BgRepeat;
  position: BgPosition;
  size: BgSize;
}
