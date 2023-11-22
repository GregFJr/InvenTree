import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProductForm from "./components/AddProductForm";
import DisplayAllProducts from "./components/DisplayAllProducts";
import UpdateProductForm from "./components/UpdateProductForm";
import SplashScreen from "./components/SplashScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<AddProductForm />} />
        <Route path="/products" element={<DisplayAllProducts />} />
        <Route path="/update/:id" element={<UpdateProductForm />} />
      </Routes>
    </Router>
  );
}

export default App;
