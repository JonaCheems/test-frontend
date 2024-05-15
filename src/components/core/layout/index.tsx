import { Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
const { Content, Footer } = Layout;

export default function LayoutGeneral({ children }: any) {
  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="vertical"
          defaultSelectedKeys={["2"]}
          items={[{ key: "1", label: "Clientes" }]}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: "24px 48px" }}>{children}</Content>
      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>
  );
}
