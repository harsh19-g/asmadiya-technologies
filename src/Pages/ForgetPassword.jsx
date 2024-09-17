import "../App.css";
import { useState } from "react";
import { LeftContainer } from "../container/LeftContainer";
import { NavLink, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

export const ForgetPassword = () => {

const [email, setEmail] = useState("");
const navigate = useNavigate();
  
  

  // ------------------signUp Function form-------------------------
  const handleChangePassword = async(e)=>{
    e.preventDefault();
    try {  
      await sendPasswordResetEmail(auth,email);
      toast.info("Check Your Email");

      setTimeout(()=>{
        navigate("/signin");
      },3000);
    } catch (error){
      // alert(error.code);
      toast.error(error.code,{optional : "top-right"});
    }
    console.log(email);
    setEmail("");
    
  }
  return (
    <div className="container-fluid">
      <div className="row vh-100">

        {/* --------Left-side-------------- */}
        <div className="left-container col-6 d-flex align-items-center justify-content-center">
        <LeftContainer/>
        </div>

        {/* -----------Right-side------------ */}
        <div className="right-container col-6 d-flex align-items-center justify-content-center border">
          <div className="form-card p-5">
            <h2 className="mb-4 text-success">Change Password</h2>
            <form onSubmit={handleChangePassword}>
              {/* --------------Email--------------- */}
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
              </div>
              {/* ----------button--------- */}
              <button
                type="submit"
                className="form-button btn btn-lg w-100 mt-4"
              >Send Reset Email
                
              </button>
              <NavLink to="/signin">
              <button
                type="submit"
                className="form-button btn btn-lg w-100 mt-4"
              >Back to Login
                
              </button>
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
