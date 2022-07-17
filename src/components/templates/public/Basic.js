import React from "react";
// Components
import { Layout } from "antd";
import HeaderDefault from "@/components/templates/public/headers/HeaderDefault";
import ContentDefault from "@/components/templates/public/contents/ContentDefault";
import FooterDefault from "@/components/templates/public/footers/FooterDefault";

const PublicBasic = ({ children }) => {
  return (
    <Layout>
      <HeaderDefault />
      <ContentDefault>{children}</ContentDefault>
      <FooterDefault />
    </Layout>
  );
};

export default PublicBasic;
