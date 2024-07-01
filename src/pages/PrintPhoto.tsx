import React, { useState } from 'react';
import { Form, Input, Upload, Button, message, Select, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

const { Option } = Select;

const PrintPhoto: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<any[]>([]);

  const onFinish = (values: any) => {
    console.log('Success:', values);
    // TODO: Implement form submission logic
    message.success('Order submitted successfully!');
    navigate('/payment');
  };

  const props = {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: any) => {
      setFileList([...fileList, file]);
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