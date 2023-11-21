import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProductForm from "./components/AddProductForm";
import DisplayAllProducts from "./components/DisplayAllProducts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<AddProductForm />} />
        <Route path="/products" element={<DisplayAllProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
