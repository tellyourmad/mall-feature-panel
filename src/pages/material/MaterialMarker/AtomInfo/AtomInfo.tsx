import React from "react";
import { observer, inject } from "mobx-react";
import BindingForm from "./BindingForm/BindingForm";
import { obj2FormFields } from "@src/utils/form";
import MaterialStore from "@store/material.store";
import styles from "./AtomInfo.module.less";

interface IControlPanelProps {}

interface InjectedProps extends IControlPanelProps {
  store: MaterialStore;
}

@inject("store")
@observer
export default class Info extends React.Component<IControlPanelProps> {
  get injected() {
    return this.props as InjectedProps;
  }
  get fields() {
    return obj2FormFields(
      (this.injected.store.getCurrentAtom as any) || {}
    ).flat();
  }
  private handleUpdate(allValues: any) {
    this.injected.store.updateCurrentAtom(allValues);
  }
  render() {
    const { currentId, getCurrentAtom, options } = this.injected.store;
    // console.log(currentId, this.fields, getCurrentItem);
    if (!currentId) {
      return <div>...</div>;
    }
    return (
      <div className={styles.atomInfo}>
        <BindingForm
          key={currentId}
          type={getCurrentAtom?.type}
          fields={this.fields}
          options={options}
          onUpdate={this.handleUpdate.bind(this)}
        />
      </div>
    );
  }
}
