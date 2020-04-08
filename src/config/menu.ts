const menus: Array<IMenuItem> = [
  {
    title: "首页",
    path: "/home"
  },
  {
    title: "组件",
    children: [
      {
        title: "自定义组件",
        path: "/component/custom"
      }
    ]
  },
  {
    title: "物料",
    children: [
      {
        title: "创建物料",
        path: "/material/marker/-1"
      }
    ]
  }
];
export default menus;
