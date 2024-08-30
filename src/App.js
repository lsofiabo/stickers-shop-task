import "./App.css";
import { useEffect, useState } from "react";
import { Modal } from "@mui/material";

import "@fontsource/roboto";

import { ProductList } from "./Product";
import { Cart } from "./Cart";

function CartButton({ cart, setCart, change_product_quantity }) {
  let [cartOpened, setCartOpened] = useState(false);

  function openCart() {
    setCartOpened(true);
  }
  function closeCart() {
    setCartOpened(false);
  }
  return (
    <>
      <Modal open={cartOpened} onClose={closeCart}>
        <Cart
          close={closeCart}
          cart={cart}
          setCart={setCart}
          change_product_quantity={change_product_quantity}
        />
      </Modal>
      <span className="cart-button" onClick={openCart}>
        Cart
        <span className="counter">{cart ? cart.length : 0}</span>
      </span>
    </>
  );
}

function Header({ cart, setCart }) {
  return (
    <header className="header">
      <a href="/" className="nav-logo">
        Stickerz
      </a>
      <nav>
        <span className="active-nav-button">Home</span>
        <span>Products</span>
        <span>Contacts</span>
        <CartButton cart={cart} setCart={setCart} />
      </nav>
    </header>
  );
}
function Slider({ images }) {
  let [imageIndex, setImageIndex] = useState(null);

  return (
    <div className="slider">
      <div className="slider-images">
        {images &&
          images.map((el) => (
            <img
              key={el}
              src={el}
              style={{ translate: `${-100 * imageIndex}%` }}
            />
          ))}
      </div>
      <div className="slider-controller">
        {images &&
          images.map((_, index) => (
            <span
              onClick={() => {
                setImageIndex(index);
              }}
              key={index}
              className="slider-controller-button"
            ></span>
          ))}
      </div>
    </div>
  );
}

function App() {
  let [products, setProducts] = useState(null);
  let [cart, setCart] = useState(() => {
    const fromStorage = localStorage.getItem("cart");
    return JSON.parse(fromStorage) || null;
  });

  function AddToCart(product) {
    if (cart == null) {
      setCart([{ ...product, quantity: 1 }]);
    } else {
      const foundIndex = cart.findIndex((el) => el.name === product.name);
      if (foundIndex !== -1) {
        let newCart = Array.from(cart);
        newCart[foundIndex].quantity += 1;
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    }
  }

  useEffect(() => {
    const data = require("./api/products.json");
    setProducts(data.products);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const imagesFromProducts = products
    ? products.map((el) => "/stickers/" + el.image)
    : null;
  return (
    <>
      <Header cart={cart} setCart={setCart} />
      <div className="app">
        <Slider images={imagesFromProducts} />
        <ProductList products={products} add_to_cart={AddToCart} />
      </div>
    </>
  );
}

export default App;
