import React from 'react';
import { Dropdown, Space } from 'antd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const items = [
  {
    label: (
      <a href="#" target="_blank" rel="noopener noreferrer">
        your profile
      </a>
    ),
    key: '0',
  },
  {
    label: (
      <a href="#" target="_blank" rel="noopener noreferrer">
        settings
      </a>
    ),
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: 'sign out',
    key: '3',
  },
];

export const DropdownComponent = () => (
  <Dropdown
    menu={{
      items,
    }}
    trigger={['click']}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <ExpandMoreIcon />
      </Space>
    </a>
  </Dropdown>
);