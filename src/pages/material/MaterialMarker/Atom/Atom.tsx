import React from "react";
import styles from "./Atom.module.less";

import {
  getImageDefaultStyle,
  getTextDefaultStyle
} from "@store/material.store";
import {
  MaterialAtomImageStyle,
  MaterialAtomTextStyle,
  MaterialAtomType
} from "@src/types/material";

interface IWrapProps {
  place?: boolean;
  rotateZ?: number;
  image?: MaterialAtomImageStyle;
  text?: MaterialAtomTextStyle;
}

interface IOptionProps {
  className?: string;
  style?: object;
  rotateZ?: number;
  image?: MaterialAtomImageStyle;
  text?: MaterialAtomTextStyle;
}

const Wrap = (
  InnerComponent: (props: IOptionProps) => JSX.Element
): React.JSXElementConstructor<IWrapProps> => ({ place, ...others }) => (
  <InnerComponent
    className={styles.atom}
    style={
      !!place
        ? {
            pointerEvents: "none",
            width: "100%",
            height: "100%"
          }
        : {
            pointerEvents: "auto"
          }
    }
    {...others}
  />
);

export const Image = Wrap(({ image = {}, rotateZ = 0, style, ...props }) => {
  image = {
    ...getImageDefaultStyle(),
    ...image
  };
  return (
    <div
      {...props}
      style={{
        width: 60,
        height: 60,
        ...style,
        transform: `rotateZ(${rotateZ}deg)`,
        backgroundImage: `url(${image?.content ||
          require("@images/unit_image_default.png")})`,
        backgroundSize: image?.size,
        backgroundPosition: image?.position,
        backgroundRepeat: image?.repeat
      }}
    />
  );
});

export const Text = Wrap(({ text = {}, rotateZ = 0, style, ...props }) => {
  text = {
    ...getTextDefaultStyle(),
    ...text
  };
  return (
    <div
      style={{
        width: 60,
        height: 24,
        ...style,
        transform: `rotateZ(${rotateZ}deg)`
      }}
      {...props}
    >
      <p
        style={{
          color: text?.color,
          fontSize: text?.size,
          margin: 0,
          textAlign: text?.align,
          fontFamily: text?.family,
          fontWeight: text && text.bold ? "bold" : "inherit",
          fontStyle: text && text.italic ? "italic" : "inherit",
          textDecoration: text && text.lineThrough ? "line-through" : "inherit"
        }}
      >
        {text?.content || "文字"}
      </p>
    </div>
  );
});

interface IOptionItem {
  type: MaterialAtomType;
  name: string;
  preview: React.JSXElementConstructor<IWrapProps>;
}

const options: Array<IOptionItem> = [
  {
    type: MaterialAtomType.Image,
    name: "图片",
    preview: Image
  },
  {
    type: MaterialAtomType.Text,
    name: "文字",
    preview: Text
  }
];

export default options;
