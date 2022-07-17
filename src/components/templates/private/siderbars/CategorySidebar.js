import React, { useState, useEffect } from "react";
// Business logic
import { getCategories } from "@/functions/category";
// Components
import { Layout, Menu } from "antd";
// Assets
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

const CategorySidebar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  return (
    <Sider className="site-layout-background" width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{
          height: "100%",
        }}
        items={
          categories.length > 0 &&
          categories.map((category, idx) => {
            const key = String(idx + 1);
            return {
              key: `category-${key}`,
              label: category.name,
              children: new Array(4).fill(null).map((_, j) => {
                const subKey = idx * 4 + j + 1;
                return {
                  key: subKey,
                  label: `option${subKey}`,
                };
              }),
            };
          })
        }
      />
    </Sider>
  );
};

export default CategorySidebar;
