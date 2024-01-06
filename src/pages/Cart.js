import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import "../Cart.scss";

export default function Cart({ cart, onProductDelete, onQuantityChange }) {
  const navigate = useNavigate();
  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };
  useEffect(()=>{
    console.log(cart)
  },[])
  const handleCheckout = () => {
    navigate('/checkout');
  };
  

  return (
    <div className='cart container'>
      <h2>Shopping Cart</h2>
      {cart.map((product) => (
        <div key={product._id}>
          <p>{product.name}</p>
          <p>Price: ${product.price}</p>
          <p>
            Quantity:{''}
            <span>
              <button onClick={() => onQuantityChange(product._id, product.quantity - 1)}>-</button>
              <input
                type="number"
                value={product.quantity}
                onChange={(e) => onQuantityChange(product._id, parseInt(e.target.value, 10))}
                min="0"
              />
              <button onClick={() => onQuantityChange(product._id, product.quantity + 1)}>+</button>
            </span>
          </p>
          <p>Total: ${product.price * product.quantity}</p>
          <button onClick={() => onProductDelete(product._id, product.quantity)}>Remove</button>
        </div>
      ))}
      <p>Subtotal: ${calculateTotalPrice()}</p>
      <button onClick={handleCheckout}>
        Checkout
      </button>
      <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  </form>
      
    </div>
  );
}

