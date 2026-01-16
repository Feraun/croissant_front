import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader/AppHeader";
import AppFooter from "../components/AppFooter/AppFooter";
import AppSider from "../components/AppSider";

const { Content } = Layout;

function MainLayout() {
  return (
    <Layout className="page">
      <AppHeader />
      <Layout>
        <AppSider />
        <Content className="page-content">
          <Outlet />
        </Content>
      </Layout>
      <AppFooter />
    </Layout>
  );
}

export default MainLayout;
