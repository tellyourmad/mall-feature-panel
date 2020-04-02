import React from "react";
import { hexa2color, color2hexa } from "@utils/color";
import debounce from "lodash/debounce";
import "rc-color-picker/assets/index.css";
import { IColor } from "@src/types/ui";
const ColorPicker = require("rc-color-picker");

interface IColorPickerProps {
  value?: any;
  onChange?: (color: string) => void;
}

interface IPickInfo extends IColor {
  open: boolean;
}

export default class extends React.Component<IColorPickerProps> {
  get hexa2Obj(): IColor {
    return hexa2color(this.props.value);
  }
  updateDebounced = debounce(this.updateColor.bind(this), 100, {
    leading: false
  });
  updateColor(info: IPickInfo) {
    this.props.onChange && this.props.onChange(color2hexa(info));
  }
  handleColorChange(info: IPickInfo) {
    this.updateDebounced(info);
  }
  componentWillUnmount() {
    this.updateDebounced?.cancel();
  }
  render() {
    const { color, alpha } = this.hexa2Obj;
    return (
      <ColorPicker
        color={color}
        alpha={alpha}
        onChange={this.handleColorChange.bind(this)}
      />
    );
  }
}
