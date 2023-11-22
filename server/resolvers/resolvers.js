const Product = require("../models/Product");

const resolvers = {
  Query: {
    // Fetch all products
    products: async () => {
      try {
        const products = await Product.find();
        return products;
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching products");
      }
    },
    // Fetch a single product by ID
    product: async (_, { id }) => {
      try {
        const product = await Product.findById(id);
        return product;
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching product");
      }
    },
  },
  Mutation: {
    // Add a new product
    addProduct: async (_, { name, description, price, quantity, category }) => {
      try {
        const newProduct = new Product({
          name,
          description,
          price,
          quantity,
          category,
        });
        const savedProduct = await newProduct.save();
        return savedProduct;
      } catch (error) {
        console.error(error);
        throw new Error("Error adding product");
      }
    },
    // Update an existing product
    updateProduct: async (
      _,
      { id, name, description, price, quantity, category }
    ) => {
      try {
        const updatedProduct = await Product.findByIdAndUpdate(
          id,
          { name, description, price, quantity, category },
          { new: true }
        );
        return updatedProduct;
      } catch (error) {
        console.error(error);
        throw new Error("Error updating product");
      }
    },
    // Delete a product
    deleteProduct: async (_, { id }) => {
      try {
        const product = await Product.findById(id);
        if (!product) {
          throw new Error("Product not found");
        }
        await Product.findByIdAndDelete(id);
        return product; 
      } catch (error) {
        console.error(error);
        throw new Error("Error deleting product");
      }
    },
  },
};

module.exports = resolvers;
