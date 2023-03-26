import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('products.json')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="shop_container mt-24">
      <div className="products_container md:grid grid-cols-3 gap-5 px-12">
        {products.map((product) => (
          <Product product={product} key={product.id}></Product>
        ))}
      </div>
      <div className="cart-container">
        <h4>Order Summary :</h4>
      </div>
    </div>
  );
};

export default Shop;