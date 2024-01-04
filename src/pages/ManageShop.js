import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Shop.scss";
import useFetch from "../useFetch";
import Loader from "../Loader";

export default function ManageShop() {
  const [products, setProducts] = useState([]);
  const url = process.env.REACT_APP_URL;
  const { get, loading } = useFetch(url);

  useEffect(() => {
    get("/products")
      .then((data) => {
        if (data) {
          console.log(data);
          setProducts(data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        console.log(products);
      });
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`${url}/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedProducts = products.filter(product => product._id !== productId);
        setProducts(updatedProducts);
      } else {
        console.error("Error deleting product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <div className="shoppage container">
      {loading && <Loader />}
      {!loading && products.length > 0 && (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((product) => (
            <div className="col" key={product._id}>
                <div className="card">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <Link to={`/product/edit/${product._id}`}>
                    <button className = "btn btn-primary"> Edit Product</button>
                    </Link>
                    <button className = "btn btn-danger" onClick={() => handleDeleteProduct(product._id)}> Delete Product</button>
                  </div>
                </div>
            </div>
          ))}
        </div>
      )}
      {!loading && products.length === 0 && <p>No products to edit.</p>}
    </div>
  );
}
