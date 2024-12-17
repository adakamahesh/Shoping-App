import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./Store/Store";
import Col from "react-bootstrap/Col";
import  Row  from "react-bootstrap/Row";
import { Card, CardContent, CardActions,CardMedia, Typography, Button as MUIButton } from "@mui/material";
import { remove } from "./Store/CartSlice";

interface CartItem {
  id: number;
  title: string;
  brand: string;
  category: string;
  rating: number;
  price: number;
  stock: number;
  thumbnail: string;
}

const Cart =()=>{
  const ProductCart = useSelector((state:RootState) => state.cart)
  const dispatch = useDispatch();

  const removeToCart =(id:number) =>{
    dispatch(remove(id));
  };

  const cards=ProductCart.map((product) => (
    <Col xs={12} sm={6} md={4} key={product.id} className="d-flex justify-content-center mb-4">
                        <Card sx={{ width: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.thumbnail}
                            />
                            <CardContent>
                                <Typography variant="h6" gutterBottom>{product.title}</Typography>
                                <Typography color="textSecondary">Brand:{product.brand}</Typography>
                                <Typography variant="body2">Category: {product.category}</Typography>
                                <Typography variant="body2">Rating: {product.rating}</Typography>
                                <Typography variant="body2">Price:$ {product.price}</Typography>
                                <Typography variant="body2">Stock: {product.stock}</Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'space-between' }}>
                                <MUIButton variant="contained" color="success">Add</MUIButton>
                                <MUIButton variant="contained" color="error" onClick={() => removeToCart(product.id)}>Delete</MUIButton>
                            </CardActions>
                        </Card>
                    </Col>
  ))
    return(
        <>
          <h2>Cart</h2>
          <div className="row">
            {cards}
          </div>
        </>
    )
}

export default Cart;