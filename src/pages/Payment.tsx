
import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

const Payment: React.FC = () => {
  return (
    <Layout>
      <PageHeader title="Payment" />
      <Result
        status="info"
        title="Please complete your payment"
        subTitle="Scan the QR code below to pay via PromptPay"
        extra={[
          <Button type="primary" key="console">
            Check Payment Status
          </Button>,
          <Button key="buy"><Link to="/status">View Order Status</Link></Button>,
        ]}
      />
      {/* TODO: Add QR code image here */}
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        [PromptPay QR Code Placeholder]
      </div>
    </Layout>
  );
};

export default Payment;