import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_PRODUCT = gql`
  mutation AddProduct($name: String!, $description: String, $price: Float!, $quantity: Int!) {
    addProduct(name: $name, description: $description, price: $price, quantity: $quantity) {
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
    e.preventDefault();
    addProduct({ variables: { ...formData, price: parseFloat(formData.price), quantity: parseInt(formData.quantity) } });
    setFormData({ name: '', description: '', price: '', quantity: '' }); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input name="description" type="text" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" />
      <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} placeholder="Quantity" />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProductForm;
