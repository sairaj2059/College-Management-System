import React from "react";
import { Dropdown, Space, Typography } from "antd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const DropdownComponent = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

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
          onClick={() => handleNavigation("/")}
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
      <a onClick={(e) => e.preventDefault()} style={{ cursor: "pointer" }}>
        <Space>
          <ExpandMoreIcon />
        </Space>
      </a>
    </Dropdown>
  );
};
