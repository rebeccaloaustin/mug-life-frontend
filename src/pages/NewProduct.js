import React, { useState } from "react";
import "../NewProduct.scss";

export default function NewProduct() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", productDescription);
      formData.append("price", productPrice);
      formData.append("image", productImage);

      const response = await fetch(`${process.env.REACT_APP_URL}/products`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Product added successfully");
      } else {
        console.error("Error adding product:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="newproduct container">
      <h1>Add a new product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="productName"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productDescription" className="form-label">
            Product Description
          </label>
          <textarea
            className="form-control"
            id="productDescription"
            placeholder="Enter product description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">
            Product Price
          </label>
          <input
            type="text"
            className="form-control"
            id="productPrice"
            placeholder="Enter product price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productImage" className="form-label">
            Choose an image for your product:
          </label>
          <input
            type="file"
            id="productImage"
            name="productImage"
            accept="image/png, image/jpeg"
            onChange={(e) => setProductImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
