import React from "react";
import { Dropdown, Space, Typography } from "antd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const items = [
  {
    label: (
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <UserOutlined />
        <Typography>Edit profile</Typography>
      </a>
    ),
    key: "0",
  },
  {
    label: (
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "right",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <SettingOutlined />
        <Typography>Settings</Typography>
      </a>
    ),
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: (
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <LogoutOutlined />
        <Typography>Sign out</Typography>
      </a>
    ),
    key: "3",
  },
];

export const DropdownComponent = () => (
  <Dropdown
    menu={{
      items,
    }}
    trigger={["click"]}
    overlayStyle={{ minWidth: 130, minHeigh: 160, textAlign: "right" }}
  >
    <a onClick={(e) => e.preventDefault()}  style={{ cursor: "pointer" }}>
      <Space>
        <ExpandMoreIcon />
      </Space>
    </a>
  </Dropdown>
);
