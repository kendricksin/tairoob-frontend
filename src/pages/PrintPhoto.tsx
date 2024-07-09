import React, { useState } from 'react';
import { Form, Input, Upload, Button, message, Select, Row, Col, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import axios from 'axios';
// import { DB_SERVER } from './config'

// Import the template images
import template1 from '../assets/template1.jpg';
import template2 from '../assets/template2.jpg';
import template3 from '../assets/template3.jpg';
import template4 from '../assets/template4.jpg';
import { Gutter } from 'antd/es/grid/row';

const { Option } = Select;

// Customizable variables
const FORM_MAX_WIDTH = 800;
const GRID_GUTTER: [Gutter, Gutter] = [16, 16];
const CARD_HEIGHT = 400;
const CARD_IMAGE_HEIGHT = 300;
const CARD_SELECT_BUTTON_WIDTH = '80%';
const GRID_COLUMN_SIZES = {
  xs: 24,
  sm: 12,
  md: 6,
  lg: 6,
  xl: 6
};

const SUBMIT_BUTTON_HEIGHT = 50;
const SUBMIT_BUTTON_FONT_SIZE = 18;

const PrintPhoto: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const templates = [
    { name: 'Student F', src: template1 },
    { name: 'Student M', src: template2 },
    { name: 'Formal F', src: template3 },
    { name: 'Formal M', src: template4 },
  ];

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append('name', values.Name);
      formData.append('email', values.Email);
      formData.append('address', JSON.stringify(values.address));
      formData.append('template', selectedTemplate || '');
      
      if (uploadedFile) {
        formData.append('photo', uploadedFile);
      }

      // const response = await axios.post(`${DB_SERVER}/api/orders`, formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });

      const response = await axios.post('http://8.213.210.6:5000/api/orders', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log('Success:', response.data);
      message.success('Order submitted successfully!');
      navigate('/poc', { 
        state: { 
          orderId: response.data.orderId,
          selectedTemplate: selectedTemplate,
          uploadedFile: uploadedFile
        } 
      });
    } catch (error) {
      console.error('Error:', error);
      message.error('Failed to submit order. Please try again.');
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e.fileList.length > 0) {
      setUploadedFile(e.fileList[0].originFileObj);
    }
    return e && e.fileList;
  };

  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <PageHeader title="Print Your Photo" />
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: FORM_MAX_WIDTH, width: '100%', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ flex: 1 }}>
            <Form.Item name="Name" label="Name" rules={[{ required: true, message: 'Please input your name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="Email" label="Email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Address">
              <Input.Group compact>
                <Form.Item
                  name={['address', 'province']}
                  noStyle
                  rules={[{ required: true, message: 'Province is required' }]}
                >
                  <Select style={{ width: '50%' }} placeholder="Select Area in Bangkok">
                    <Option value="Sathorn">Sathorn</Option>
                    <Option value="Nonthaburi">Nonthaburi</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={['address', 'street']}
                  noStyle
                  rules={[{ required: true, message: 'Street is required' }]}
                >
                  <Input style={{ width: '50%' }} placeholder="Input street" />
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item
              name="photo"
              label="Photo"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'Please upload a photo!' }]}
            >
              <Upload name="photo" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Select Photo</Button>
              </Upload>
            </Form.Item>
            <Form.Item name="template" label="Select Template" rules={[{ required: true, message: 'Please select a template!' }]}>
              <Row gutter={GRID_GUTTER}>
                {templates.map((template, index) => (
                  <Col {...GRID_COLUMN_SIZES} key={index}>
                    <Card
                      hoverable
                      style={{ width: '100%', height: `${CARD_HEIGHT}px`, textAlign: 'center' }}
                      cover={<img alt={template.name} src={template.src} style={{ height: CARD_IMAGE_HEIGHT, objectFit: 'cover' }} />}
                      onClick={() => {
                        setSelectedTemplate(template.src);
                        form.setFieldsValue({ template: template.src });
                      }}
                    >
                      <Card.Meta title={template.name} />
                      <Button
                        type={selectedTemplate === template.src ? 'primary' : 'default'}
                        style={{ marginTop: 16, width: CARD_SELECT_BUTTON_WIDTH }}
                      >
                        Select
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Form.Item>
          </div>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              danger  // This makes the button red
              style={{ 
                width: '100%',
                height: `${SUBMIT_BUTTON_HEIGHT}px`,
                fontSize: `${SUBMIT_BUTTON_FONT_SIZE}px`,
                fontWeight: 'bold'
              }}
            >
              Submit Order
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default PrintPhoto;