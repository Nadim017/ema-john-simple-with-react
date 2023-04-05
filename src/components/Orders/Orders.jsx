import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Orders = () => {
  const savedCart = useLoaderData();
  const [cart, setCart] = useState(savedCart);
  console.log(savedCart);
  const handleRemoveFromCart = (id) => {
    const remaining = cart.filter((c) => c.id !== id);
    setCart(remaining);
    removeFromDb(id);
  };
  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
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
        <Cart handleClearCart={handleClearCart} cart={cart}>
          <Link to="/checkout">
            <p>
              <button className="review_order_btn">
                Proceed Checkout <FontAwesomeIcon icon={faCalendar} />
              </button>
            </p>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Orders;
