export enum BgRepeat {
  NoRepeat = "no-repeat",
  Repeat = "repeat"
}

export enum BgPosition {
  Center = "center",
  Left = "left",
  Right = "right",
  Top = "top",
  Bottom = "bottom"
}

export enum BgSize {
  Contain = "contain",
  Cover = "cover",
  Auto = "auto",
  Fill = "100% 100%"
}

export enum TextAlign {
  Left = "left",
  Center = "center",
  Right = "right"
}

export interface UISize<T extends boolean = false> {
  width: T extends true ? "100%" : number;
  height: T extends true ? "100%" : number;
}

export interface UIPosition {
  x?: number;
  y?: number;
}

export type CSSTransparent = "transparent";
export type CSSInherit = "inherit";
export type CSSAuto = "auto";

// export enum CSSUnitOfSize {
//   // 没有百分比
//   RPX = 'rpx',
//   REM = 'rem',
//   EM = 'em'
// }

export type HEX = string;
export type HEXA = string;
export interface IColor {
  color: HEX;
  alpha: number;
}

/**
 * Component
 */
export enum ComponentType {
  MultiProduct,

  Custom
}
export interface Component {
  id: string;
  name: string;
  type: ComponentType;
  s: Array<string>;
}
