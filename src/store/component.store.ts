import { observable, action, computed, toJS } from "mobx";
import {
  IElement,
  IElementType,
  IElementValueConditionType,
  IElementValueContentType
} from "@src/types/element";
import {
  UISize,
  UIPosition,
  BgRepeat,
  BgPosition,
  BgSize
} from "@src/types/ui";
import { IComponent } from "@src/types/component";

import ElementStore from "@store/element.store";
const elementStore = new ElementStore();

interface IFormData {
  [name: string]: any;
}

export default class ComponentStore {
  // @observable list: Array<IElement> = [];
  @observable list: Array<IElement> = [
    {
      nickname: "图片",
      id: "eb5a0b20-6f38-11ea-b56e-fd11cb4321c9",
      type: IElementType.Image,
      position: { x: 85.046875, y: 56 },
      size: { width: 60, height: 60 },
      zIndex: 1,
      values: [
        {
          _key: "123123123",
          condition: { type: IElementValueConditionType.Default },
          detail: {
            bg: {
              image: {
                type: IElementValueContentType.Fixed,
                value:
                  "https://cn.bing.com/sa/simg/SharedSpriteDesktop_ClearX_2x_030520.png?v=123"
              },
              repeat: BgRepeat.NoRepeat,
              position: BgPosition.Center,
              size: BgSize.Contain,
              color: ""
            },
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
          }
        }
      ]
    }
  ];
  // @observable currentId: string | null = null;
  @observable currentId: string | null = "eb5a0b20-6f38-11ea-b56e-fd11cb4321c9";
  width: number = 375;
  @observable height: number = 500;
  minHeight: number = 50;
  maxHeight: number = 700;

  constructor(comp?: IComponent) {
    if (typeof comp === "undefined") {
      return;
    }
    this.list = comp.elements;
    this.height = comp.height;
  }

  @computed
  get getCurrentItem(): IElement | null {
    for (let n in this.list) {
      if (this.list[n].id === this.currentId) {
        return toJS(this.list[n]);
      }
    }
    return null;
  }

  @computed
  get getList(): Array<IElement> {
    return toJS(this.list);
  }

  @computed
  get MAX_Z_INDEX(): number {
    return Math.max(0, ...this.list.map(item => +item.zIndex));
  }

  @computed
  get requireMinHeight(): number {
    return Math.max(
      this.minHeight,
      ...this.list.map(item => {
        let num = 0;
        if (item.size.height) {
          num += item.size.height;
        }
        if (item.position.y) {
          num += item.position.y;
        }
        return num;
      })
    );
  }

  @action addElement = (
    type: IElementType,
    size: UISize,
    position: UIPosition,
    zIndex?: number
  ) => {
    if (typeof zIndex === "undefined") {
      zIndex = this.MAX_Z_INDEX + 1;
    }
    const newOne = elementStore.createItem(type, size, position, zIndex);
    newOne && this.list.push(newOne);
  };

  private getTargetElement = (
    id: string | null,
    callback: (item: IElement, index: number) => void
  ) => {
    for (let n = 0; n < this.list.length; n++) {
      if (this.list[n].id === id) {
        callback(this.list[n], n);
        break;
      }
    }
  };

  @action deleteElement = (id: string) => {
    this.getTargetElement(id, (item, n) => this.list.splice(n, 1));
    if (id === this.currentId) {
      this.currentId = null;
    }
  };

  @action selectElement = (id: string | null) => {
    this.currentId = id;
  };

  @action moveTargetElement = (id: string, position: UIPosition) => {
    this.getTargetElement(id, (item, n) => (this.list[n].position = position));
  };

  @action resizeTargetElement = (
    id: string,
    position: UIPosition,
    size: UISize
  ) => {
    this.getTargetElement(
      id,
      (item, n) =>
        (this.list[n] = {
          ...item,
          position,
          size
        })
    );
  };

  @action resizeComponent = (height: number) => {
    this.height = height;
  };

  @action updateCurrentElement = (formData: IFormData) => {
    console.log(formData);
    this.getTargetElement(
      this.currentId,
      (item, n) =>
        (this.list[n] = {
          ...this.list[n],
          ...formData
        })
    );
  };
}
