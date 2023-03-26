import React from 'react';
import './Product.css';

const Product = (props) => {
  const { id, quantity, name, img, price, ratings, seller } = props.product;
  console.log(props.product);
  return (
    <div>
      <div className="card h-[508px] w-[300px]  glass">
        <figure>
          <img
            className="img_tag"
            src={img ? img : 'img not found'}
            alt="car!"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title mt-0">{name}</h2>
          <h3 className="mb-10">Price: ${price}</h3>
          <p>Manufacturer: {seller}</p>
          <p>Ratings : {ratings}</p>
        </div>
        <div className="w-full">
          <button className="btn_cart hover:bg-orange-400">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
