import React from "react";
import classNames from "classnames";

import ResizableCanvas, {
  IResizableCanvasProps
} from "./ResizableCanvas/ResizableCanvas";
import ReceiveDropArea, {
  IReceiveItem as _IReceiveItem,
  IReceiveDropAreaProps
} from "./ReceiveDropArea/ReceiveDropArea";

import styles from "./Plane.module.less";

export type IReceiveItem = _IReceiveItem;

const Overlap = function(props: { touchable: any; children: React.ReactNode }) {
  return (
    <div
      className={classNames({
        [styles.overlap]: true,
        [styles.touchable]: props.touchable
      })}
    >
      {props.children}
    </div>
  );
};

interface IPlaneProps extends IResizableCanvasProps, IReceiveDropAreaProps {}

export default class Plane extends React.Component<IPlaneProps> {
  state = {
    dragging: false
  };
  componentDidMount() {
    document.addEventListener("dragstart", this.handleDragStart.bind(this));
    document.addEventListener("dragend", this.handleDragEnd.bind(this));
  }
  handleDragStart(e: DragEvent) {
    // console.log(e);
    this.setState({ dragging: true });
  }
  handleDragEnd(e: DragEvent) {
    this.setState({ dragging: false });
  }
  componentWillUnmount() {
    document.removeEventListener("dragstart", this.handleDragStart.bind(this));
    document.removeEventListener("dragend", this.handleDragEnd.bind(this));
  }
  render() {
    const { dragging } = this.state;
    const {
      source,
      size,
      tips,
      options,
      onResize,
      onReceive,
      children
    } = this.props;
    return (
      <ResizableCanvas
        size={size}
        tips={tips}
        onResize={onResize}
        options={options}
        ref="ResizableCanvas"
      >
        <Overlap touchable={dragging}>
          <ReceiveDropArea source={source} onReceive={onReceive} />
        </Overlap>
        <Overlap touchable={!dragging}>{children}</Overlap>
      </ResizableCanvas>
    );
  }
}
