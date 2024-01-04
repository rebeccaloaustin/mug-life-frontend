import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../NewProduct.scss";

export default function NewProduct() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productPriceID, setProductPriceID] = useState("");
  const [productImage, setProductImage] = useState(null);
  const url = process.env.REACT_APP_URL;
  const handleSubmit =(e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("name", productName);
    // formData.append("description", productDescription);
    // formData.append("price", productPrice);
    // formData.append("image", productImage);

    const fetchURL = `${url}/products`;
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ image: productImage, name: productName, description: productDescription, price: parseFloat(productPrice), price_id: productPriceID }),
    };
    fetch(fetchURL, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="newproduct container">
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
            Choose an image for your product:
          </label>
          <input type="file" id="productImage" name="productImage" accept="image/png, image/jpeg" onChange={(e) => setProductImage(e.target.files[0])} />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
