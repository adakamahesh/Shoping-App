import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box } from "@mui/material";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      title,
      brand,
      price: parseFloat(price),
      category,
      thumbnail,
    };

    try {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const result = await response.json();
      console.log("Added Product:", result);

      setSuccessMessage("Product added successfully!");
      setTimeout(() => {
        navigate("/"); // Redirect to product list after success
      }, 2000);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Box
      component="form"
      sx={{ maxWidth: 400, margin: "auto", padding: 3, border: "1px solid #ccc", borderRadius: 2 }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" gutterBottom>
        Add New Product
      </Typography>
      <TextField
        fullWidth
        label="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Thumbnail URL"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
        required
        margin="normal"
      />
      <Button variant="contained" color="primary" type="submit" fullWidth sx={{ marginTop: 2 }}>
        Add Product
      </Button>
      {successMessage && (
        <Typography color="success" sx={{ marginTop: 2 }}>
          {successMessage}
        </Typography>
      )}
    </Box>
  );
};

export default AddProduct;