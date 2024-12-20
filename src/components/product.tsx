import { useState, useEffect } from "react";
import { Card, CardContent, CardActions, CardMedia, Typography, Button as MUIButton } from "@mui/material";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import { useDispatch } from "react-redux";
import { add } from "./Store/CartSlice";
import AddProduct from "./AddProduct";

interface Product {
    id: number;
    title: string;
    brand: string;
    description: string;
    category: string;
    price: number;
    rating: string;
    stock: string;
    thumbnail: string;
}

const Product = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    useEffect(() => {
        fetch("https://dummyjson.com/products")
            .then((data) => data.json())
            .then((result) => setProducts(result.products));
    }, []);


    const addToCart = (product: Product) => {
        // Dispatch an add action
        dispatch(add(product));
    };

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <Container>
            <h1 className="text-center mb-4">Product Dashboard</h1>
            <Row>
                {currentProducts.map((product) => (
                    <Col xs={12} sm={6} md={4} key={product.id} className="d-flex justify-content-center mb-4">
                        <Card sx={{ width: 300, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <CardMedia component="img" height="140" image={product.thumbnail} />
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {product.title}
                                </Typography>
                                <Typography color="textSecondary">Brand: {product.brand}</Typography>
                                <Typography variant="body2">Category: {product.category}</Typography>
                                <Typography variant="body2">Rating: {product.rating}</Typography>
                                <Typography variant="body2">Price: $ {product.price}</Typography>
                                <Typography variant="body2">Stock: {product.stock}</Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "space-between" }}>
                                <MUIButton variant="contained" color="success" onClick={() => addToCart(product)}>
                                    Add
                                </MUIButton>
                                <MUIButton variant="contained" color="error">
                                    Delete
                                </MUIButton>
                            </CardActions>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-4">
                <Pagination>
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                </Pagination>
            </div>
        </Container>
    );
};

export default Product;
