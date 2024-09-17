import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Newpage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        {/* Left Section with Image */}
        <div className="col-md-5 text-center">
          <img
            src="path_to_your_image" // replace with the actual image path or URL
            alt="AI Model Illustration"
            className="img-fluid"
          />
          <h5 className="mt-3">Train And Analyze Models Performance For Your Next Project</h5>
        </div>

        {/* Right Section with Sign-up Form */}
        <div className="col-md-5">
          <div className="card p-4">
            <h3 className="text-center mb-3">Register</h3>
            <p className="text-center">
              Already have an account? <a href="/signin">Signin</a>
            </p>

            {/* Form Starts Here */}
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      placeholder="Firstname"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      placeholder="Lastname"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email ID
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email ID"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="password"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                />
              </div>

              <button type="submit" className="btn btn-success w-100 mt-4">
                Sign Up
              </button>

              {/* Sign-up with Google/GitHub */}
              <div className="d-flex justify-content-between mt-4">
                <button type="button" className="btn btn-outline-dark w-100 me-2">
                  Sign up with Google
                </button>
                <button type="button" className="btn btn-outline-dark w-100 ms-2">
                  Sign up with GitHub
                </button>
              </div>
            </form>
            {/* Form Ends Here */}
          </div>
        </div>
      </div>

      {/* Go Back Button */}
      <div className="text-center mt-4">
        <a href="/" className="btn btn-link">
          <i className="bi bi-arrow-left"></i> Go Back
        </a>
      </div>
    </div>
  );
};

export default SignUp;
