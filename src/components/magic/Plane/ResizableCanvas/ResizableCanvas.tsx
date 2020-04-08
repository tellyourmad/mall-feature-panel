import React from "react";
import { Rnd, Props } from "react-rnd";
import styles from "./ResizableCanvas.module.less";
import classNames from "classnames";

const handleStyleCreator = function(size: number) {
  return function(
    arg: Array<"left" | "right" | "top" | "bottom">
  ): React.CSSProperties {
    let result = {};
    for (let item of arg) {
      switch (item) {
        case "left":
          result = {
            ...result,
            left: -size,
            width: size
          };
          break;
        case "right":
          result = {
            ...result,
            right: -size,
            width: size
          };
          break;
        case "top":
          result = {
            ...result,
            top: -size,
            height: size
          };
          break;
        case "bottom":
          result = {
            ...result,
            bottom: -size,
            height: size
          };
          break;
      }
    }
    return result;
  };
};

interface ISize {
  width: number;
  height: number;
}

interface IOptions extends Props {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  planeClass?: string;
  planeStyle?: React.CSSProperties;
}

export interface IResizableCanvasProps {
  size: ISize;
  tips?: string;
  onResize?: (size: ISize) => void;
  options?: IOptions;
}

export default class ResizableCanvas extends React.Component<
  IResizableCanvasProps
> {
  handleResize = (e: any, dir: any, elementRef: HTMLDivElement) => {
    const { offsetWidth, offsetHeight } = elementRef;
    this.props.onResize &&
      this.props.onResize({
        width: offsetWidth,
        height: offsetHeight
      });
  };
  render() {
    const { size, options = {}, tips, children } = this.props;
    const padding = 10;
    const handleStyle = handleStyleCreator((padding / 2) * 3);
    const {
      planeStyle,
      planeClass,
      resizeHandleStyles,
      ...otherProps
    } = options;
    return (
      <div className={styles.resizableCanvas} style={{ padding }}>
        <div
          className={styles.area}
          style={{ width: size.width, height: size.height }}
        >
          <Rnd
            size={size}
            resizeHandleStyles={Object.assign(
              {
                top: handleStyle(["top"]),
                bottom: handleStyle(["bottom"]),
                left: handleStyle(["left"]),
                right: handleStyle(["right"]),

                topLeft: handleStyle(["top", "left"]),
                topRight: handleStyle(["top", "right"]),
                bottomLeft: handleStyle(["bottom", "left"]),
                bottomRight: handleStyle(["bottom", "right"])
              },
              resizeHandleStyles
            )}
            {...otherProps}
            className={classNames(styles.rnd, planeClass)}
            style={planeStyle}
            onResize={this.handleResize.bind(this)}
            disableDragging={true}
          >
            {children}
          </Rnd>
        </div>
        {tips ? <p className={styles.tips}>{tips}</p> : <></>}
      </div>
    );
  }
}
