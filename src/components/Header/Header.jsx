import React from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header flex justify-between  items-center sticky top">
      <img src={logo} alt="logo" />
      <nav className="flex gap-5 text-white ">
        <Link to="/">Shop</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/login">Login</Link>
      </nav>
    </div>
  );
};

export default Header;
