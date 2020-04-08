import React from "react";
import ReactDOM from "react-dom";
import {
  DragSource,
  DragSourceMonitor,
  DragSourceConnector,
  DragElementWrapper,
  DragSourceOptions
} from "react-dnd";

interface IDraggerProps {
  source: string;
  type: any;
  children: React.ReactElement;
  onDragStatusChange?: (isDrag: boolean) => void;
}

interface DNDInjectProps extends IDraggerProps {
  connectDragSource: DragElementWrapper<DragSourceOptions>;
  isDragging: boolean;
}

interface IMonitorItemInfo {
  type: any;
  width: number;
  height: number;
}

@DragSource(
  (props: IDraggerProps) => props.source,
  {
    isDragging: (props: IDraggerProps, monitor: DragSourceMonitor) =>
      monitor.getItem().type === props.type,
    beginDrag(
      props: IDraggerProps,
      monitor: DragSourceMonitor,
      component: any
    ): IMonitorItemInfo {
      // @ts-ignore
      const info = ReactDOM.findDOMNode(component).getBoundingClientRect();
      props.onDragStatusChange && props.onDragStatusChange(true);
      return { type: props.type, width: info.width, height: info.height };
    },
    endDrag(props: IDraggerProps) {
      props.onDragStatusChange && props.onDragStatusChange(false);
    }
  },
  (
    connect: DragSourceConnector,
    monitor: DragSourceMonitor,
    props: IDraggerProps
  ): DNDInjectProps => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    ...props
  })
)
class Source extends React.Component<any> {
  render() {
    const { connectDragSource } = this.props;
    return connectDragSource(this.props.children);
  }
}

export default function Dragger(props: IDraggerProps) {
  const { children, ...others } = props;
  return (
    <Source {...others}>
      <span>{children}</span>
    </Source>
  );
}
