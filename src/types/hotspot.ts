import { UISize, UIPosition } from "./ui";
import { BundleName } from "./common";

export enum HotspotTriggerType {
  Feature,
  Product,
  ProductCate,
  Link,
  Max,
  AddToCart
}

export interface Hotspot<T extends boolean> {
  size: UISize<T>;
  position: UIPosition;
  zIndex: number;
  type: HotspotTriggerType;
  value?: string;
  bundleName?: BundleName;
}
