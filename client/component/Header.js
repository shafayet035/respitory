import { useState } from "react";
import { Menu } from "antd";
import { HomeOutlined, LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import Link from "next/link";

const Header = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link href="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="register" icon={<UserAddOutlined />}>
        <Link href="/register">Register</Link>
      </Menu.Item>
      <Menu.Item key="login" icon={<LoginOutlined />}>
        <Link href="/login">Login</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
