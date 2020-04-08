import React from "react";
import { observer, inject } from "mobx-react";
import {
  HeatMapOutlined,
  FontSizeOutlined,
  FileImageOutlined,
  AimOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import ComponentStore from "@src/store/component.store";
import { IElementType } from "@src/types/element";

import styles from "./LayerList.module.less";
import classNames from "classnames";

const ICON_MAP = {
  [IElementType.BuiltIn]: <HeatMapOutlined />,
  [IElementType.Text]: <FontSizeOutlined />,
  [IElementType.Image]: <FileImageOutlined />,
  [IElementType.Button]: <AimOutlined />
};

interface ILayerListProps {}

interface InjectedProps extends ILayerListProps {
  store: ComponentStore;
}

function LayerList(props: ILayerListProps) {
  const { store } = props as InjectedProps;
  if (store.getList.length <= 0) {
    return <div className={styles.empty}>暂无图层...</div>;
  }
  return (
    <ul className={styles.layerList}>
      {store.getList.map(item => (
        <li
          className={classNames({
            [styles.item]: true,
            [styles.selected]: store.currentId === item.id
          })}
          key={item.id}
        >
          <div
            className={styles.content}
            onClick={() => store.selectElement(item.id)}
          >
            {ICON_MAP[item.type]}
            <span>{item.nickname}</span>
          </div>
          <DeleteOutlined
            className={styles.btn}
            onClick={() => store.deleteElement(item.id)}
          />
        </li>
      ))}
    </ul>
  );
}

export default inject("store")(observer(LayerList));
