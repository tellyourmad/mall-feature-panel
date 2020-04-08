const {
  override,
  fixBabelImports,
  addLessLoader,
  adjustStyleLoaders,
  addWebpackAlias
} = require("customize-cra");

const path = require("path");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    localIdentName: "[local]__[hash:base64:5]",
    javascriptEnabled: true
    // modifyVars: { "@primary-color": "#1DA57A" }
  }),

  adjustStyleLoaders(rule => {
    // 高版本css-loader的options里的modules属性配置方式修改：
    //   旧：options = { modules: true, localIdentName: ''}
    //   新：options = { modules: { localIdentName: '' } }
    // 因为create-react-app里的css-loader使用的是新版本，而customize-cra的addLessLoader在使用css module时，处理方式为旧版方式。
    // 故这里要转化下格式～
    if (rule.test.toString() === /\.module\.less$/.toString()) {
      for (let n in rule.use) {
        if (rule.use[n].loader && rule.use[n].loader.includes("css-loader")) {
          const { modules, localIdentName, ...others } = rule.use[n].options;
          rule.use[n].options = {
            ...others,
            modules: modules
              ? {
                  localIdentName
                }
              : false
          };
        }
      }
    }
  }),
  addWebpackAlias({
    "@src": path.resolve(__dirname, "./src"),
    "@pages": path.resolve(__dirname, "./src/pages"),
    "@store": path.resolve(__dirname, "./src/store"),
    "@components": path.resolve(__dirname, "./src/components"),
    "@utils": path.resolve(__dirname, "./src/utils"),
    "@assets": path.resolve(__dirname, "./src/assets"),
    "@images": path.resolve(__dirname, "./src/assets/images")
  })
);
