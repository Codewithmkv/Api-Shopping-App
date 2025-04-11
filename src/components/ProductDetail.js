import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { productId } = useParams();  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.in/api/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'SUCCESS') {
          setProduct(data.product);  
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;  
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;  
  }

  return (
    <div className="product-details">
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} className="product-image" />
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Model:</strong> {product.model}</p>
      <p><strong>Color:</strong> {product.color}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Discount:</strong> {product.discount}%</p>
    </div>
  );
}

export default ProductDetails;
