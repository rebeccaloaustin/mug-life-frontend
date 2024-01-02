import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Shop.scss";
import useFetch from "../useFetch";
import Loader from "../Loader";

export default function Shop(props) {
  const { cart, onProductAdd, onProductDelete } = props;
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

  return (
    <div className="shoppage container">
      {loading && <Loader />}
      {!loading && products.length > 0 && (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((product) => (
            <div className="col" key={product._id}>
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="card">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
      {!loading && products.length === 0 && <p>No products found.</p>}
    </div>
  );
}
