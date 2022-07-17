import React from "react";
// Components
import { Layout } from "antd";
import HeaderDefault from "@/components/templates/private/headers/HeaderDefault";
import ContentDefault from "@/components/templates/private/contents/ContentDefault";
import FooterDefault from "@/components/templates/private/footers/FooterDefault";

const PrivateBasic = ({ children }) => {
  return (
    <Layout>
      <HeaderDefault />
      <ContentDefault>{children}</ContentDefault>
      <FooterDefault />
    </Layout>
  );
};

export default PrivateBasic;
