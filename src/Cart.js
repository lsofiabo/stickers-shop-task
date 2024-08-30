import {
  Typography,
  Card,
  CardActions,
  Button,
  CardContent,
  Box,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  TableBody,
  TableFooter,
  Stack,
  TextField,
  Fab,
} from "@mui/material";
import { useState, useEffect } from "react";
import popupstyle from "./popupstyle";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function ProductInACart({ product, cart, setCart, calculatePrice }) {
  function add() {
    let newCart = Array.from(cart);
    newCart[newCart.findIndex((el) => el.name === product.name)].quantity += 1;

    setCart(newCart);
    calculatePrice();
  }
  function remove() {
    let newCart = Array.from(cart);
    const index = newCart.findIndex((el) => el.name === product.name);
    newCart[index].quantity -= 1;
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }

    setCart(newCart);
    calculatePrice();
  }
  if (product) {
    return (
      <TableRow>
        <TableCell>{product.name}</TableCell>
        <TableCell>{product.price}</TableCell>
        <TableCell>
          <Fab size="small" onClick={() => add()}>
            <AddIcon />
          </Fab>
          {product.quantity}
          <Fab size="small" onClick={() => remove()}>
            <RemoveIcon></RemoveIcon>
          </Fab>
        </TableCell>
        <TableCell></TableCell>
      </TableRow>
    );
  } else {
    return <></>;
  }
}
function CartController({ cart, setCart }) {
  let [price, setPrice] = useState(0);
  function calculatePrice() {
    if (cart) {
      const total = cart.reduce(
        (acc, cur) => acc + cur.quantity * cur.price,
        0,
      );
      setPrice(total);
    } else {
      setPrice(0);
    }
  }

  useEffect(() => {
    calculatePrice();
  });
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart &&
            cart.map((product) => (
              <ProductInACart
                product={product}
                cart={cart}
                setCart={setCart}
                calculatePrice={calculatePrice}
              ></ProductInACart>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>TOTAL</TableCell>
            <TableCell>${price}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
function CartSubmitForm() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");

  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  }

  return (
    <Stack gap={2}>
      <TextField variant="outlined" label="Name"></TextField>
      <TextField variant="outlined" label="Email"></TextField>
    </Stack>
  );
}
export function Cart({ close, cart, setCart, change_product_quantity }) {
  return (
    <Box sx={popupstyle}>
      <Card>
        <CardContent>
          <Typography variant="subtitle1">Cart</Typography>
          <CartController
            cart={cart}
            setCart={setCart}
            change_product_quantity={change_product_quantity}
          />
          <CartSubmitForm />
        </CardContent>
        <CardActions>
          <Button variant="outlined" onClick={close}>
            Close
          </Button>
          <Button variant="contained">Order</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
