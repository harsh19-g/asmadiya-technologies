/*import "../App.css";
import { useState } from "react";
import { LeftContainer } from "../container/LeftContainer";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";

export const ResetPassword = () => {
  const [user, setUser] = useState({
    newpassword: "",
    confirmPassword: "",
  });

  // Destructuring the user
  const { newpassword, confirmPassword } = user;

  //--------------------------------------dynamically changing input----------------------------
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // SignUp Function form
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        //------------------Re-authentication might be required before updating password-----------
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          prompt("Please enter your current password")
        );

        // --------------------------------Re-authenticate the user--------------------------------
        await reauthenticateWithCredential(currentUser, credential); 

        // ---------------------------------updating the password----------------------------------
        await updatePassword(currentUser, newpassword);
        console.log("Password updated successfully");
        toast.success("Password Updated Successfully", { position: "top-right" });
      } 
      
    } catch (error) {
      // console.error("Error updating password:", error.message);
      toast.error("Failed to update password: " + error.message, { position: "top-right" });
    }

    setUser({
      newpassword: "",
      confirmPassword: ""
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
                  Password
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
              <button type="submit" className="signup-button btn btn-lg w-100 mt-4">
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
*/