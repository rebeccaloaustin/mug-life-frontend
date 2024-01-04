import React, {useEffect} from 'react';
import "../Cart.scss";

export default function Cart({ cart, onProductDelete, onQuantityChange }) {
  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };
  
  useEffect(()=>{
    console.log(cart)
  },[])

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
    </div>
  );
}

