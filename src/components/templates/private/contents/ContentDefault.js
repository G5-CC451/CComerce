import React from "react";
import { colors } from "@/config/theme";
import { Layout } from "antd";

const { Content } = Layout;

const ContentDefault = ({ children }) => {
  return (
    <Content style={{ backgroundColor: colors.backgroundColor.primary }}>
      {children}
    </Content>
  );
};

export default ContentDefault;
