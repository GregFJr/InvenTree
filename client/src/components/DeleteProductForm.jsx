// import React, { useState } from 'react';
// import { useMutation, gql } from '@apollo/client';

// const DELETE_PRODUCT = gql`

// export default function App() {
//   const [visible, setVisible] = useState(true);
//   const removeElement = () => {
//     setVisible((prev) => !prev);
//   };
//   return (
//     <div>
//       Click to remove element
//       <br />
//       {visible && (
//         <button onClick={removeElement}>Remove</button>
//       )}
//     </div>
//   );
// }

const DeleteProductForm = () => {
    const [products, setProducts] = useState([
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
      { id: 3, name: 'Product 3' },
    ]);
  
    const handleDelete = (productId) => {
      // Remove the product from the list
      const updatedProducts = products.filter((product) => product.id !== productId);
  
      // Update the state with the updated list of products
      setProducts(updatedProducts);
    };
  
    return (
      <div>
        <h1>Product List</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name}
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ProductList;