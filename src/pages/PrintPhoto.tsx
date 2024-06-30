import React, { useState } from 'react';
import { Form, Input, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

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
      <PageHeader title="Print Your Photo" />
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="photo" label="Photo" rules={[{ required: true, message: 'Please upload a photo!' }]}>
          <Upload {...props} listType="picture">
            <Button icon={<UploadOutlined />}>Select Photo</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default PrintPhoto;