import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import '../styles/AddProductForm.css';
import Navbar from './NavBar';


const ADD_PRODUCT = gql`
  mutation AddProduct($name: String!, $description: String, $price: Float!, $quantity: Int!, $category: String) {
    addProduct(name: $name, description: $description, price: $price, quantity: $quantity, category: $category) {
      id
      name
    }
  }
`;

function AddProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: ''
  });

  const [addProduct] = useMutation(ADD_PRODUCT);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    addProduct({ variables: { ...formData, price: parseFloat(formData.price), quantity: parseInt(formData.quantity) } });
    setFormData({ name: '', description: '', price: '', quantity: '' });
  };

  return (
    <div>
    <Navbar />
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input name="name" type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input name="description" type="text" className="form-control" id="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">Price</label>
        <input name="price" type="number" className="form-control" id="price" value={formData.price} onChange={handleChange} placeholder="Price" />
      </div>
      <div className="mb-3">
        <label htmlFor="quantity" className="form-label">Quantity</label>
        <input name="quantity" type="number" className="form-control" id="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <input name="category" type="text" className="form-control" id="category" value={formData.category} onChange={handleChange} placeholder="Category" />
      </div>
      <button type="submit" className="btn btn-success">Add Product</button>
    </form>
    </div>
  );
}

export default AddProductForm;
