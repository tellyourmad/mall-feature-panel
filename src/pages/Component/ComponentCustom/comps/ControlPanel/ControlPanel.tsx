import React from "react";
import { toJS } from "mobx";
import { observer, inject } from "mobx-react";
import BindingForm from "./BindingForm/BindingForm";
import ComponentStore from "@store/component.store";
import styles from "./ControlPanel.module.less";

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
const createField = function(
  data: ICreateFieldInput,
  prefixKeys: Array<string | number> = []
): ICreateFieldResult {
  return Object.entries(data).map(([k1, v1]) => {
    if (Array.isArray(v1)) {
      return v1.map((v2, k2) => {
        return createField(v2, prefixKeys.concat(k1, k2));
      });
    }
    if (Object.prototype.toString.call(v1) === "[object Object]") {
      return createField(v1 as ICreateFieldInput, prefixKeys.concat(k1));
    }
    return {
      name: prefixKeys.concat(k1),
      value: v1
    };
  }) as ICreateFieldResult;
};

interface IControlPanelProps {}

interface InjectedProps extends IControlPanelProps {
  store: ComponentStore;
}

@inject("store")
@observer
export default class ControlPanel extends React.Component<IControlPanelProps> {
  get injected() {
    return this.props as InjectedProps;
  }
  get fields() {
    const r = createField(
      toJS(this.injected.store.getCurrentItem || {})
    ).flat();
    // console.log(r);
    return r;
  }
  private handleUpdate(allValues: any) {
    this.injected.store.updateCurrentElement(allValues);
  }
  render() {
    const { currentId, getCurrentItem } = this.injected.store;
    // console.log(currentId, this.fields, getCurrentItem);
    if (!currentId) {
      return <div>...</div>;
    }
    return (
      <div className={styles.controlPanel}>
        <BindingForm
          key={currentId}
          fields={this.fields}
          values={getCurrentItem?.values}
          onUpdate={this.handleUpdate.bind(this)}
        />
      </div>
    );
  }
}
