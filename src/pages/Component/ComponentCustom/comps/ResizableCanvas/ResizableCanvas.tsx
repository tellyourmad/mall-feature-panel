import React from "react";
import { observer, inject } from "mobx-react";
import { Rnd } from "react-rnd";
import ComponentStore from "@store/component.store";
import styles from "./ResizableCanvas.module.less";

interface IResizableCanvasProps {}

interface InjectedProps extends IResizableCanvasProps {
  store: ComponentStore;
}

@inject("store")
@observer
export default class ResizableCanvas extends React.Component<
  IResizableCanvasProps
> {
  get injected() {
    return this.props as InjectedProps;
  }
  handleResize = (e: any, dir: any, elementRef: HTMLDivElement) => {
    const { offsetHeight } = elementRef;
    this.injected.store.resizeComponent(offsetHeight);
  };
  render() {
    const { children } = this.props;
    const { store } = this.injected;
    return (
      <div className={styles.resizableCanvas}>
        <div
          className={styles.area}
          style={{ width: store.width, height: store.height }}
        >
          <Rnd
            size={{
              width: store.width,
              height: store.height
            }}
            minHeight={store.requireMinHeight}
            maxHeight={store.maxHeight}
            className={styles.rnd}
            onResize={this.handleResize.bind(this)}
            disableDragging={true}
            enableResizing={{
              bottom: true
            }}
            resizeHandleStyles={{
              bottom: {
                bottom: 0,
                height: 0
              }
            }}
            resizeHandleComponent={{
              bottom: (
                <div className={styles.resizeHandle}>
                  拖动调节高度（{store.height}px）
                </div>
              )
            }}
          >
            {children}
          </Rnd>
        </div>
      </div>
    );
  }
}
