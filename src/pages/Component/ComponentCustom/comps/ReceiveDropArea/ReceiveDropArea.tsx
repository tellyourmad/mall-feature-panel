import React from "react";
import ReactDOM from "react-dom";
import {
  ConnectDropTarget,
  DropTargetSpec,
  DropTarget,
  DropTargetMonitor,
  DropTargetConnector,
  DndComponentEnhancer
} from "react-dnd";
import { inject } from "mobx-react";
import ComponentStore from "@store/component.store";
import styles from "./ReceiveDropArea.module.less";

interface IReceiveDropAreaProps {}

interface MobxInjectProps extends IReceiveDropAreaProps {
  store: ComponentStore;
}

interface DNDInjectProps extends IReceiveDropAreaProps {
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
  isOverCurrent: boolean;
  canDrop: boolean;
  itemType: string | symbol | null;
}

class ReceiveDropArea extends React.Component<IReceiveDropAreaProps> {
  get mobxInjected() {
    return this.props as MobxInjectProps;
  }

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

export default inject("store")(
  DropTarget(
    "element",
    {
      canDrop(props: MobxInjectProps, monitor: DropTargetMonitor) {
        const item = monitor.getItem();
        return true;
      },

      hover(
        props: MobxInjectProps,
        monitor: DropTargetMonitor,
        component: any
      ) {
        // const clientOffset = monitor.getClientOffset();
        // const componentRect = findDOMNode(component).getBoundingClientRect();
        // const isOnlyThisOne = monitor.isOver({ shallow: true });
        // const canDrop = monitor.canDrop();
      },

      drop(props: MobxInjectProps, monitor: DropTargetMonitor, component: any) {
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
        const { type, width, height } = monitor.getItem();
        // @ts-ignore
        const drop = ReactDOM.findDOMNode(component).getBoundingClientRect();

        props.store.addElement(
          type,
          { width, height },
          {
            x: mouse.x - drop.x - initMouseOffset.x + initDragOffset.x,
            y: mouse.y - drop.y - initMouseOffset.y + initDragOffset.y
          }
        );
        return { moved: true };
      }
    },
    (
      connect: DropTargetConnector,
      monitor: DropTargetMonitor
    ): DNDInjectProps => {
      return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
      };
    }
  )(ReceiveDropArea)
);
