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
import NewProduct from "./pages/NewProduct";
import ManageShop from "./pages/ManageShop";
import EditProduct from "./pages/EditProduct";
import { jwtDecode } from "jwt-decode";
import NotFound from "./components/NotFound"; 

function App() {
  // this is for the state
  const [cart, setCart] = useState(() => {
    const cartProducts = localStorage.getItem("cart");
    if (cartProducts) {
      return JSON.parse(cartProducts);
    } else {
      return [];
    }
  });
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(()=>{
    const jwtToken = localStorage.getItem("token")
    if(jwtToken){
      var decoded = jwtDecode(jwtToken);
      console.log(decoded)
      setUser(decoded)
      return jwtToken;
      
    }else {
      return null
    }
  })



  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  function handleTokenAdd(tokn){
    var decoded = jwtDecode(tokn);
    setUser(decoded)
    localStorage.setItem("token", tokn)
    setToken(tokn)
  }
  function logOut(){
    localStorage.removeItem("token");
    setToken(null)
    setUser(null)
  }

  function handleProductAdd(newProduct) {
    console.log(newProduct)
    const existingProduct = cart.find((product) => product._id === newProduct._id);

    if (existingProduct) {
      const updatedCart = cart.map((product) => {
        if (product._id === newProduct._id) {
          return newProduct;
        }
        return products;
      });
      setCart(updatedCart);
    } else {
      setCart([...cart, newProduct]);
    }
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
      <Header cart={cart} user={user} logOut={logOut} />
      <Routes>
        <Route path="/" element={<Home user={user}  />} />
        <Route path="/about"  element={<About user={user}  />} />
        <Route path="/shop"  element={<Shop user={user} />} />
        <Route path="/cart"  element={<Cart  user={user}   cart={cart} onProductDelete={handleProductDelete} onProductAdd={handleProductAdd} onQuantityChange={handleQuantityChange} />} />
        <Route path="/login"  element={<Login user={user}  token={token} handleTokenAdd = {handleTokenAdd} />} />
        <Route path="/product/edit/:id"  element={<EditProduct user={user}  />} />
        <Route path="/product/new"   element={<NewProduct user={user} />} />
        <Route path="/product/:id"  element={<Product user={user}  cart={cart} onProductAdd={handleProductAdd} onProductDelete={handleProductDelete} />} />
        <Route path="/shop/manage" element={<ManageShop user={user}  />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
