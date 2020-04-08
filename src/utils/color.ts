import { HEXA, IColor, CSSTransparent, CSSInherit } from "@src/types/ui";

export const hexa2color = function(hexa: HEXA | CSSTransparent | CSSInherit): IColor {
  let rgba = {
    r: "00",
    g: "00",
    b: "00",
    a: "FF"
  };
  switch (hexa) {
    case "transparent":
    case "inherit":
    case undefined:
    case null:
    case "":
      rgba.a = "00";
      break;
    default:
      hexa = hexa.replace("#", "");
      switch (hexa.length) {
        case 3:
          rgba = {
            r: hexa[0] + hexa[0],
            g: hexa[1] + hexa[1],
            b: hexa[2] + hexa[2],
            a: "FF"
          };
          break;
        case 4:
          rgba = {
            r: hexa[0] + hexa[0],
            g: hexa[1] + hexa[1],
            b: hexa[2] + hexa[2],
            a: hexa[3] + hexa[3]
          };
          break;
        case 6:
          rgba = {
            r: hexa.slice(0, 2),
            g: hexa.slice(2, 4),
            b: hexa.slice(4, 6),
            a: "FF"
          };
          break;
        case 8:
          rgba = {
            r: hexa.slice(0, 2),
            g: hexa.slice(2, 4),
            b: hexa.slice(4, 6),
            a: hexa.slice(6, 8)
          };
          break;
        default:
          break;
      }
  }
  const { r, g, b, a } = rgba;
  return {
    color: ("#" + r + g + b).toUpperCase(),
    alpha: Math.round((parseInt(a, 16) / 255) * 100)
  };
};

export const color2hexa = function(color: IColor): HEXA {
  let alpha = Math.round((color.alpha * 255) / 100).toString(16);
  if (alpha.length < 1) {
    alpha = "00";
  } else if (alpha.length === 1) {
    alpha = "0" + alpha;
  } else if (alpha.length === 2) {

  } else {
    alpha = "FF"
  }
  return "" + color.color + (alpha.length <= 1 ? `0${alpha}` : alpha);
};
