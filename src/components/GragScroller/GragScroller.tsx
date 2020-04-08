import React from "react";
import styles from "./GragScroller.module.less";
import classNames from "classnames";

interface IGragScrollerProps {
  className: string;
}

export default class GragScroller extends React.Component<IGragScrollerProps> {
  state = {
    pressSPACE: false,
    grabbing: false,
    wheel: 0
  };
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));
    // document.addEventListener("wheel", this.handleMouseWheel.bind(this), {
    //   passive: false
    // });
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
    document.removeEventListener("keyup", this.handleKeyUp.bind(this));
    // document.removeEventListener("wheel", this.handleMouseWheel.bind(this));
  }

  handleKeyDown(e: KeyboardEvent) {
    if (e.keyCode !== 32) {
      return;
    }
    e.preventDefault();
    this.setState({ pressSPACE: true });
  }

  handleKeyUp(e: KeyboardEvent) {
    if (e.keyCode !== 32) {
      return;
    }
    this.setState({ pressSPACE: false, grabbing: false });
  }

  handleMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!this.state.pressSPACE) {
      return;
    }
    e.stopPropagation();
    this.setState({
      grabbing: true
    });
  }
  handleMouseUp(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!this.state.pressSPACE) {
      return;
    }
    this.setState({
      grabbing: false
    });
  }
  handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!this.state.pressSPACE || !this.state.grabbing) {
      return;
    }
    e.persist();
    (this.refs.scroller as Element).scrollBy(
      -e.nativeEvent.movementX,
      -e.nativeEvent.movementY
    );
  }

  handleMouseWheel(e: WheelEvent) {
    if (!this.state.pressSPACE) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      wheel: this.state.wheel + e.deltaY
    });
  }

  get scale(): number {
    return 1 - Math.round(this.state.wheel) / 1000;
  }

  render() {
    const { className, children } = this.props;
    const { pressSPACE, grabbing } = this.state;
    return (
      <div
        ref="scroller"
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        className={classNames({
          [styles.gragScroller]: true,
          [styles.pressing]: pressSPACE,
          [styles.grabbing]: grabbing,
          [className]: true
        })}
        style={{
          transform: `scale(${this.scale})`
        }}
      >
        {children}
      </div>
    );
  }
}
