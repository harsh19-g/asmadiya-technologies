import "../App.css";
import { useState } from "react";
import { LeftContainer } from "../container/LeftContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { confirmPasswordReset } from "firebase/auth";

export const ResetPassword = () => {
  const [user, setUser] = useState({
    newpassword: "",
    confirmPassword: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  //---------------------Function to get the query params from the URL------------------------
  const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };

  //---------------------Get the oobCode from the URL (used to verify the password reset request)--------------------------
  const oobCode = getQueryParams(location.search).get("oobCode");
  console.log(oobCode);

  //----------------------------------------Destructuring the user--------------------------------
  const { newpassword, confirmPassword } = user;

  //--------------------------------------dynamic form input------------------------------------------
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // -----------------------------------reset Function form-----------------------------------------
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newpassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      //--------------- Use confirmPasswordReset to update the password with the oobCode--------------
      await confirmPasswordReset(auth, oobCode, newpassword);
      toast.success("Password has been reset successfully!", {
        position: "top-center",
      });
      setTimeout(() => {
        navigate("/signin"); 
      });
    } catch (error) {
      console.error("Error resetting password:", error.message);
      toast.error(error.message);
    }
    setUser({
      newpassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="left-container col-6 d-flex align-items-center justify-content-center">
          <LeftContainer />
        </div>
        <div className="right-container col-6 d-flex align-items-center justify-content-center border">
          <div className="form-card p-5">
            <h2 className="mb-4 text-success">Reset Password</h2>
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <label htmlFor="newpassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  name="newpassword"
                  className="form-control form-control-lg"
                  value={newpassword}
                  onChange={handleChangeInput}
                />
              </div>
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
                />
              </div>
              <button
                type="submit"
                className="form-button btn btn-lg w-100 mt-4"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
