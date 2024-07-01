import React, { useState } from 'react';
import { Form, Input, Upload, Button, message, Select, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import axios from 'axios';

const { Option } = Select;

const PrintPhoto: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<any[]>([]);

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append('name', values.Name);
      formData.append('email', values.Email);
      formData.append('address', JSON.stringify(values.address));
      
      if (fileList[0] && fileList[0].originFileObj) {
        formData.append('photo', fileList[0].originFileObj, fileList[0].originFileObj.name);
      }

      console.log('FormData entries:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axios.post('http://localhost:5000/api/orders', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log('Success:', response.data);
      message.success('Order submitted successfully!');
      navigate('/payment');
    } catch (error) {
      console.error('Error:', error);
      message.error('Failed to submit order. Please try again.');
    }
  };

  const props = {
    onRemove: (file: any) => {
      setFileList([]);
    },
    beforeUpload: (file: any) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <PageHeader title="Print Your Photo" />
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 600, width: '100%', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ flex: 1 }}>
            <Form.Item name="Name" label="Name" rules={[{ required: true, message: 'Please input your name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="Email" label="Email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Address">
              <Space.Compact>
                <Form.Item
                  name={['address', 'province']}
                  noStyle
                  rules={[{ required: true, message: 'Province is required' }]}
                >
                  <Select placeholder="Select Area in Bangkok">
                    <Option value="Sathorn">Sathorn</Option>
                    <Option value="Nonthaburi">Nonthaburi</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={['address', 'street']}
                  noStyle
                  rules={[{ required: true, message: 'Street is required' }]}
                >
                  <Input style={{ width: '100%' }} placeholder="Input street" />
                </Form.Item>
              </Space.Compact>
            </Form.Item>
            <Form.Item name="photo" label="Photo" rules={[{ required: true, message: 'Please upload a photo!' }]}>
              <Upload {...props} listType="picture">
                <Button icon={<UploadOutlined />}>Select Photo</Button>
              </Upload>
            </Form.Item>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default PrintPhoto;