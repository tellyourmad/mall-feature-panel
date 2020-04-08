import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";
import { observer, inject } from "mobx-react";
import {
  HeatMapOutlined,
  FontSizeOutlined,
  FileImageOutlined,
  AimOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import MaterialStore from "@src/store/material.store";
import { IElementType } from "@src/types/element";

import styles from "./Layers.module.less";
import classNames from "classnames";

const ICON_MAP = {
  [IElementType.BuiltIn]: <HeatMapOutlined />,
  [IElementType.Text]: <FontSizeOutlined />,
  [IElementType.Image]: <FileImageOutlined />,
  [IElementType.Button]: <AimOutlined />
};

interface ILayerListProps {}

interface InjectedProps extends ILayerListProps {
  store: MaterialStore;
}

// 重新记录数组顺序
// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);

//   const [removed] = result.splice(startIndex, 1);

//   result.splice(endIndex, 0, removed);
//   return result;
// };

// 设置样式
const getItemStyle = (
  isDragging: boolean,
  draggableStyle: React.CSSProperties
): React.CSSProperties => ({
  userSelect: "none",
  background: isDragging ? "#eee" : undefined,
  ...draggableStyle
});

@inject("store")
@observer
export default class Layers extends React.Component<ILayerListProps> {
  get injected() {
    return this.props as InjectedProps;
  }
  onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }
    this.injected.store.changeTargetAtomIndex(
      result.source.index,
      result.destination.index
    );
  }
  render() {
    const { store } = this.injected;
    if (store.getList.length <= 0) {
      return <div className={styles.empty}>暂无图层...</div>;
    }
    return (
      <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
        <Droppable droppableId="droppable" key={store.currentId || ""}>
          {(provided, snapshot) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.layers}
            >
              {store.getList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={classNames({
                        [styles.item]: true,
                        [styles.selected]: store.currentId === item.id
                      })}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style || {}
                      )}
                    >
                      <div
                        className={styles.content}
                        onClick={() => store.selectAtom(item.id)}
                      >
                        {ICON_MAP[item.type]}
                        <span>{item.nickname}</span>
                      </div>
                      <DeleteOutlined
                        className={styles.btn}
                        onClick={() => store.deleteAtom(item.id)}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
