import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Cart.scss";
import { loadStripe } from "@stripe/stripe-js";

import UserCheckout from "../components/UserCheckout";

export default function Cart({
  cart,
  onProductDelete,
  onQuantityChange,
  user,
}) {
  const navigate = useNavigate();
  const paymentKey = process.env.REACT_APP_PK_KEY;
  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  useEffect(() => {
    console.log(user);
  }, []);
  const stripeLoadedPromise = loadStripe(paymentKey);

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
      <h2 className="display-5 mb-5 text-center">Shopping Cart</h2>
      {cart.map((product) => (
        <div key={product._id} className="row mb-4">
          <div className="cartHeader">
            <span>Product</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>
          <div className="col-md-4">
            <img
              src={product.image}
              className="card-img-top"
              id="productCartImage"
              alt={product.name}
            />
          </div>
          <div className="col-md-8 d-flex align-items-center">
            <p className="col-md-4" id="productCartName">
              {product.name}
            </p>
            <p className="col-md-4" id="productPrice">
              Price: ${product.price}
            </p>
            <div className="col-md-2">
              <p className="form-outline w-25" id="productCartQuantity">
                Quantity:{""}
                <span className="d-flex align-items-center">
                  <div
                    onClick={() =>
                      onQuantityChange(product._id, product.quantity - 1)
                    }
                  >
                  <i class="bi bi-dash-lg"></i>
                  </div>
                  <div>{product.quantity}</div>
                  <div
                    onClick={() =>
                      onQuantityChange(product._id, product.quantity + 1)
                    }
                  >
                   <i class="bi bi-plus-lg"></i>
                  </div>
                </span>
              </p>
            </div>
            <div onClick={() => onProductDelete(product._id, product.quantity)}>
              <i class="bi bi-trash3"></i>
            </div>
          </div>
          <p className="col-md-3 ml-auto">
            Total: ${product.price * product.quantity}
          </p>
        </div>
      ))}

      <p className="col-md-3 ml-auto">Subtotal: ${calculateTotalPrice()}</p>

      {user === null ? (
        <div className="display-5 mb-5 text-center">
          <h3>Please sign in to checkout</h3>
          <button
            type="submit"
            className="button"
            onClick={() => navigate("/login")}
          >
            Go to login
          </button>
        </div>
      ) : (
        <UserCheckout handleCheckout={handleCheckout} user={user} />
      )}
    </div>
  );
}
