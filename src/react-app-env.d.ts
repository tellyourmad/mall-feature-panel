/// <reference types="react-scripts" />

declare module "*.module.less" {
  const classes: { [key: string]: string };
  export default classes;
}

interface IToNameOptions {
  prefix?: string;
  suffix?: string;
}

type SNO = string | number | object;

declare interface String {
  toName(options?: IToNameOptions): string;
}

declare interface Array {
  flat(): Array<SNO | Array<SNO>>;
}

declare interface IMenuItem {
  title: string;
  path?: string;
  children?: Array<IMenuItem>;
}

declare interface IRouteItem {
  path: string;
  exact?: boolean = false;
  name?: string;
  redirect?: string;
  component?: any;
}
