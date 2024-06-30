import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import PrintPhoto from './pages/PrintPhoto';
import Payment from './pages/Payment';
import Status from './pages/Status';

const App: React.FC = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/print" element={<PrintPhoto />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;