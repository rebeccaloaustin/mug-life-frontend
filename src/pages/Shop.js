import React from "react";
import { Link } from "react-router-dom";
import "../Shop.scss";
import productData from "../products.json";

export default function Shop() {
  return (
    <div className="shoppage container">
      {productData.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {productData.map((product, index) => (
            <div className="col" key={index}>
              <Link to={`/product/${product.name}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="card">
                  <img src={product.image} className="card-img-top" alt={product.name} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No products to show</p>
      )}
    </div>
  );
}

