import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardActions,CardMedia, Typography, Button as MUIButton } from "@mui/material";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category:string;
  rating:number;
  thumbnail: string;
  brand:string;
  stock:number;
}

const SingleProduct = () => {
  const { id } = useParams<{ id: string }>(); // Get the product ID from the URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`https://dummyjson.com/products/${id}`) // Use the ID in the API call
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch product");
          }
          return res.json();
        })
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Card style={{ maxWidth: 300, margin: "20px auto" }}>
      {product?.thumbnail && (
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{ width: "100%", height: "auto" }}
        />
      )}
      <CardContent>
        <Typography variant="h5" component="div">
          {product?.title}
        </Typography>
        <Typography color="textSecondary">Brand:{product?.brand}</Typography>
        <Typography variant="body2">Category: {product?.category}</Typography>
        <Typography variant="body2">Rating: {product?.rating}</Typography>
        <Typography variant="body2">Price:$ {product?.price}</Typography>
        <Typography variant="body2">Stock: {product?.stock}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
            <MUIButton variant="contained" color="success">Add</MUIButton>
            <MUIButton variant="contained" color="error">Delete</MUIButton>
        </CardActions>
    </Card>
  );
};

export default SingleProduct;