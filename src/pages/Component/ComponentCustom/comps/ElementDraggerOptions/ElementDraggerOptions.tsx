import React from "react";
import ReactDOM from "react-dom";
import { DragSource, DragSourceMonitor, DragSourceConnector } from "react-dnd";
import { list as elementOptions } from "@components/Element/Element";
import styles from "./ElementDraggerOptions.module.less";
import { IElementType } from "@src/types/element";

interface IElementDraggerOptionsProps {
  onDragStatusChange: (isDrag: boolean) => void;
}

interface IOptionProps extends IElementDraggerOptionsProps {
  name: string;
  type: IElementType;
  preview: React.JSXElementConstructor<any>;
}

@DragSource(
  "element",
  {
    isDragging: (props: IOptionProps, monitor: DragSourceMonitor) =>
      monitor.getItem().type === props.type,
    beginDrag(props: IOptionProps, monitor: DragSourceMonitor, component: any) {
      // @ts-ignore
      const info = ReactDOM.findDOMNode(component).getBoundingClientRect();
      props.onDragStatusChange(true);
      return { type: props.type, width: info.width, height: info.height };
    },
    endDrag(props: IOptionProps) {
      props.onDragStatusChange(false);
    }
  },
  (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)
class Source extends React.Component<any> {
  render() {
    const { connectDragSource } = this.props;
    return connectDragSource(this.props.children);
  }
}

export default function ElementDraggerOptions(
  props: IElementDraggerOptionsProps
) {
  return (
    <div className={styles.elementDragger}>
      {elementOptions.map((item, n) => (
        <div className={styles.option} key={n}>
          <div className={styles.describe}>
            <p className={styles.text}>{item.name}</p>
          </div>
          <Source {...item} {...props}>
            <span>
              <item.preview />
            </span>
          </Source>
        </div>
      ))}
    </div>
  );
}
