import React from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';

const Orders = () => {
  const cart = useLoaderData();
  console.log(cart);

  return (
    <div className="flex justify-between mt-20">
      <div className="products_container ml-24 ">
        {cart.map((product) => (
          <ReviewItem product={product} key={product.id}></ReviewItem>
        ))}
      </div>

      <div className="cart_container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Orders;
