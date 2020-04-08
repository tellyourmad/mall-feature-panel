import React from "react";
import styles from "./Element.module.less";
import {
  IElementValues,
  IElementValueConditionType,
  IElementType,
  IElementValueDetail,
  IElementValueContentType
} from "@src/types/element";

import ElementStore from "@store/element.store";
import { UISize } from "@src/types/ui";

const elementStore = new ElementStore();

interface IWrapProps {
  place?: boolean;
  values?: IElementValues;
}

interface IOptionProps {
  className?: string;
  style?: object;
  values: IElementValues;
}

const Wrap = (
  InnerComponent: (props: IOptionProps) => JSX.Element
): React.JSXElementConstructor<IWrapProps> => ({ place, values }) => (
  <InnerComponent
    className={styles.UnitOption}
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
    values={values || []}
  />
);

const getDefaultValues = (
  origin: IElementValues,
  def: IElementValueDetail
): IElementValueDetail => {
  for (let oItem of origin) {
    def = oItem.detail;
    if (oItem.condition.type === IElementValueConditionType.Default) {
      return def;
    }
  }
  return def;
};

export const Image = Wrap(({ values, style, ...props }) => {
  const { bg } = getDefaultValues(values, elementStore.getImageDefaultValue());
  let image: any = bg?.image;
  if (image) {
    const { type, value } = image;
    image = value;
    switch (type) {
      case IElementValueContentType.Fixed:
        break;
      case IElementValueContentType.Product:
        if (!value) {
          break;
        }
        image = `http://picpro-sz.34580.com/sz/ImageUrl/${value}/300.png`;
        break;
    }
  }
  return (
    <div
      {...props}
      style={{
        width: 60,
        height: 60,
        ...style,
        backgroundImage: `url(${image ||
          require("@images/unit_image_default.png")})`,
        backgroundSize: bg?.size,
        backgroundPosition: bg?.position,
        backgroundRepeat: bg?.repeat,
        backgroundColor: bg?.color
      }}
    />
  );
});

export const Text = Wrap(({ values, ...props }) => {
  const { text } = getDefaultValues(values, elementStore.getTextDefaultValue());
  let content: any = text?.content;
  if (content) {
    const { type, value } = content;
    switch (type) {
      case IElementValueContentType.Fixed:
        content = value;
        break;
      case IElementValueContentType.Product:
        if (!value) {
          break;
        }
        content = `商品（SSU：${value}）`;
        break;
    }
  }
  return (
    <div {...props}>
      <p
        style={{
          color: text?.color,
          fontSize: text?.size,
          lineHeight: text?.lineHeight + 'em',
          overflow: "hidden",
          textOverflow: "ellipsis",
          WebkitLineClamp: text?.maxLine,
          display: "-webkit-box",
          WebkitBoxOrient: "vertical"
        }}
      >
        {content || "文字"}
      </p>
    </div>
  );
});

export const Button = Wrap(({ values, style, ...props }) => {
  const { bg, text } = getDefaultValues(
    values,
    elementStore.getImageDefaultValue()
  );

  let image: any = bg?.image;
  if (image) {
    const { type, value } = image;
    image = value;
    switch (type) {
      case IElementValueContentType.Fixed:
        break;
      case IElementValueContentType.Product:
        if (!value) {
          break;
        }
        image = `http://picpro-sz.34580.com/sz/ImageUrl/${value}/300.png`;
        break;
    }
  }
  let content: any = text?.content;
  if (content) {
    const { type, value } = content;
    switch (type) {
      case IElementValueContentType.Fixed:
        content = value;
        break;
      case IElementValueContentType.Product:
        if (!value) {
          break;
        }
        content = `商品（SSU：${value}）`;
        break;
    }
  }
  return (
    <div
      {...props}
      style={{
        width: 60,
        height: 25,
        ...style,
        // backgroundImage: image ? `url(${image})` : "",
        backgroundSize: bg?.size,
        backgroundPosition: bg?.position,
        backgroundRepeat: bg?.repeat,
        backgroundColor: bg?.color || "#9cceff"
      }}
    >
      <p
        style={{
          color: text?.color,
          fontSize: text?.size,
          lineHeight: text?.lineHeight + 'em',
          overflow: "hidden",
          textOverflow: "ellipsis",
          WebkitLineClamp: text?.maxLine,
          display: "-webkit-box",
          WebkitBoxOrient: "vertical"
        }}
      >
        {content || "按钮"}
      </p>
    </div>
  );
});

interface IUnitItem {
  type: IElementType;
  name: string;
  preview: React.JSXElementConstructor<IWrapProps>;
}

export const list: Array<IUnitItem> = [
  {
    type: IElementType.Image,
    name: "图片",
    preview: Image
  },
  {
    type: IElementType.Text,
    name: "文字",
    preview: Text
  },
  {
    type: IElementType.Button,
    name: "按钮",
    preview: Button
  }
];
