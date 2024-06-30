import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <Title level={1} style={{ marginBottom: 24 }}>{title}</Title>
  );
};

export default PageHeader;