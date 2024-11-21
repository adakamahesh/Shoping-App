import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup"; // Bootstrap ListGroup for display

interface Category {
  name: string;
  slug: string;
  url?: string; // Optional URL field
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch categories
    fetch("https://dummyjson.com/products/categories")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched categories:", data); // Debugging log
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Product Categories</h2>
      <ListGroup>
        {categories.map((category, index) => (
          <ListGroup.Item key={index}>
            {category.name} {/* Adjust field names based on the data structure */}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Categories;