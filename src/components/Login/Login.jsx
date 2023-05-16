import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState('');
  const [show, setShow] = useState(false);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const from = location.state?.from?.pathname || '/';
  const handleLogin = (event) => {
    event.preventDefault();
    setSuccess('');
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
      .then((result) => {
        const logged = result.user;
        console.log(logged);
        setSuccess('Login successful');
        setUser(logged);
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error(err);
        setSuccess('failed');
      });
  };
  return (
    <div>
      <form onSubmit={handleLogin} className="hero min-h-screen bg-base-200 ">
        <div className="hero-content ">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <h3 className="text-center text-4xl">Login</h3>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
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
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={show ? 'text' : 'password'}
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                />
                <p onClick={() => setShow(!show)}>
                  <small>
                    {show ? (
                      <span>Hide password</span>
                    ) : (
                      <span>Show password</span>
                    )}
                  </small>
                </p>
              </div>
              {user && <span>{success}</span>}
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Login"
                  className="btn bg-orange-100 text-black hover:bg-white"
                />
                <p className="mt-2">
                  New to Ema-john?
                  <Link to="/signup">
                    <button className="text-orange-200">
                      Create New Account
                    </button>
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

export default Login;
