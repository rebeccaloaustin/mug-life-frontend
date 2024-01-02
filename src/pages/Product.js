import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../useFetch';

export default function Product(props) {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const url = process.env.REACT_APP_URL;
  const { get, loading } = useFetch(url);
  const [product, setProduct] = useState({});
  const { cart, onProductAdd } = props;


  useEffect(() => {
    get(`/products/${id}`)
      .then((data) => {
        if (data) {
          setProduct(data);
        }
      })
      .catch((err) => console.error(err))

      ;
  }, []);


  const handleQuantityChange = (newQuantity) => {
    // Ensure newQuantity is a valid number and not NaN
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onProductAdd({...product, quantity} );
 
    setQuantity(1); // Reset quantity to 1 after adding to the cart
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <Link to="/shop">
        <i className="bi bi-arrow-left"> back to shop</i>
      </Link>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>

      <div>
        <label htmlFor="quantity">Quantity:</label>
        <span>
          <button onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}>-</button>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
          />
          <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
        </span>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}
