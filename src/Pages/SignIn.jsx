import "../App.css";
import { useState } from "react";
import { AuthButton } from "../container/AuthButton";
import { LeftContainer } from "../container/LeftContainer";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

export const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  //---------------------------Destructuring the user-----------------------------
  const { email, password } = user;

  //------------------dynamic Login Form Input function---------------------------
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  //------------------------show password function---------------------------------
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // ----------------------------remember fumction----------------------------------
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  // ----------------------------Login Function form--------------------------------
  const handleSignUp = async (e) => {
    e.preventDefault();

    const loadingToastId = toast.loading("Logging user...");

    const userdetail = auth.currentUser;
    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.update(loadingToastId, {
        render: "User Logged in Successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
        position: "top-right",
      });
      navigate("/profile");
    } catch (error) {
      // console.error(error.message);
      toast.update(loadingToastId, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
        position: "bottom-right",
      });
    }
    // console.log(user);
    if (rememberMe) {
      // console.log("remember me enabled");
      localStorage.setItem("rememberMe", JSON.stringify(user));
    } else {
      localStorage.removeItem("rememberMe");
    }

    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        {/* ------------------------------Left-side-------------------------------- */}
        <div className="left-container col-6 d-flex align-items-center justify-content-center">
          <LeftContainer />
        </div>

        {/* ------------------------------Right-side-------------------------------- */}
        <div className="right-container col-6 d-flex align-items-center justify-content-center border">
          <div className="form-card p-5">
            <h2 className="mb-4 text-success">Login</h2>
            <p className="mb-4 fs-5">
              Are you new user?
              <span className="mx-3">
                <NavLink to="/signup" className="sign-in">
                  Signup
                </NavLink>
              </span>
            </p>
            <form onSubmit={handleSignUp}>
              {/*--------------------------Email box------------------------------------------ */}
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Email ID
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={handleChangeInput}
                />
              </div>
              {/* ----------------------------Password Box------------------------------------ */}
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={handleChangeInput}
                  />
                  <button
                    type="button"
                    className="btn btn-light border"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              {/* ---------------------------remember me and forget password--------------------*/}
              <div className="mb-3 d-flex justify-content-between">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <NavLink to="/forgetpassword" className="text-decoration-none">
                  Forgot Password?
                </NavLink>
              </div>
              {/* ------------------------------------Login Button--------------------------------- */}
              <button
                type="submit"
                className="form-button btn btn-lg w-100 mt-3"
              >
                Sign In
              </button>

              {/* ----------------------------Sign Up with Google and Github---------------------- */}
              <AuthButton />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
