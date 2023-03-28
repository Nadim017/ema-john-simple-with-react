import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch('products.json')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];
    // step No. 1 : Get id
    for (const id in storedCart) {
      // step No. 2 : Get the product using id
      const addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        // step 3 : Get quantity of the product
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        // step 4 : add the added product to the saved cart
        savedCart.push(addedProduct);
      }

      // step 5 : set the cart
      setCart(savedCart);
      console.log(addedProduct);
    }
  }, [products]);
  const handleToCart = (product) => {
    // const newCart = [...cart, product];
    let newCart = [];
    const exists = cart.find((pd) => pd.id === product.id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd.id !== product.id);
      newCart = [...remaining, exists];
    }
    setCart(newCart);
    addToDb(product.id);
  };

  return (
    <div className="shop_container mt-24">
      <div className="products_container md:grid grid-cols-3 gap-5 px-12">
        {products.map((product) => (
          <Product
            product={product}
            handleToCart={handleToCart}
            key={product.id}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
