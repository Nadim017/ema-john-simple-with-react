import React, { useContext, useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import Login from './../Login/Login';
import { AuthContext } from '../Provider/AuthProvider';

const SignUp = () => {
  const [error, setError] = useState('');
  const { createUser } = useContext(AuthContext);
  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm_password = form.confirm_password.value;
    setError('');
    console.log(email, password, confirm_password);
    if (password !== confirm_password) {
      setError('Password did not match');
      return;
    } else if (password.length < 6) {
      setError('Password must be at least 6 characters or longer');
      return;
    }
    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
      })
      .catch((err) => {
        console.error(err);
        setError('Already existed');
      });
  };
  return (
    <div>
      <form onSubmit={handleSignUp} className="hero min-h-screen bg-base-200 ">
        <div className="hero-content ">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <h3 className="text-center text-4xl">Sign Up</h3>
                <label className="label">
                  <span className="label-text">Email:</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password:</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password:</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="confirm_password"
                />
              </div>
              <p className="text-red-500">{error}</p>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Sign Up"
                  className="btn bg-orange-100 text-black hover:bg-white"
                />
                <p className="mt-2">
                  Already have an account?
                  <Link to="/login">
                    <button className="text-orange-200">Login</button>
                  </Link>
                </p>

                <p className="mt-20 text-center ">
                  <button className="btn bg-white hover:text-white text-black w-full">
                    Continue with Google
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
