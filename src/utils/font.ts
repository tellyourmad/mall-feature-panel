import possibleFonts from "@assets/json/possible-fonts.json";

interface IFontFamilyOption {
  name: string;
  key: string;
}
var availableFontFamily: Array<IFontFamilyOption> | null = null;

const isSupportFontFamily = function(f: string) {
  if (typeof f != "string") {
    return false;
  }
  var h = "Arial";
  if (f.toLowerCase() === h.toLowerCase()) {
    return true;
  }
  var e = "a";
  var d = 100;
  var a = 100,
    i = 100;
  const c = document.createElement("canvas");
  const b = c.getContext("2d");
  c.width = a;
  c.height = i;
  if (!b) {
    return false;
  }
  b.textAlign = "center";
  b.fillStyle = "black";
  b.textBaseline = "middle";
  var g = function(j: string) {
    b.clearRect(0, 0, a, i);
    b.font = d + "px " + j + ", " + h;
    b.fillText(e, a / 2, i / 2);
    var k = b.getImageData(0, 0, a, i).data;
    return [].slice.call(k).filter(function(l) {
      return l !== 0;
    });
  };
  return g(h).join("") !== g(f).join("");
};

export const getAvailableFontFamily = function(): Array<IFontFamilyOption> {
  if (availableFontFamily && availableFontFamily.length > 0) {
    return availableFontFamily;
  }
  return (availableFontFamily = possibleFonts["windows"]
    .concat(
      possibleFonts["OS X"],
      possibleFonts["office"],
      possibleFonts["open"],
      possibleFonts["fangzheng"]
    )
    .filter((item: { en: string }) => isSupportFontFamily(item.en))
    .distinct(item => item.en)
    .map(item => ({ name: item.ch, key: item.en })));
};
