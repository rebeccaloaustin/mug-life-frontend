import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct({user}) {
  const { id } = useParams();
  const url = process.env.REACT_APP_URL;
  const navigate = useNavigate(); 
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    price_id:"",
    image:""
  });

  useEffect(() => {
    if (user === null){
      navigate("/")
     }else if(user.role ===0){
      navigate("/")
     }else{
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/products/${id}`);
        const data = await response.json();
        if (data) {
          setProduct(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();}
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        console.log("Product updated successfully");
        navigate("/shop/manage");
      } else {
        console.error("Error updating product:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="newproduct container">
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="productName"
            name="name"
            placeholder="Enter product name"
            value={product.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productDescription" className="form-label">
            Product Description
          </label>
          <textarea
            className="form-control"
            id="productDescription"
            name="description"
            placeholder="Enter product description"
            value={product.description}
            onChange={handleInputChange}
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
            name="price"
            placeholder="Enter product price"
            value={product.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">
            Product Price Id
          </label>
          <input
            type="text"
            className="form-control"
            id="productPrice"
            name="price_id"
            placeholder="Enter product price"
            value={product.price_id}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productImage" className="form-label">
            URL for your image:
          </label>
          <input
            type="text"
            className="form-control"
            id="productImage"
            name="image"
            placeholder="Enter product image"
            value={product.image}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
