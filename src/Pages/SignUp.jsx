import "../App.css";
import { useState } from "react";
import { AuthButton } from "../container/AuthButton";
import { LeftContainer } from "../container/LeftContainer";
import { NavLink } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

export const SignUp = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  //--------------------Destructuring the user-------------------------
  const { firstname, lastname, email, password, confirmPassword } = user;

  //------------------dynamic Register Form Input function---------------------------
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  //--------------------show password function----------------------
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // ------------------signUp Function form-------------------------
  const handleRegister = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Registering user...");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-right",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const currentUserDetail = auth.currentUser;
      // console.log(currentUserDetail);
      if (currentUserDetail) {
        await setDoc(doc(db, "users", currentUserDetail.uid), {
          firstname,
          lastname,
          email,
        });
      }
      // console.log("User Registered Succesfully");

      toast.update(loadingToastId, {
        render: "User Registered Successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
        position: "top-right",
      });
    } catch (error) {
      // console.error(error.message);

      toast.update(loadingToastId, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
        position: "top-right",
      });
    }
    // console.log(user);
    setUser({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        {/* --------Left-side-------------- */}
        <div className="left-container col-6 d-flex align-items-center justify-content-center">
          <LeftContainer />
        </div>

        {/* -----------Right-side------------ */}
        <div className="right-container col-6 d-flex align-items-center justify-content-center border">
          <div className="form-card p-5">
            <h2 className="mb-4 text-success">Register</h2>
            <p className="mb-4 fs-5">
              Are have an account?
              <span className="mx-3">
                <NavLink to="/signin" className="sign-in">
                  Signin
                </NavLink>
              </span>
            </p>

            <form onSubmit={handleRegister}>
              {/*------------- username---------- */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstname" className="form-label">
                    Firstname
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    className="form-control form-control-lg"
                    value={firstname}
                    onChange={handleChangeInput}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastname" className="form-label">
                    Lastname
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    className="form-control form-control-lg"
                    value={lastname}
                    onChange={handleChangeInput}
                    required
                  />
                </div>
              </div>

              {/*--------------------- email----------- */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email ID
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={handleChangeInput}
                  required
                />
              </div>
              {/* --------------password--------------- */}
              <div className="mb-3">
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
                    required
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
              {/* ------------------Confirm password------------- */}
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control form-control-lg"
                  value={confirmPassword}
                  onChange={handleChangeInput}
                  required
                />
              </div>
              {/* ----------button--------- */}
              <button
                type="submit"
                className="form-button btn btn-lg w-100 mt-4"
              >
                Sign Up
              </button>

              {/* ---------Sign Up with Google and Github---------- */}
              <AuthButton />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
