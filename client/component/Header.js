import { useEffect, useState } from "react";
import { Menu } from "antd";
import { HomeOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../store";
import useAuth from "../hooks/useAuth";

const { Item, SubMenu } = Menu;

const Header = () => {
  const router = useRouter();
  const [currentMenu, setCurrentMenu] = useState("");

  const user = useUser();
  const { logOutHandler } = useAuth();

  useEffect(() => {
    setCurrentMenu(router.pathname);
  }, [router.pathname]);

  return (
    <Menu mode="horizontal" onClick={(e) => setCurrentMenu(e.key)} selectedKeys={[currentMenu]}>
      <Item key="/" icon={<HomeOutlined />}>
        <Link href="/">Home</Link>
      </Item>
      {!user && (
        <>
          <Item key="/register" icon={<UserAddOutlined />}>
            <Link href="/register">Register</Link>
          </Item>
          <Item key="/login" icon={<LoginOutlined />}>
            <Link href="/login">Login</Link>
          </Item>
        </>
      )}
      {user && (
        <SubMenu className="ms-auto" key="SubMenu" icon={<UserOutlined />} title="Profile">
          <Item key="/user/profile" icon={<LogoutOutlined />}>
            <Link href="/user/profile">{user.userName}</Link>
          </Item>
          <Item key="/logout" icon={<LogoutOutlined />} onClick={() => logOutHandler()}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
