import React from 'react';
import { Typography, List, Button, Space } from 'antd';
import { CameraOutlined, MailOutlined, DollarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

const { Title, Paragraph } = Typography;

const Homepage: React.FC = () => {
  const steps = [
    {
      title: 'Upload Your Photo',
      description: 'Click on the "Print Photo" link in the navigation menu or use the button below to go to the upload page.',
      icon: <CameraOutlined />
    },
    {
      title: 'Enter Your Details',
      description: 'Provide your full name, email address, and upload the photo you want to print (accepted formats: JPG, PNG).',
      icon: <MailOutlined />
    },
    {
      title: 'Make Payment',
      description: 'After submitting your order, you\'ll be redirected to a payment page where you can pay using PromptPay.',
      icon: <DollarOutlined />
    },
    {
      title: 'Track Your Order',
      description: 'Use the link in the confirmation email or enter your email and postal code on the Status page to check your order progress.',
      icon: <CheckCircleOutlined />
    }
  ];

  return (
    <Layout>
      <PageHeader title="Welcome to Our Photo Print Service" />
      
      <Title level={2}>How to Use Our Service</Title>
      <List
        itemLayout="horizontal"
        dataSource={steps}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<div style={{ fontSize: '24px', color: '#1890ff' }}>{item.icon}</div>}
              title={<Typography.Text strong>{`Step ${index + 1}: ${item.title}`}</Typography.Text>}
              description={item.description}
            />
          </List.Item>
        )}
      />
      
      <Title level={2} style={{ marginTop: '24px' }}>Our Commitment</Title>
      <Paragraph>
        We strive to deliver high-quality prints of your cherished memories. Our team carefully processes each order to ensure the best results.
      </Paragraph>
      
      <Title level={2}>Ready to Start?</Title>
      <Space>
        <Button type="primary" icon={<CameraOutlined />} size="large">
          <Link to="/print">Print Your Photo Now</Link>
        </Button>
      </Space>
    </Layout>
  );
};

export default Homepage;