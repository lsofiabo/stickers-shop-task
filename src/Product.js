import {
  Card,
  CardMedia,
  Modal,
  CardContent,
  Box,
  CardHeader,
  Typography,
  CardActions,
  Button,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import popupstyle from "./popupstyle";

export function ProductList({ products, add_to_cart }) {
  return (
    <div className="products-section">
      <span className="heading">Products</span>

      <div className="product-list">
        {products &&
          products.map((product) => (
            <Product
              key={product.name}
              add_to_cart_func={add_to_cart}
              product={product}
            />
          ))}
      </div>
    </div>
  );
}
function ProductInfo({ product, close }) {
  return (
    <Box sx={popupstyle}>
      <Card>
        <CardHeader>
          <Typography variant="subtitle1">{product.name}</Typography>
        </CardHeader>
        <CardContent>
          <CardMedia>
            <img src={"/stickers/" + product.image} />
          </CardMedia>
          <Typography variant="body1">{product.description}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" onClick={close}>
            Close
          </Button>
          <Button variant="contained">Buy for {product.price}</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
export function Product({ product, add_to_cart_func }) {
  const [infoOpen, setInfoOpen] = useState(false);
  const openInfo = () => setInfoOpen(true);
  const closeInfo = () => setInfoOpen(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const openAlert = () => setAlertOpen(true);
  const closeAlert = () => setAlertOpen(false);

  function productAction() {
    add_to_cart_func(product);
    openAlert();
  }

  return (
    <>
      <Modal open={infoOpen} onClose={closeInfo}>
        <ProductInfo product={product} close={closeInfo}></ProductInfo>
      </Modal>
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={closeAlert}
        message="Sticker added to cart!"
      ></Snackbar>
      <Card>
        <CardMedia>
          <img src={"/stickers/" + product.image} />
        </CardMedia>
        <CardContent>
          <Typography variant="subtitle1">{product.name}</Typography>
          <Typography variant="body1">{product.description}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={openInfo} variant="outlined">
            Info
          </Button>
          <Button variant="contained" onClick={() => productAction()}>
            Buy for ${product.price}
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
