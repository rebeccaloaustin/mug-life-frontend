import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Cart.scss";
import { loadStripe } from "@stripe/stripe-js";
import UserCheckout from "../components/UserCheckout";

export default function Cart({ cart, onProductDelete, onQuantityChange, user }) {
  const navigate = useNavigate();
  const paymentKey = process.env.REACT_APP_PK_KEY;
  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  useEffect(() => {
    
    console.log(user)
  }, []);
  const stripeLoadedPromise = loadStripe(paymentKey);

  function handleCheckout(event) {
    event.preventDefault();

    const lineItems = cart.map((product) => {
      return { price: product.price_id, quantity: product.quantity };
    });
    console.log(lineItems)

    stripeLoadedPromise.then((stripe) => {
      stripe
        .redirectToCheckout({
          lineItems: lineItems,
          mode: "payment",
          successUrl: "http://localhost:3000/",
          cancelUrl: "http://localhost:3000/",
          customerEmail: user.email ? user.email : "",
        })
        .then((response) => {
          // this will only log if the redirect did not work
          console.log(response.error);
        })
        .catch((error) => {
          // wrong API key? you will see the error message here
          console.log(error);
        });
    });
  }

  return (
    <div className="cart container">
      <h2>Shopping Cart</h2>
      {cart.map((product) => (
        <div key={product._id}>
          <p>{product.name}</p>
          <p>Price: ${product.price}</p>
          <p>
            Quantity:{""}
            <span>
              <button onClick={() => onQuantityChange(product._id, product.quantity - 1)}>-</button>
              <input type="number" value={product.quantity} onChange={(e) => onQuantityChange(product._id, parseInt(e.target.value, 10))} min="0" />
              <button onClick={() => onQuantityChange(product._id, product.quantity + 1)}>+</button>
            </span>
          </p>
          <p>Total: ${product.price * product.quantity}</p>
          <button onClick={() => onProductDelete(product._id, product.quantity)}>Remove</button>
        </div>
      ))}
      <p className="mb-2">Subtotal: ${calculateTotalPrice()}</p>

      {user === null ? (
        <div>
          <h3>No User here</h3>
        </div>
      ) : (
       <UserCheckout handleCheckout={handleCheckout} user={user} />
      )}
    </div>
  );
}
