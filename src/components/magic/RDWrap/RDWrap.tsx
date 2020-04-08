import React from "react";
import { Rnd, DraggableData, ResizableDelta, Position } from "react-rnd";
import styles from "./RDWrap.module.less";
import classNames from "classnames";

export interface IItemInfo {
  id: any;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

interface IRDWrapProps extends IItemInfo {
  bounds?: string;
  selected?: boolean;
  onMoving?: (info: IItemInfo) => void;
  onResizing?: (info: IItemInfo) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default class RDWrap extends React.Component<IRDWrapProps> {
  handleDrag(e: any, data: DraggableData) {
    const { x, y } = data;
    this.props.onMoving &&
      this.props.onMoving({
        id: this.props.id,
        x,
        y
      });
  }
  handleResize(
    e: any,
    dir: any,
    elementRef: HTMLDivElement,
    delta: ResizableDelta,
    position: Position
  ) {
    const { x, y } = position;
    const { offsetWidth, offsetHeight } = elementRef;
    this.props.onResizing &&
      this.props.onResizing({
        id: this.props.id,
        x,
        y,
        width: offsetWidth,
        height: offsetHeight
      });
  }
  handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    this.props.onClick && this.props.onClick(e);
  }

  render() {
    const {
      x = 0,
      y = 0,
      width = 1,
      height = 1,
      selected,
      bounds,
      children
    } = this.props;
    return (
      <Rnd
        position={{
          x,
          y
        }}
        size={{
          width,
          height
        }}
        style={{
          zIndex: selected ? 9999999999 : 1
        }}
        bounds={bounds}
        onDrag={this.handleDrag.bind(this)}
        onResize={this.handleResize.bind(this)}
      >
        <div
          className={classNames({
            [styles.item]: true,
            [styles.selected]: selected
          })}
          onClick={this.handleClick.bind(this)}
        >
          {children}
        </div>
      </Rnd>
    );
  }
}
