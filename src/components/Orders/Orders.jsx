import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import { removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
  const savedCart = useLoaderData();
  const [cart, setCart] = useState(savedCart);
  console.log(savedCart);
  const handleRemoveFromCart = (id) => {
    const remaining = cart.filter((c) => c.id !== id);
    setCart(remaining);
    removeFromDb(id);
  };

  return (
    <div className="flex justify-between mt-20">
      <div className="products_container ml-24 ">
        {cart.map((product) => (
          <ReviewItem
            handleRemoveFromCart={handleRemoveFromCart}
            product={product}
            key={product.id}
          ></ReviewItem>
        ))}
      </div>

      <div className="cart_container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Orders;
