import React from "react";
import { inject, observer } from "mobx-react";

import Plane, { IReceiveItem } from "@components/magic/Plane/Plane";
import RDWrap, { IItemInfo } from "@src/components/magic/RDWrap/RDWrap";

import options from "../Atom/Atom";

import { MaterialAtom } from "@src/types/material";
import { UISize } from "@src/types/ui";
import MaterialStore from "@store/material.store";

interface IPanelProps {}

interface InjectedProps extends IPanelProps {
  store: MaterialStore;
}

@inject("store")
@observer
export default class extends React.Component<IPanelProps> {
  get injected() {
    return this.props as InjectedProps;
  }
  handleResize(item: UISize) {
    this.injected.store.resizePlane(item);
  }
  handleReceive(info: IReceiveItem) {
    const { item, x, y } = info;
    const { type, width, height } = item;
    this.injected.store.addAtom(type, { width, height }, { x, y });
  }
  handleItemMoving(item: IItemInfo) {
    const { id, x, y } = item;
    this.injected.store.moveTargetAtom(id, { x, y });
  }
  handleItemResizing(item: IItemInfo) {
    const { id, x, y, width = 10, height = 10 } = item;
    this.injected.store.resizeTargetAtom(id, { x, y }, { width, height });
  }
  handleItemClick(id: string) {
    this.injected.store.selectAtom(id);
  }
  render() {
    const { store } = this.injected;
    const { width, height } = store;
    return (
      <Plane
        source="MaterialMarker"
        options={{
          minHeight: store.requireMinHeight,
          maxHeight: store.options.maxHeight,
          minWidth: store.requireMinWidth,
          maxWidth: store.options.maxWidth,
          enableResizing: {
            bottom: true,
            right: true,
            bottomRight: true
          }
        }}
        onReceive={this.handleReceive.bind(this)}
        size={{ width, height }}
        onResize={this.handleResize.bind(this)}
        tips={`${width} * ${height}`}
      >
        {store.getList.map((item: MaterialAtom, n) => {
          const match = options.find(opt => opt.type === item.type);
          if (!match) {
            return null;
          }
          return (
            <RDWrap
              bounds="parent"
              key={n}
              id={item.id}
              x={item.position.x || 0}
              y={item.position.y || 0}
              width={item.size.width}
              height={item.size.height}
              selected={store.currentId === item.id}
              onMoving={this.handleItemMoving.bind(this)}
              onResizing={this.handleItemResizing.bind(this)}
              onClick={this.handleItemClick.bind(this, item.id)}
            >
              <match.preview
                place={true}
                rotateZ={item.rotateZ}
                image={item.image}
                text={item.text}
              />
            </RDWrap>
          );
        })}
      </Plane>
    );
  }
}
