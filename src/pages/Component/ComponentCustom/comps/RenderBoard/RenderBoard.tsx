import React from "react";
import { Rnd, DraggableData, ResizableDelta, Position } from "react-rnd";
import { observer, inject } from "mobx-react";
import styles from "./RenderBoard.module.less";
import ComponentStore from "@store/component.store";
import { IElement } from "@src/types/element";
import { list as options } from "@components/Element/Element";
import classNames from "classnames";

interface IBoardProps {}

interface InjectedProps extends IBoardProps {
  store: ComponentStore;
}

@inject("store")
@observer
export default class RenderBoard extends React.Component<IBoardProps> {
  get injected() {
    return this.props as InjectedProps;
  }
  handleDrag(id: string, e: any, data: DraggableData) {
    const { x, y } = data;
    this.injected.store.moveTargetElement(id, { x, y });
  }
  handleResize(
    id: string,
    e: any,
    dir: any,
    elementRef: HTMLDivElement,
    delta: ResizableDelta,
    position: Position
  ) {
    const { x, y } = position;
    const { offsetWidth, offsetHeight } = elementRef;
    this.injected.store.resizeTargetElement(
      id,
      { x, y },
      {
        width: offsetWidth,
        height: offsetHeight
      }
    );
  }
  handleClick(id: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    this.injected.store.selectElement(id);
  }

  render() {
    const { store } = this.injected;
    return (
      <div className={styles.board} ref="parent">
        {store.getList.map((item: IElement, n) => {
          const match = options.find(opt => opt.type === item.type);
          if (!match) {
            return null;
          }
          return (
            <Rnd
              key={n}
              position={{
                x: item.position.x || 0,
                y: item.position.y || 0
              }}
              size={{
                width: item.size.width,
                height: item.size.height
              }}
              style={{
                zIndex:
                  store.currentId === item.id
                    ? store.MAX_Z_INDEX + 1
                    : item.zIndex
              }}
              bounds="parent"
              onDragStart={() => store.selectElement(item.id)}
              onDrag={this.handleDrag.bind(this, item.id)}
              onResize={this.handleResize.bind(this, item.id)}
            >
              <div
                className={classNames({
                  [styles.item]: true,
                  [styles.selected]: store.currentId === item.id
                })}
                onClick={this.handleClick.bind(this, item.id)}
              >
                <match.preview place={true} values={item.values} />
              </div>
            </Rnd>
          );
        })}
      </div>
    );
  }
}
