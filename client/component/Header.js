import { useEffect, useState } from "react";
import { Menu } from "antd";
import { HomeOutlined, LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLogout } from "../store";

const Header = () => {
  const router = useRouter();
  const [currentMenu, setCurrentMenu] = useState("");

  const logout = useLogout();

  useEffect(() => {
    setCurrentMenu(router.pathname);
  }, [router.pathname]);

  const logoutHandler = () => {
    logout();
    window.localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <Menu mode="horizontal" onClick={(e) => setCurrentMenu(e.key)} selectedKeys={[currentMenu]}>
      <Menu.Item key="/" icon={<HomeOutlined />}>
        <Link href="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/register" icon={<UserAddOutlined />}>
        <Link href="/register">Register</Link>
      </Menu.Item>
      <Menu.Item key="/login" icon={<LoginOutlined />}>
        <Link href="/login">Login</Link>
      </Menu.Item>
      <Menu.Item key="/logout" icon={<LoginOutlined />} onClick={logoutHandler}>
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default Header;
