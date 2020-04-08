import React from "react";
import debounce from "lodash/debounce";
import { Form, Input, InputNumber } from "antd";
import { FormInstance } from "antd/lib/form";

import styles from "./BindingForm.module.less";

interface IBindingFormProps {
  fields: Array<any>;
  limit: any;
  onUpdate: (data: any) => void;
}

interface IStore {
  [name: string]: any;
}

class BindingForm extends React.Component<IBindingFormProps> {
  formRef = React.createRef<FormInstance>();

  // debounce render
  updateDebounced = debounce(this.forceUpdate, 100, { leading: false });
  shouldComponentUpdate() {
    this.updateDebounced();
    return false;
  }
  componentWillUnmount() {
    this.updateDebounced.cancel();
  }

  handleFormValuesChange(changedFields: IStore, allValues: IStore) {
    this.props.onUpdate(allValues);
  }

  render() {
    const { fields, limit } = this.props;
    return (
      <Form
        className={styles.form}
        ref={this.formRef}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        fields={fields}
        onValuesChange={this.handleFormValuesChange.bind(this)}
      >
        {/* 名称 */}
        <Form.Item label="模版名称" name="name" className={styles.row}>
          <Input />
        </Form.Item>

        {/* 尺寸 */}
        <Form.Item label="模版尺寸" className={styles.row}>
          <Form.Item
            name="width"
            className={styles.inlineItem}
            style={{ flex: "none" }}
          >
            <InputNumber {...limit.width} placeholder="宽度" />
          </Form.Item>
          <Form.Item
            name="height"
            className={styles.inlineItem}
            style={{ flex: "none" }}
          >
            <InputNumber {...limit.height} placeholder="高度" />
          </Form.Item>
        </Form.Item>
      </Form>
    );
  }
}
export default BindingForm;
