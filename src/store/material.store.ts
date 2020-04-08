import { observable, action, computed, toJS } from "mobx";
import {
  Material,
  MaterialAtom,
  MaterialAtomType,
  MaterialAtomImageStyle,
  MaterialAtomTextStyle
} from "@src/types/material";
import {
  UISize,
  UIPosition,
  BgRepeat,
  BgPosition,
  BgSize,
  TextAlign
} from "@src/types/ui";
import { v1 as uuidv1, v4 as uuidv4 } from "uuid";
import { getAvailableFontFamily } from "@src/utils/font";

// 图片
export const getImageDefaultStyle = (): MaterialAtomImageStyle =>
  ({
    replaceable: false,
    content: "",
    repeat: BgRepeat.NoRepeat,
    position: BgPosition.Center,
    size: BgSize.Contain
  } as const);

// 文本
export const getTextDefaultStyle = (): MaterialAtomTextStyle =>
  ({
    replaceable: false,
    content: "",
    align: TextAlign.Center,
    family: getAvailableFontFamily()[0].key,
    bold: false,
    italic: false,
    lineThrough: false,
    size: 12,
    color: "#000"
  } as const);

interface IFormData {
  [name: string]: any;
}

export interface IOptions {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  atomMinSize?: number;
}

export default class MaterialStore {
  @observable name: string = "";

  @observable list: Array<MaterialAtom> = [];
  @observable currentId: string | null = null;

  @observable width: number = 375;

  @observable height: number = 500;

  options = {
    minWidth: 1,
    maxWidth: 3840,
    minHeight: 1,
    maxHeight: 2160,
    atomMinSize: 1
  };

  constructor(material?: Material | null, options?: IOptions) {
    this.init(material);
    this.options = Object.assign(this.options, options || {});
  }

  @computed
  get getCurrentAtom(): MaterialAtom | null {
    const list = this.getList;
    for (let n in list) {
      if (list[n].id === this.currentId) {
        return toJS(list[n]);
      }
    }
    return null;
  }

  @computed
  get getList(): Array<MaterialAtom> {
    return toJS(this.list);
  }

  @computed
  get MAX_Z_INDEX(): number {
    return Math.max(0, ...this.list.map((item, index) => +index + 1));
  }

  @computed
  get requireMinHeight(): number {
    return Math.max(
      this.options.minHeight,
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

  @computed
  get requireMinWidth(): number {
    return Math.max(
      this.options.minWidth,
      ...this.list.map(item => {
        let num = 0;
        if (item.size.width) {
          num += item.size.width;
        }
        if (item.position.x) {
          num += item.position.x;
        }
        return num;
      })
    );
  }

  @action init = (material?: Material | null) => {
    if (typeof material !== "undefined" && material !== null) {
      this.name = material.name;
      this.list = material.elements;
      this.height = material.height;
      this.width = material.width;
    }
  };

  // 调整面板的尺寸
  @action resizePlane = (size: UISize) => {
    let { width, height } = size;
    if (typeof height !== "undefined") {
      if (height < this.options.minHeight) {
        height = this.options.minHeight;
      } else if (height > this.options.maxHeight) {
        height = this.options.maxHeight;
      }
      this.height = height;
    }
    if (typeof width !== "undefined") {
      if (width < this.options.minWidth) {
        width = this.options.minWidth;
      } else if (width > this.options.maxWidth) {
        width = this.options.maxWidth;
      }
      this.width = width;
    }
  };

  // 调整面板的基本参数（width、height、name）
  @action updateBasicInfo = (formData: IFormData) => {
    const { width, height, name } = formData;
    this.resizePlane({
      width,
      height
    });
    this.name = name;
  };

  // 公共方法，用于创建一个新的atom（也被用于在别的组件中构建初始数据）
  public createAtom = (
    type: MaterialAtomType,
    size: UISize,
    position: UIPosition
  ): MaterialAtom | null => {
    const result: MaterialAtom = {
      nickname: "",
      id: uuidv1(),
      type,
      position,
      size,
      rotateZ: 0
    };
    switch (type) {
      case MaterialAtomType.Image:
        result.nickname = "图片";
        result.image = getImageDefaultStyle();
        break;
      case MaterialAtomType.Text:
        result.nickname = "文字";
        result.text = getTextDefaultStyle();
        break;
      default:
        return null;
    }
    return result;
  };

  // 往list中添加一个atom
  @action addAtom = (
    type: MaterialAtomType,
    size: UISize,
    position: UIPosition
  ) => {
    const newOne = this.createAtom(type, size, position);
    newOne && this.list.push(newOne);
  };

  // 私有方法，用以通过id查找对应的atom
  private getTargetAtom = (
    id: string | null,
    callback: (item: MaterialAtom, index: number) => void
  ) => {
    for (let n = 0; n < this.list.length; n++) {
      if (this.list[n].id === id) {
        callback(this.list[n], n);
        break;
      }
    }
  };

  // 选中目标atom
  @action selectAtom = (id: string | null) => {
    this.currentId = id;
  };

  // 删除目标atom
  @action deleteAtom = (id: string) => {
    this.getTargetAtom(id, (item, n) => this.list.splice(n, 1));
    if (id === this.currentId) {
      this.currentId = null;
    }
  };

  // 移动目标atom的位置
  @action moveTargetAtom = (id: string, position: UIPosition) => {
    this.getTargetAtom(id, (item, n) => (this.list[n].position = position));
  };

  // 调整目标atom的尺寸
  @action resizeTargetAtom = (
    id: string,
    position: UIPosition,
    size: UISize
  ) => {
    this.getTargetAtom(id, (item, n) => {
      let { width, height } = size;
      // atom的尺寸是有最小限制的
      width < this.options.atomMinSize && (width = this.options.atomMinSize);
      height < this.options.atomMinSize && (height = this.options.atomMinSize);
      this.list[n] = {
        ...item,
        position,
        size: {
          width,
          height
        }
      };
    });
  };

  // 修改source在数组中的位置
  @action changeTargetAtomIndex(sourceIndex: number, targetIndex: number) {
    const result = Array.from(this.list);
    const [removed] = result.splice(sourceIndex, 1);
    result.splice(targetIndex, 0, removed);
    this.list = result;
  }

  // 更新目标atom（在form表单中使用）
  @action updateCurrentAtom = (formData: IFormData) => {
    // console.log(formData);
    this.getTargetAtom(
      this.currentId,
      (item, n) =>
        (this.list[n] = {
          ...this.list[n],
          ...formData
        })
    );
  };
}
