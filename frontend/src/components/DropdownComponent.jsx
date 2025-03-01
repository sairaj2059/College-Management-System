import React from "react";
import { Dropdown, Space, Typography } from "antd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

export const DropdownComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const logOut = () => {
    dispatch(logout());
    navigate("/login");
  }

  const items = [
    {
      label: (
        <div
          onClick={() => handleNavigation("/")}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <UserOutlined />
          <Typography>Edit profile</Typography>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div
          onClick={() => handleNavigation("/")}
          style={{
            display: "flex",
            alignItems: "right",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <SettingOutlined />
          <Typography>Settings</Typography>
        </div>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <div
          onClick={logOut}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <LogoutOutlined />
          <Typography>Sign out</Typography>
        </div>
      ),
      key: "3",
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={["click"]}
      overlayStyle={{ minWidth: 130, minHeigh: 160, textAlign: "right" }}
    >
      <span style={{ cursor: "pointer" }}>
        <Space>
          <ExpandMoreIcon />
        </Space>
      </span>
    </Dropdown>
  );
};
