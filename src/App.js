import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Products from './components/ProductListing';
import ProductDetail from './components/ProductDetail'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
