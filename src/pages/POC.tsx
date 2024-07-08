import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, message, Spin } from 'antd';
import axios from 'axios';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import { useLocation } from 'react-router-dom';
import { API_URL } from './config'

const { Meta } = Card;

interface LocationState {
  orderId: string;
  selectedTemplate: string;
  uploadedFile: File;
}

const POC: React.FC = () => {
  const location = useLocation();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const state = location.state as LocationState;
    if (state) {
      setOrderId(state.orderId);
      setSelectedTemplate(state.selectedTemplate);
      setUploadedImage(state.uploadedFile);
    }
  }, [location.state]);

  const processImages = async () => {
    if (!selectedTemplate || !uploadedImage) {
      message.error('Missing template or uploaded image');
      return;
    }

    setLoading(true);
    setProcessedImage(null);  // Reset processed image

    try {
      const formData = new FormData();
      formData.append('source_image', uploadedImage, uploadedImage.name);

      // Fetch the template image file
      const templateResponse = await fetch(selectedTemplate);
      const templateBlob = await templateResponse.blob();
      const templateFile = new File([templateBlob], selectedTemplate.split('/').pop() || 'template.jpg', { type: templateBlob.type });
      formData.append('dest_image', templateFile, templateFile.name);
      console.log('Order ID', orderId)
      console.log('Sending request with:', {
        source_image: uploadedImage.name,
        dest_image: templateFile.name
      });

      const response = await axios.post(`${API_URL}/swapper`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'arraybuffer'  // Expect binary data in response
      });

      console.log('Server response received, type:', response.headers['content-type']);

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: 'image/png' });

      // Create a URL for the Blob
      const imageUrl = URL.createObjectURL(blob);

      console.log('Processed image URL:', imageUrl);

      setProcessedImage(imageUrl);
    } catch (error) {
      console.error('Error processing images:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server responded with:', error.response.data);
      }
      message.error('Failed to process images');
    } finally {
      setLoading(false);
    }
  };

  // Clean up object URL when component unmounts or processedImage changes
  useEffect(() => {
    return () => {
      if (processedImage) {
        URL.revokeObjectURL(processedImage);
      }
    };
  }, [processedImage]);

  const cardStyle = {
    width: '90%',
    height: '600px', // Fixed height for all cards
    overflow: 'hidden'
  };

  const imageStyle = {
    width: '90%',
    height: '400px', // Fixed height for images
    objectFit: 'cover' as const // This ensures the image covers the area without distortion
  };

  return (
    <Layout>
      <PageHeader title="Proof of Concept" />
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card 
            title="Selected Template" 
            style={cardStyle}
            cover={selectedTemplate && <img src={selectedTemplate} alt="Selected Template" style={imageStyle} />}
          >
            <Meta description={selectedTemplate ? selectedTemplate.split('/').pop() : 'No template selected'} />
          </Card>
        </Col>
        <Col span={8}>
          <Card 
            title="Uploaded Image" 
            style={cardStyle}
            cover={uploadedImage && <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded" style={imageStyle} />}
          >
            <Meta description={uploadedImage ? uploadedImage.name : 'No image uploaded'} />
          </Card>
        </Col>
        <Col span={8}>
          <Card 
            title="Processed Image" 
            style={cardStyle}
          >
            {loading ? (
              <Spin tip="Processing...">
                <div style={{ height: 400 }} />
              </Spin>
            ) : processedImage ? (
              <>
                <img src={processedImage} alt="Processed" style={imageStyle} />
                <Meta description="Processed image" />
              </>
            ) : (
              <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Meta description="Click 'Process Images' to see the result" />
              </div>
            )}
          </Card>
        </Col>
      </Row>
      <Button
        type="primary"
        onClick={processImages}
        disabled={!selectedTemplate || !uploadedImage}
        style={{ marginTop: '20px' }}
      >
        Process Images
      </Button>
    </Layout>
  );
};

export default POC;