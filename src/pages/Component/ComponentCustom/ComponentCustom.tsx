import React from "react";

import { Provider } from "mobx-react";
import PropTypes from "prop-types";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import ReceiveDropArea from "./comps/ReceiveDropArea/ReceiveDropArea";
import ElementDraggerOptions from "./comps/ElementDraggerOptions/ElementDraggerOptions";
import ControlPanel from "./comps/ControlPanel/ControlPanel";
import RenderBoard from "./comps/RenderBoard/RenderBoard";
import ResizableCanvas from "./comps/ResizableCanvas/ResizableCanvas";
import LayerList from "./comps/LayerList/LayerList";

import styles from "./ComponentCustom.module.less";
import classNames from "classnames";

import ComponentStore from "@store/component.store";

const store = new ComponentStore();

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

export default class ComponentCustomPage extends React.Component {
  static contextTypes = {
    menuCollapse: PropTypes.func
  };

  state = {
    dragging: false
  };

  componentDidMount() {
    // 本页面默认收起左侧菜单栏
    // this.context.menuCollapse(true);
  }

  handleDragStatusChange = (isDrag: boolean) => {
    this.setState({ dragging: isDrag });
  };

  render() {
    const { dragging } = this.state;
    return (
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <div className={styles.componentCustom}>
            <div className={styles.componentCustom__options}>
              <ElementDraggerOptions
                onDragStatusChange={this.handleDragStatusChange.bind(this)}
              />
            </div>

            <div className={styles.componentCustom__middle}>
              <ResizableCanvas>
                <Overlap touchable={dragging}>
                  <ReceiveDropArea />
                </Overlap>
                <Overlap touchable={!dragging}>
                  <RenderBoard />
                </Overlap>
              </ResizableCanvas>
            </div>
            <div className={styles.componentCustom__plan}>
              <p className={styles.title}>操作面板</p>
              <ControlPanel />
            </div>
            <div className={styles.componentCustom__layer}>
              <p className={styles.title}>图层</p>
              <LayerList />
            </div>
          </div>
        </DndProvider>
      </Provider>
    );
  }
}
