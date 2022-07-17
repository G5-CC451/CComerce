import React from "react";
// Components
import { Layout } from "antd";
import { Offers, Recommendations } from "@/components/organisms/home";
import CategorySidebar from "@/components/templates/public/siderbars/CategorySidebar";
import PublicBasic from "@/components/templates/public/Basic";

const { Header, Sider, Content } = Layout;

const Index = () => {
  return (
    <PublicBasic>
      <Layout>
        <Header
          style={{
            padding: "0 16px",
            margin: "32px 0 16px 0",
            minHeight: 330,
            backgroundColor: "transparent",
          }}
        >
          <Offers />
        </Header>
      </Layout>
      <Layout>
        <Sider
          width="480px"
          style={{
            padding: "0 16px",
            margin: "16px 0",
            minHeight: 330,
            backgroundColor: "transparent",
          }}
        >
          <CategorySidebar />
        </Sider>
        <Content
          style={{
            padding: "0 16px 0 0",
            margin: "16px 0",
            minHeight: 330,
          }}
        >
          <Recommendations />
        </Content>
      </Layout>
    </PublicBasic>
  );
};

export default Index;
