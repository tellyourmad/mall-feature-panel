import Home from "@pages/Home/Home";
import ComponentCustom from "@pages/Component/ComponentCustom/ComponentCustom";
const routes: Array<IRouteItem> = [
  {
    path: "/",
    exact: true,
    redirect: "home"
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/component/custom",
    name: "ComponentCustom",
    component: ComponentCustom
  }
];

export function getRouteByName(name: string) {
  for (let item of routes) {
    if (item.name === name) {
      return item;
    }
  }
  return routes[0];
}

export default routes;
