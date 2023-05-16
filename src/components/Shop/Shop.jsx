import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { totalProducts } = useLoaderData();
  console.log(totalProducts);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // const pageNumbers = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   pageNumbers.push(i);
  // }
  const pageNumbers = [...Array(totalPages).keys()];

  /**
   * 1. Determine the total number of items
   * 2. ToDo : Decide the number of items per page
   * 3. calculate total number of pages
   * 4. determine the current data
   *
   */

  // useEffect(() => {
  //   fetch('http://localhost:5000/products')
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];
    // step No. 1 : Get id
    for (const id in storedCart) {
      // step No. 2 : Get the product using id
      const addedProduct = products.find((product) => product._id === id);
      if (addedProduct) {
        // step 3 : Get quantity of the product
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        // step 4 : add the added product to the saved cart
        savedCart.push(addedProduct);
      }

      // step 5 : set the cart
      setCart(savedCart);
    }
  }, [products]);
  const handleToCart = (product) => {
    // const newCart = [...cart, product];
    let newCart = [];
    const exists = cart.find((pd) => pd._id === product._id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd._id !== product._id);
      newCart = [...remaining, exists];
    }
    setCart(newCart);
    addToDb(product._id);
  };
  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };
  const options = [5, 10, 15, 20];
  const handleSelectChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };
  return (
    <>
      <div className="shop_container mt-24">
        <div className="products_container md:grid grid-cols-3 gap-3 px-10">
          {products.map((product) => (
            <Product
              product={product}
              handleToCart={handleToCart}
              key={product._id}
            ></Product>
          ))}
        </div>
        <div className="cart_container">
          <Cart handleClearCart={handleClearCart} cart={cart}>
            <Link to="/orders">
              <button className="review_order_btn">
                Review Order <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </Link>
          </Cart>
        </div>
      </div>
      {/**pagination */}

      <div className="pagination">
        <p>
          {' '}
          Current page{currentPage} and items per page:{itemsPerPage}
        </p>
        {pageNumbers.map((number) => (
          <button
            onClick={() => setCurrentPage(number)}
            key={number}
            className={currentPage === number ? 'selected' : ''}
          >
            {number}
          </button>
        ))}

        <select value={itemsPerPage} onChange={handleSelectChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Shop;
