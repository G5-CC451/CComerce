import React from "react";
import { colors } from "@/config/theme";
import { Layout } from "antd";

const { Content } = Layout;

const ContentDefault = ({ children }) => {
  return (
    <Content
      style={{
        backgroundColor: colors.backgroundColor.primary,
        height: "calc(100vh - 140px)",
      }}
    >
      {children}
    </Content>
  );
};

export default ContentDefault;
