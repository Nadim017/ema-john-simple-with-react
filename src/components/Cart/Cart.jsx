import React from 'react';
import './Cart.css';

const Cart = ({ cart }) => {
  // cart.map((item) => {
  //   totalPrice = totalPrice + item.price;
  // });
  // // const cart=props.cart; // no 1 system
  //   const { cart } = props; // no 2 system
  let totalPrice = 0;
  let totalShipping = 0;
  let quantity = 0;
  for (const product of cart) {
    // if (product.quantity) {
    //   product.quantity = 1;
    // }

    // product.quantity = product.quantity || 1;
    totalPrice = totalPrice + product.price * product.quantity;
    totalShipping = totalShipping + product.shipping;
    quantity = quantity + product.quantity;
  }
  const tax = (totalPrice * 7) / 100;
  const grandtotalPrice = totalPrice + totalShipping + tax;

  return (
    <div className="cart">
      <h4 className="mb-5 font-semibold text-2xl">Order Summary :</h4>
      <p className="mb-2">Selected items : {quantity}</p>
      <p className="mb-2">totalPrice Price: ${totalPrice}</p>
      <p className="mb-2">Total Shipping Charge: ${totalShipping}</p>
      <p className="mb-2">Tax: ${tax.toFixed(2)}</p>
      <h4 className="mb-5 text-lg font-bold">
        Grand total :${grandtotalPrice.toFixed(2)}
      </h4>
    </div>
  );
};

export default Cart;
