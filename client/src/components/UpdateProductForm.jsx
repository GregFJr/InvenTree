import React, { useState, useEffect } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";

// GraphQL queries and mutations
const GET_PRODUCT_QUERY = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      quantity
      category
    }
  }
`;

// Your provided GraphQL mutation
const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct(
    $id: ID!
    $name: String
    $description: String
    $price: Float
    $quantity: Int
    $category: String
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      price: $price
      quantity: $quantity
      category: $category
    ) {
      id
      name
      description
      price
      quantity
      category
    }
  }
`;

const UpdateProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });

  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_PRODUCT_QUERY, {
    variables: { id },
  });

  const [updateProduct, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_PRODUCT_MUTATION, {
      onCompleted: () => {
        navigate("/products");
      },
    });

  // When data is fetched, populate the form state
  useEffect(() => {
    if (data && data.product) {
      setFormData(data.product);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { __typename, ...updateData } = formData;
    updateData.price = parseFloat(updateData.price);

    console.log("Submitting with data:", updateData);

    updateProduct({ variables: { id, ...updateData } })
      .then((response) => {
        console.log("Mutation response:", response);
      })
      .catch((updateError) => {
        console.error("Error in mutation:", updateError);
      });
  };

  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error loading product: {queryError.message}</p>;

  return (
    <div className="container mt-5">
      <h2>Update Product</h2>
      <div className="row">
        <div className="col-sm-12 col-md-10 col-lg-8 mx-auto"></div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">
              Name
            </label>
            <input
              id="productName"
              type="text"
              className="form-control"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="productDescription" className="form-label">
              Description
            </label>
            <textarea
              id="productDescription"
              className="form-control"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">
              Price ($)
            </label>
            <input
              id="productPrice"
              type="number"
              step="0.01"
              className="form-control"
              name="price"
              value={formData.price || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="productQuantity" className="form-label">
              Quantity
            </label>
            <input
              id="productQuantity"
              type="number"
              className="form-control"
              name="quantity"
              value={formData.quantity || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="productCategory" className="form-label">
              Category
            </label>
            <input
              id="productCategory"
              type="text"
              className="form-control"
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-success"
            disabled={updateLoading}
          >
            Update Product
          </button>
          {updateError && (
            <div className="alert alert-danger" role="alert">
              Error updating product: {updateError.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateProductForm;
