import React from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  Switch,
  Route,
  Redirect,
  RouteComponentProps,
  withRouter
} from "react-router";
import { NavLink } from "react-router-dom";

import styles from "./App.module.less";
import menus from "./config/menu";
import routes from "./config/routes";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component<RouteComponentProps> {
  state = {
    collapsed: false
  };

  static childContextTypes = {
    menuCollapse: PropTypes.func
  };

  getChildContext() {
    return {
      menuCollapse: this.onCollapse.bind(this)
    };
  }

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout className={styles.app} style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse.bind(this)}
        >
          <Header className={styles.logo}>运营中心</Header>
          <Menu
            theme="dark"
            defaultSelectedKeys={[this.props.location.pathname]}
            mode="inline"
          >
            {menus.map((outer, n: number) => {
              if (typeof outer.children === "undefined") {
                return (
                  <Menu.Item key={outer.path || n}>
                    {outer.path ? (
                      <NavLink to={outer.path}>{outer.title}</NavLink>
                    ) : (
                      <span>{outer.title}</span>
                    )}
                  </Menu.Item>
                );
              } else {
                return (
                  <SubMenu
                    key={n}
                    title={
                      <span>
                        <span>{outer.title}</span>
                      </span>
                    }
                  >
                    {outer.children.map((inner, m: number) => (
                      <Menu.Item key={inner.path || m}>
                        {inner.path ? (
                          <NavLink to={inner.path}>{inner.title}</NavLink>
                        ) : (
                          <span>{inner.title}</span>
                        )}
                      </Menu.Item>
                    ))}
                  </SubMenu>
                );
              }
            })}
          </Menu>
        </Sider>
        <Layout className={styles.main}>
          <Header className={styles.header} style={{ padding: 0 }}>
            <Breadcrumb style={{ margin: 16 }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
          </Header>
          <Content className={styles.content}>
            <div>
              <Switch>
                <Route>
                  {routes.map(function({ redirect, component, ...props }, k) {
                    if (redirect) {
                      return (
                        <Route
                          key={k}
                          {...props}
                          render={() => <Redirect to={redirect} />}
                        />
                      );
                    } else {
                      return <Route key={k} {...props} component={component} />;
                    }
                  })}
                </Route>
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(App);
