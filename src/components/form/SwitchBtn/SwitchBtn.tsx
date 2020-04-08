import React from "react";
import { Button } from "antd";
import { BaseButtonProps } from "antd/lib/button/button";

import styles from "./SwitchBtn.module.less";
import classNames from "classnames";

interface ISwitchBtnProps extends BaseButtonProps {
  value?: any;
  onChange?: (newValue: boolean) => void;
  style?: React.CSSProperties;
}

export default function SwitchBtn(props: ISwitchBtnProps) {
  const { value, onChange, className, children, ...others } = props;
  return (
    <Button
      {...others}
      type={value ? "primary" : "default"}
      onClick={() => onChange && onChange(!value)}
      className={classNames(styles.switchBtn, className)}
    >
      {children}
    </Button>
  );
}
