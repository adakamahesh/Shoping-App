import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams

const EditProduct = () => {
  // Extract the productId from the route parameters
  const { productId } = useParams<{ productId: string }>();

  const [title, setTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // You can now use the productId to fetch the product or update it
    if (productId) {
      fetch(`https://dummyjson.com/products/${productId}`)
        .then((response) => response.json())
        .then((data) => setTitle(data.title));
    }
  }, [productId]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updatedProduct = await response.json();
      console.log("Updated Product:", updatedProduct);
      setSuccessMessage(`Product updated successfully!`);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Product</button>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default EditProduct;
