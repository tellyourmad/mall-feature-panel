import React from "react";
import ReactDOM from "react-dom";
import {
  ConnectDropTarget,
  DropTarget,
  DropTargetMonitor,
  DropTargetConnector
} from "react-dnd";
import styles from "./ReceiveDropArea.module.less";

export interface IReceiveItem {
  item: any;
  x: number;
  y: number;
}

export interface IReceiveDropAreaProps {
  source: string;
  onReceive?: (item: IReceiveItem) => void;
}

interface DNDInjectProps extends IReceiveDropAreaProps {
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
  isOverCurrent: boolean;
  canDrop: boolean;
  itemType: string | symbol | null;
}

class ReceiveDropArea extends React.Component<IReceiveDropAreaProps> {
  get dndInjected() {
    return this.props as DNDInjectProps;
  }

  componentDidUpdate(prevProps: DNDInjectProps) {
    if (!prevProps.isOver && this.dndInjected.isOver) {
    }

    if (prevProps.isOver && !this.dndInjected.isOver) {
    }

    if (prevProps.isOverCurrent && !this.dndInjected.isOverCurrent) {
    }
  }

  render() {
    // const { position } = this.props;
    const { isOver, canDrop, connectDropTarget, itemType } = this.dndInjected;
    return connectDropTarget(
      <div className={styles.dropper}>
        {/* {isOver && canDrop && (
          <div
            style={{ with: "100%", height: "100%", backgroundColor: "green" }}
          >
            {position}
          </div>
        )}
        {!isOver && canDrop && (
          <div
            style={{ with: "100%", height: "100%", backgroundColor: "yellow" }}
          >
            {position}
          </div>
        )}
        {isOver && !canDrop && (
          <div style={{ with: "100%", height: "100%", backgroundColor: "red" }}>
            {position}
          </div>
        )} */}
      </div>
    );
  }
}
export default DropTarget<IReceiveDropAreaProps>(
  (props: IReceiveDropAreaProps) => props.source,
  {
    canDrop(props: IReceiveDropAreaProps, monitor: DropTargetMonitor) {
      const item = monitor.getItem();
      return true;
    },

    hover(
      props: IReceiveDropAreaProps,
      monitor: DropTargetMonitor,
      component: any
    ) {
      // const clientOffset = monitor.getClientOffset();
      // const componentRect = findDOMNode(component).getBoundingClientRect();
      // const isOnlyThisOne = monitor.isOver({ shallow: true });
      // const canDrop = monitor.canDrop();
    },

    drop(
      props: IReceiveDropAreaProps,
      monitor: DropTargetMonitor,
      component: any
    ) {
      if (monitor.didDrop()) {
        return;
      }
      // monitor.node.getBoundingClientRect
      const initMouseOffset = monitor.getInitialClientOffset() || {
        x: 0,
        y: 0
      };
      const initDragOffset = monitor.getInitialSourceClientOffset() || {
        x: 0,
        y: 0
      };
      const mouse = monitor.getClientOffset() || { x: 0, y: 0 };
      // @ts-ignore
      const drop = ReactDOM.findDOMNode(component).getBoundingClientRect();

      props.onReceive &&
        props.onReceive({
          item: monitor.getItem(),
          x: mouse.x - drop.x - initMouseOffset.x + initDragOffset.x,
          y: mouse.y - drop.y - initMouseOffset.y + initDragOffset.y
        });
      return { moved: true };
    }
  },
  (
    connect: DropTargetConnector,
    monitor: DropTargetMonitor,
    props: IReceiveDropAreaProps
  ): DNDInjectProps => {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
      itemType: monitor.getItemType(),
      ...props
    };
  }
)(ReceiveDropArea);
