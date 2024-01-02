import "./App.scss";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";

function App() {
  const [cart, setCart] = useState(() => {
    const cartProducts = localStorage.getItem("cart");
    if (cartProducts) {
      return JSON.parse(cartProducts);
    } else {
      return [];
    }
  });

  const [products, setProducts] = useState([]); 

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function handleProductAdd(newProduct, quantity) {
    const { _id, quantity: newQuantity } = newProduct;
    const existingProductIndex = cart.findIndex((product) => product._id === _id);

    if (existingProductIndex !== -1) {
      const updatedCart = cart.map((product, index) => {
        if (index === existingProductIndex) {
          return {
            ...product,
            quantity: product.quantity + newQuantity,
          };
        }
        return product;
      });
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...newProduct,
          quantity: quantity,
        },
      ]);
    }
//makes sure the stock quantity cannot be less than 0
    const updatedStock = products.map((product) => {
      if (product._id === _id) {
        return {
          ...product,
          stock: Math.max(0, product.stock - newQuantity),
        };
      }
      return product;
    });

    setProducts(updatedStock);
  }

 function handleProductDelete(id, quantityToRemove) {
  const updatedCart = cart.map((product) => {
    if (product._id === id) {
      const remainingQuantity = Math.max(0, product.quantity - quantityToRemove);

      if (remainingQuantity === 0) {
        // If the remaining quantity is zero, do not include the product in the updated cart
        return null;
      }

      return { ...product, quantity: remainingQuantity };
    }

    return product;
  });
//removes any product entries from the cart that were flagged as null
  const filteredCart = updatedCart.filter((product) => product !== null);

  setCart(filteredCart);
}

  function handleQuantityChange(id, newQuantity) {
    const productIndex = cart.findIndex((product) => product._id === id);

    if (productIndex !== -1) {
      const updatedCart = [...cart];

      if (newQuantity === 0) {
        // remove the product from the cart if quantity becomes zero
        updatedCart.splice(productIndex, 1);
      } else {
        // update the quantity of the product
        updatedCart[productIndex] = {
          ...updatedCart[productIndex],
          quantity: newQuantity,
        };
      }

      // Update the cart state
      setCart(updatedCart);
    }
  }

  return (
    <div className="App">
      <Header cart={cart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route
          path="/cart"
          element={<Cart cart={cart} onProductDelete={handleProductDelete} onQuantityChange={handleQuantityChange} />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/product/:id"
          element={<Product cart={cart} onProductAdd={handleProductAdd} onProductDelete={handleProductDelete} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
