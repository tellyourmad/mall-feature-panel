import React from "react";
import { observer, inject } from "mobx-react";
import BindingForm from "./BindingForm/BindingForm";
import MaterialStore from "@store/material.store";
import styles from "./BasicInfo.module.less";

interface IControlPanelProps {}

interface InjectedProps extends IControlPanelProps {
  store: MaterialStore;
}

@inject("store")
@observer
export default class BasicInfo extends React.Component<IControlPanelProps> {
  get injected() {
    return this.props as InjectedProps;
  }
  get fields() {
    const { width, height, name } = this.injected.store;
    return [
      { name: "width", value: width },
      { name: "height", value: height },
      { name: "name", value: name }
    ];
  }
  get limit() {
    const { requireMinHeight, requireMinWidth, options } = this.injected.store;
    const { maxHeight, maxWidth } = options;

    return {
      width: {
        max: maxWidth,
        min: requireMinWidth
      },
      height: {
        max: maxHeight,
        min: requireMinHeight
      }
    };
  }
  private handleUpdate(allValues: any) {
    this.injected.store.updateBasicInfo(allValues);
  }
  render() {
    return (
      <div className={styles.basicInfo}>
        <BindingForm
          fields={this.fields}
          onUpdate={this.handleUpdate.bind(this)}
          limit={this.limit}
        />
      </div>
    );
  }
}
