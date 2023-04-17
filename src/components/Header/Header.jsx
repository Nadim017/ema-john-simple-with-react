import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleSignOut = () => {
    logOut()
      .then((result) => {
        console.log(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="header flex justify-between  items-center sticky top">
      <img src={logo} alt="logo" />
      <nav className="flex gap-5 text-white ">
        <Link to="/">Shop</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        {user && (
          <span>
            Welcome,{user.displayName}
            <button onClick={handleSignOut} className="text-white ml-3">
              Log Out
            </button>
          </span>
        )}
      </nav>
    </div>
  );
};

export default Header;
