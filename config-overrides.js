const { override, fixBabelImports, addLessLoader, adjustStyleLoaders } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    strictMath: true,
    noIeCompat: true,
    localIdentName: "[local]--[hash:base64:5]",
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1DA57A" }
  })
);
