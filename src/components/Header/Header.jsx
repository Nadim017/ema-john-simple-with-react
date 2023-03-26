import React from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';

const Header = () => {
  return (
    <div className="header flex justify-between  items-center">
      <img src={logo} alt="logo" />
      <nav className="flex gap-5 text-white ">
        <a href="/order">Order</a>
        <a href="/order_review">Order Review</a>
        <a href="/management_inventory">Manage Inventory</a>
        <a href="/login">Login</a>
      </nav>
    </div>
  );
};

export default Header;
