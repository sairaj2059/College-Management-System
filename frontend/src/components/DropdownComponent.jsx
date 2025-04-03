import React, { useState } from "react";
import { Modal, Form, Input, Button, message, Dropdown, Space, Typography } from "antd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UserOutlined, SettingOutlined, LogoutOutlined, KeyOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

export const DropdownComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const logOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handlePasswordChange = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const response = await fetch("http://localhost:8080/change-password", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}` // Include token if needed
        },
        body: JSON.stringify({
          username: localStorage.getItem("username"), // Use logged-in user's username
          
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        message.success("Password updated successfully!");
        handleCloseModal();
      } else {
        message.error("Invalid old password.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      message.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const items = [
    {
      label: (
        <div
          onClick={showModal}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <KeyOutlined />
          <Typography>Change Password</Typography>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div
          onClick={() => handleNavigation("/settings")}
          style={{
            display: "flex",
            alignItems: "center",
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
    <>
      {/* Dropdown Menu */}
      <Dropdown menu={{ items }} trigger={["click"]} overlayStyle={{ minWidth: 130, textAlign: "right" }}>
        <span style={{ cursor: "pointer" }}>
          <Space>
            <ExpandMoreIcon sx={{ color: "white" }} />
          </Space>
        </span>
      </Dropdown>

      {/* Change Password Modal */}
      <Modal
        title="Change Password"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handlePasswordChange}>
            Change Password
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="oldPassword"
            label="Current Password"
            rules={[{ required: true, message: "Please enter your current password!" }]}
          >
            <Input.Password placeholder="Enter current password" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Please enter a new password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
