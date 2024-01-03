import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../useFetch';

export default function Product(props) {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const url = process.env.REACT_APP_URL;
  const { get, loading } = useFetch(url);
  const [product, setProduct] = useState({});



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
}