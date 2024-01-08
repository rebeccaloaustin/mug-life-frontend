import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../NewProduct.scss";


export default function NewProduct(props) {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productPriceID, setProductPriceID] = useState("");
  const [productImage, setProductImage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const url = process.env.REACT_APP_URL;

  const {user} = props
    
  const showSuccess = () => (
    <div className="alert alert-success" style={{ display: successMessage? "" : "none" }}>
      {successMessage}
    </div>
  );

  const handleSubmit =(e) => {
    e.preventDefault();
    const fetchURL = `${url}/products`;
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ name: productName, image:productImage, description : productDescription, price_id: productPriceID, price: parseFloat(productPrice) }),
    };
    fetch(fetchURL, options)
    .then((response) => {
      return response.json()
    }).then(data=>{
      console.log(data)
      setSuccessMessage("Congratulations, new product!")
      // navigate('/shop');
    })
      .catch((error) => {
        console.error(error);
      });
  };
  

  return (
    <div className="newproduct container">
    {showSuccess()}
      <h1>Add a new product</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input type="text" className="form-control" id="productName" placeholder="Enter product name" value={productName} onChange={(e) => setProductName(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="productDescription" className="form-label">
            Product Description
          </label>
          <textarea className="form-control" id="productDescription" placeholder="Enter product description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)}></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">
            Product Price
          </label>
          <input type="text" className="form-control" id="productPrice" placeholder="Enter product price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="productPriceID" className="form-label">
            Product Price ID
          </label>
          <input type="text" className="form-control" id="productPriceID" placeholder="Enter product price id" value={productPriceID} onChange={(e) => setProductPriceID(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="productImage" className="form-label">
            Add an Image URL
          </label>
          <input type="text" className="form-control" id="productImage" name="productImage" placeholder="Enter Image URL"  value={productImage} onChange={(e) =>  setProductImage(e.target.value)} />
        </div>
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
}
