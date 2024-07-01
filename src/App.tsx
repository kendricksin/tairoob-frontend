import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import PrintPhoto from './pages/PrintPhoto';
import Payment from './pages/Payment';
import Status from './pages/Status';
import { ConfigProvider } from 'antd';

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/print" element={<PrintPhoto />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/status" element={<Status />} />
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
};

export default App;