import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Cart.scss";
import { loadStripe } from "@stripe/stripe-js";
import Logcheck from "../components/LogCheck";

const stripeLoadedPromise = loadStripe(
  "pk_test_51OTFiGHbE7pOmJyp8PM15yVCsvzaKWycyOHzcjp82uUZJn5lKua73BNZI6s8njjApMU6529q1Pu6cpbOwcIWHTzs00LcPaLhLe"
);

export default function Cart({ cart, onProductDelete, onQuantityChange }) {
  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  useEffect(() => {
    console.log(cart);
  }, []);

  function handleCheckout(event) {
    event.preventDefault();

    const lineItems = cart.map((product) => {
      return { price: product.price_id, quantity: product.quantity };
    });

      stripeLoadedPromise.then((stripe) => {
        stripe
          .redirectToCheckout({
            lineItems: lineItems,
            mode: "payment",
            successUrl: "http://localhost:3000/",
            cancelUrl: "http://localhost:3000/",
            customerEmail: "gamyburgos@gmail.com",
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
              <button
                onClick={() =>
                  onQuantityChange(product._id, product.quantity - 1)
                }
              >
                -
              </button>
              <input
                type="number"
                value={product.quantity}
                onChange={(e) =>
                  onQuantityChange(product._id, parseInt(e.target.value, 10))
                }
                min="0"
              />
              <button
                onClick={() =>
                  onQuantityChange(product._id, product.quantity + 1)
                }
              >
                +
              </button>
            </span>
          </p>
          <p>Total: ${product.price * product.quantity}</p>
          <button
            onClick={() => onProductDelete(product._id, product.quantity)}
          >
            Remove
          </button>
        </div>
      ))}
      <p>Subtotal: ${calculateTotalPrice()}</p>

    </div>
  );
}
