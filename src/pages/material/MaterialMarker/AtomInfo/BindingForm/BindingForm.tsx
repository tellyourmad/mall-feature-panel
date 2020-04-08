import React from "react";
import debounce from "lodash/debounce";
import { Form, Input, InputNumber, Select, Radio, Divider } from "antd";
import { FormInstance } from "antd/lib/form";

import ImageUpload from "@components/form/ImageUpload/ImageUpload";
import ColorPicker from "@components/form/ColorPicker/ColorPicker";
import SwitchBtn from "@src/components/form/SwitchBtn/SwitchBtn";

import { MaterialAtomType } from "@src/types/material";
import { BgRepeat, BgPosition, BgSize, TextAlign } from "@src/types/ui";
import { SelectProps, SelectValue } from "antd/lib/select";
import { RadioGroupProps } from "antd/lib/radio";

import styles from "./BindingForm.module.less";
import { getAvailableFontFamily } from "@src/utils/font";
import { IOptions } from "@src/store/material.store";

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

interface IMyRadioProps extends RadioGroupProps {
  option: any;
}

const MyRadio = function(props: IMyRadioProps) {
  const { option, ...others } = props;
  return (
    <Radio.Group {...others}>
      {Object.values(option).map(vType => (
        <Radio.Button key={vType as string} value={vType as string}>
          {(vType as string).toString().toName()}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};

interface IBindingFormProps {
  fields: Array<any>;
  type?: MaterialAtomType;
  options: IOptions;
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
    // changedFields.values?.map((item: IElementValueGroup, n: number) => {
    //   if (item?.detail?.bg?.image?.type) {
    //     // 如果切换了bg的type，则要清空bg的value
    //     allValues.values[n].detail.bg.image.value = "";
    //   }
    //   if (item?.detail?.text?.content?.type) {
    //     // 如果切换了text的type，则要清空text的value
    //     allValues.values[n].detail.text.content.value = "";
    //   }
    // });
    this.props.onUpdate(allValues);
  }

  render() {
    const { type = null, fields, options } = this.props;
    return (
      <Form
        className={styles.form}
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
          <Form.Item
            name={["position", "x"]}
            className={styles.inlineItem}
            style={{ flex: "none" }}
          >
            {/* TODO x、y、width、height要增加约束，以限制atom必需在plane内 */}
            <InputNumber min={0} placeholder="x轴" />
          </Form.Item>
          <Form.Item
            name={["position", "y"]}
            className={styles.inlineItem}
            style={{ flex: "none" }}
          >
            <InputNumber min={0} placeholder="y轴" />
          </Form.Item>
        </Form.Item>

        {/* 尺寸 */}
        <Form.Item label="尺寸" className={styles.row}>
          <Form.Item
            name={["size", "width"]}
            className={styles.inlineItem}
            style={{ flex: "none" }}
          >
            <InputNumber min={options.atomMinSize} placeholder="宽度" />
          </Form.Item>
          <Form.Item
            name={["size", "height"]}
            className={styles.inlineItem}
            style={{ flex: "none" }}
          >
            <InputNumber min={options.atomMinSize} placeholder="高度" />
          </Form.Item>
        </Form.Item>

        <Form.Item label="旋转" className={styles.row}>
          <Form.Item
            name={["rotateZ"]}
            className={styles.inlineItem}
            style={{ flex: "none" }}
          >
            <InputNumber min={0} max={360} step={1} placeholder="角度" />
          </Form.Item>
          <span className="ant-form-text">(0~360)</span>
        </Form.Item>
        <Divider />

        {/* 背景 */}
        {type === MaterialAtomType.Image ? (
          <>
            <Form.Item
              label="背景图片"
              name={["image", "content"]}
              className={styles.row}
            >
              <ImageUpload name="image.content" />
            </Form.Item>
            <Form.Item
              label="背景重复"
              name={["image", "repeat"]}
              className={styles.row}
            >
              <MySelect option={BgRepeat} />
            </Form.Item>
            <Form.Item
              label="背景位置"
              name={["image", "position"]}
              className={styles.row}
            >
              <MySelect option={BgPosition} />
            </Form.Item>
            <Form.Item
              label="背景尺寸"
              name={["image", "size"]}
              className={styles.row}
            >
              <MySelect option={BgSize} />
            </Form.Item>
          </>
        ) : (
          <></>
        )}

        {/* 文字 */}
        {type === MaterialAtomType.Text ? (
          <>
            <Form.Item
              label="内容"
              name={["text", "content"]}
              className={styles.row}
            >
              <Input placeholder="文本内容" />
            </Form.Item>
            <Form.Item
              label="字体"
              name={["text", "family"]}
              className={styles.row}
            >
              <Select>
                {getAvailableFontFamily().map(item => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="字号" className={styles.row}>
              <Form.Item
                name={["text", "size"]}
                className={styles.inlineItem}
                style={{ flex: "none" }}
              >
                <InputNumber min={12} max={60} step={1} placeholder="px" />
              </Form.Item>
              <Form.Item name={["text", "bold"]} className={styles.inlineItem}>
                <SwitchBtn style={{ fontWeight: "bold" }}>B</SwitchBtn>
              </Form.Item>
              <Form.Item
                name={["text", "italic"]}
                className={styles.inlineItem}
              >
                <SwitchBtn style={{ fontStyle: "italic" }}>I</SwitchBtn>
              </Form.Item>
              <Form.Item
                name={["text", "lineThrough"]}
                className={styles.inlineItem}
              >
                <SwitchBtn style={{ textDecoration: "line-through" }}>
                  S
                </SwitchBtn>
              </Form.Item>
            </Form.Item>
            <Form.Item
              label="颜色"
              name={["text", "color"]}
              className={styles.row}
            >
              <ColorPicker />
            </Form.Item>
            <Form.Item
              label="对齐"
              name={["text", "align"]}
              className={styles.row}
            >
              <MyRadio option={TextAlign} />
            </Form.Item>
          </>
        ) : (
          <></>
        )}
      </Form>
    );
  }
}
export default BindingForm;
