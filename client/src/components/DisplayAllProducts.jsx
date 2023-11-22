import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import '../styles/DisplayAllProducts.css';
import Navbar from './NavBar';

// GraphQL queries and mutations
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

const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

const ProductsByCategory = () => {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS_BY_CATEGORY);
  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION);
  const [productsByCategory, setProductsByCategory] = useState({});

  // Effect to group products by category
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

  // Handle product deletion
  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct({
        variables: { id: productId },
        update: (cache) => {
          // Get current products in cache
          const existingProducts = cache.readQuery({ query: GET_PRODUCTS_BY_CATEGORY });
          // Filter out the product we are deleting
          const newProducts = existingProducts.products.filter((product) => product.id !== productId);
          // Write the new products to the cache
          cache.writeQuery({
            query: GET_PRODUCTS_BY_CATEGORY,
            data: { products: newProducts },
          });
        },
      }).then(() => {
        // Optionally refetch products after deletion for instant UI update
        refetch();
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Navbar />
      {Object.keys(productsByCategory).map((category) => (
        <div className="cat-container" key={category}>
          <h2 className="cat-heading">{category}</h2>
          {productsByCategory[category].map((product) => (
            <div key={product.id} className="product-item">
              <h3 className="prod-name">{product.name}</h3>
              <p className="prod-info">{product.description}</p>
              <p className="prod-info">Price: ${product.price}</p>
              <p className="prod-info">Quantity: {product.quantity}</p>
              <button onClick={() => handleDelete(product.id)} className="btn btn-danger btn-sm">
                Delete
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductsByCategory;

