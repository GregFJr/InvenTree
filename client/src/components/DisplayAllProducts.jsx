import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import '../styles/DisplayAllProducts.css';
import Navbar from './NavBar';

const GET_PRODUCTS_BY_CATEGORY = gql`
  query {
    products {
      id
      name
      description
      price
      quantity
      category
    }
  }
`;

const ProductsByCategory = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATEGORY);
  const [productsByCategory, setProductsByCategory] = useState({});

  useEffect(() => {
    if (data && data.products) {
      const groupedByCategory = data.products.reduce((acc, product) => {
        const { category } = product;
        acc[category] = acc[category] || [];
        acc[category].push(product);
        return acc;
      }, {});

      setProductsByCategory(groupedByCategory);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Navbar />
      {Object.keys(productsByCategory).map((category) => (
        <div className='cat-container' key={category}>
          <h2 className='cat-heading'>{category}</h2>
          {productsByCategory[category].map((product) => (
            <div key={product.id}>
              <h3 className='prod-name'>{product.name}</h3>
              <p className='prod-info'>{product.description}</p>
              <p className='prod-info'>Price: ${product.price}</p>
              <p className='prod-info'>Quantity: {product.quantity}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductsByCategory;
