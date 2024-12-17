import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardActions, Typography, Button as MUIButton } from "@mui/material";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  thumbnail: string;
  brand: string;
  stock: number;
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      fetch(`https://dummyjson.com/products/search?q=${query}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch products");
          }
          return res.json();
        })
        .then((data) => {
          setResults(data.products || []); // Safeguard against missing `products`
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [query]);

  if (loading) return <p>Loading search results...</p>;
  if (error) return <p>Error: {error}</p>;
  if (results.length === 0) return <p>No results found for "{query}".</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
      {results.map((product) => (
        <Card key={product.id} style={{ maxWidth: 300 }}>
          {product.thumbnail && (
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: "100%", height: "auto" }}
            />
          )}
          <CardContent>
            <Typography variant="h5" component="div">
              {product.title}
            </Typography>
            <Typography color="textSecondary">Brand: {product.brand}</Typography>
            <Typography variant="body2">Category: {product.category}</Typography>
            <Typography variant="body2">Rating: {product.rating}</Typography>
            <Typography variant="body2">Price: $ {product.price}</Typography>
            <Typography variant="body2">Stock: {product.stock}</Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between" }}>
            <MUIButton variant="contained" color="success">
              Add
            </MUIButton>
            <MUIButton variant="contained" color="error">
              Delete
            </MUIButton>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default SearchResults;