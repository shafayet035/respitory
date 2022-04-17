import { useEffect, useState } from "react";
import { Menu } from "antd";
import { HomeOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLogout, useUser } from "../store";
import axios from "axios";
import { toast } from "react-toastify";

const { Item, SubMenu } = Menu;

const Header = () => {
  const router = useRouter();
  const [currentMenu, setCurrentMenu] = useState("");

  const logout = useLogout();
  const user = useUser();

  useEffect(() => {
    setCurrentMenu(router.pathname);
  }, [router.pathname]);

  const logoutHandler = async () => {
    logout();
    window.localStorage.removeItem("user");

    const { data } = await axios.post("/api/logout");

    router.push("/login");
    toast(data);
  };

  return (
    <Menu mode="horizontal" onClick={(e) => setCurrentMenu(e.key)} selectedKeys={[currentMenu]}>
      <Item key="/" icon={<HomeOutlined />}>
        <Link href="/">Home</Link>
      </Item>
      {!user ? (
        <>
          <Item key="/register" icon={<UserAddOutlined />}>
            <Link href="/register">Register</Link>
          </Item>
          <Item key="/login" icon={<LoginOutlined />}>
            <Link href="/login">Login</Link>
          </Item>{" "}
        </>
      ) : (
        <SubMenu className="ms-auto" key="SubMenu" icon={<UserOutlined />} title="Profile">
          <Item key="/logout" icon={<LogoutOutlined />} onClick={logoutHandler}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
