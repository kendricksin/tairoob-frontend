import React, { useState } from 'react';
import { Form, Input, Button, Table, Tag } from 'antd';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

const Status: React.FC = () => {
  const [form] = Form.useForm();
  const [orders, setOrders] = useState<any[]>([]);

  const onFinish = (values: any) => {
    console.log('Checking status for:', values);
    // TODO: Implement status retrieval logic
    // This is a mock response
    setOrders([
      {
        key: '1',
        orderId: 'ORD001',
        date: '2024-07-01',
        status: 'Processing',
        details: 'Photo print 5x7',
      },
      {
        key: '2',
        orderId: 'ORD002',
        date: '2024-06-30',
        status: 'Shipped',
        details: 'Photo print 8x10',
      },
    ]);
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Processing' ? 'blue' : 'green'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
    },
  ];

  return (
    <Layout>
      <PageHeader title="Order Status" />
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="postalCode" rules={[{ required: true, message: 'Please input your postal code!' }]}>
          <Input placeholder="Postal Code" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Check Status
          </Button>
        </Form.Item>
      </Form>
      {orders.length > 0 && (
        <Table columns={columns} dataSource={orders} style={{ marginTop: 20 }} />
      )}
    </Layout>
  );
};

export default Status;