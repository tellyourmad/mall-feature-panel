import React from "react";
import debounce from "lodash/debounce";
import { Form, Input, Select, Divider } from "antd";
import { FormInstance } from "antd/lib/form";

import ImageUpload from "@src/components/ImageUpload/ImageUpload";
import ColorPicker from "@src/components/ColorPicker/ColorPicker";

import styles from "./BindingForm.module.less";

import {
  IElementValueConditionType,
  IElementValues,
  IElementValueContentType,
  IElementValueGroup
} from "@src/types/element";
import { BgRepeat, BgPosition, BgSize } from "@src/types/ui";
import { SelectProps, SelectValue } from "antd/lib/select";

interface IMySelectProps extends SelectProps<SelectValue> {
  option: any;
}

const MySelect = function(props: IMySelectProps) {
  const { option, ...others } = props;
  return (
    <Select {...others}>
      {Object.values(option).map(vType => (
        <Select.Option key={vType as string} value={vType as string}>
          {(vType as string).toString().toName()}
        </Select.Option>
      ))}
    </Select>
  );
};

interface IBindingFormProps {
  fields: Array<any>;
  values?: IElementValues;
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
    changedFields.values?.map((item: IElementValueGroup, n: number) => {
      if (item?.detail?.bg?.image?.type) {
        // 如果切换了bg的type，则要清空bg的value
        allValues.values[n].detail.bg.image.value = "";
      }
      if (item?.detail?.text?.content?.type) {
        // 如果切换了text的type，则要清空text的value
        allValues.values[n].detail.text.content.value = "";
      }
    });
    this.props.onUpdate(allValues);
  }

  render() {
    const { fields, values = [] } = this.props;
    return (
      <Form
        ref={this.formRef}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        fields={fields}
        onValuesChange={this.handleFormValuesChange.bind(this)}
      >
        {/* 类型 */}
        <Form.Item label="类型" name={["type"]} className={styles.row}>
          <Input disabled />
        </Form.Item>

        {/* 昵称 */}
        <Form.Item label="昵称" name={["nickname"]} className={styles.row}>
          <Input />
        </Form.Item>

        {/* 位置 */}
        <Form.Item label="位置" className={styles.row}>
          <Form.Item name={["position", "x"]} className={styles.inlineItem}>
            <Input type="number" placeholder="x轴" />
          </Form.Item>
          <Form.Item name={["position", "y"]} className={styles.inlineItem}>
            <Input type="number" placeholder="y轴" />
          </Form.Item>
        </Form.Item>

        {/* 尺寸 */}
        <Form.Item label="尺寸" className={styles.row}>
          <Form.Item name={["size", "width"]} className={styles.inlineItem}>
            <Input type="number" placeholder="宽度" />
          </Form.Item>
          <Form.Item name={["size", "height"]} className={styles.inlineItem}>
            <Input type="number" placeholder="高度" />
          </Form.Item>
        </Form.Item>

        <Divider />

        {values.map((item, n) => (
          <div key={item._key}>
            {/* 触发条件 */}
            <Form.Item label="触发条件" className={styles.row}>
              <Form.Item
                name={["values", n, "condition", "type"]}
                className={styles.inlineItem}
              >
                <MySelect option={IElementValueConditionType} />
              </Form.Item>
              {item.condition.type !== IElementValueConditionType.Default ? (
                <Form.Item
                  name={["values", n, "condition", "bundleName"]}
                  className={styles.inlineItem}
                >
                  <Input placeholder="分组名" />
                </Form.Item>
              ) : (
                <></>
              )}
            </Form.Item>

            {/* 背景 */}
            {item.detail.bg ? (
              <>
                <Form.Item label="背景图片" className={styles.row}>
                  <Form.Item
                    name={["values", n, "detail", "bg", "image", "type"]}
                    className={styles.inlineItem}
                  >
                    <MySelect option={IElementValueContentType} />
                  </Form.Item>
                  {item.detail.bg.image?.type ===
                  IElementValueContentType.Fixed ? (
                    <Form.Item
                      key={item.detail.bg.image.type}
                      name={["values", n, "detail", "bg", "image", "value"]}
                      className={styles.inlineItem}
                    >
                      <ImageUpload name={`values.${n}.detail.bg.image.value`} />
                    </Form.Item>
                  ) : (
                    <Form.Item
                      key={item.detail.bg.image?.type}
                      name={[
                        "values",
                        n,
                        "detail",
                        "bg",
                        "image",
                        "bundleName"
                      ]}
                      className={styles.inlineItem}
                    >
                      <Input placeholder="分组名" />
                    </Form.Item>
                  )}
                </Form.Item>
                <Form.Item
                  label="背景重复"
                  name={["values", n, "detail", "bg", "repeat"]}
                  className={styles.row}
                >
                  <MySelect option={BgRepeat} />
                </Form.Item>
                <Form.Item
                  label="背景位置"
                  name={["values", n, "detail", "bg", "position"]}
                  className={styles.row}
                >
                  <MySelect option={BgPosition} />
                </Form.Item>
                <Form.Item
                  label="背景尺寸"
                  name={["values", n, "detail", "bg", "size"]}
                  className={styles.row}
                >
                  <MySelect option={BgSize} />
                </Form.Item>
                <Form.Item
                  label="背景颜色"
                  name={["values", n, "detail", "bg", "color"]}
                  className={styles.row}
                >
                  <ColorPicker />
                </Form.Item>
              </>
            ) : (
              <></>
            )}

            {/* 文字 */}
            {item.detail.text ? (
              <>
                <Form.Item label="文字" className={styles.row}>
                  <Form.Item
                    name={["values", n, "detail", "text", "content", "type"]}
                    className={styles.inlineItem}
                  >
                    <MySelect option={IElementValueContentType} />
                  </Form.Item>
                  {item.detail.text.content?.type ===
                  IElementValueContentType.Fixed ? (
                    <Form.Item
                      key={item.detail.text.content.type}
                      name={["values", n, "detail", "text", "content", "value"]}
                      className={styles.inlineItem}
                    >
                      <Input placeholder="文本内容" />
                    </Form.Item>
                  ) : (
                    <Form.Item
                      key={item.detail.text.content?.type}
                      name={[
                        "values",
                        n,
                        "detail",
                        "bg",
                        "image",
                        "bundleName"
                      ]}
                      className={styles.inlineItem}
                    >
                      <Input placeholder="分组名" />
                    </Form.Item>
                  )}
                </Form.Item>
                <Form.Item
                  label="最大行数"
                  name={["values", n, "detail", "text", "maxLine"]}
                  className={styles.row}
                >
                  <Input name="number" step={1}  min={1} placeholder="行数" />
                </Form.Item>
                <Form.Item
                  label="行高"
                  name={["values", n, "detail", "text", "lineHeight"]}
                  className={styles.row}
                >
                  <Input name="number" step={0.5} min={1} placeholder="倍数" />
                </Form.Item>
                <Form.Item
                  label="字体大小"
                  name={["values", n, "detail", "text", "size"]}
                  className={styles.row}
                >
                  <Input name="number" step={1} min={12} placeholder="px" />
                </Form.Item>
                <Form.Item
                  label="字体颜色"
                  name={["values", n, "detail", "text", "color"]}
                  className={styles.row}
                >
                  <ColorPicker />
                </Form.Item>
              </>
            ) : (
              <></>
            )}
          </div>
        ))}
      </Form>
    );
  }
}
export default BindingForm;
