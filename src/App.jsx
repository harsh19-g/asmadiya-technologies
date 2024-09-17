import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ResetPassword } from "./Pages/Reset-Password";
import { SignIn } from "./Pages/SignIn";
import { SignUp } from "./Pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProfile } from "./Pages/UserProfile";
import { ForgetPassword } from "./Pages/ForgetPassword";

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/profile" element={<UserProfile/>}/>
      <Route path="/forgetpassword" element={<ForgetPassword/>}/>
      <Route path="/resetpassword" element={<ResetPassword/>}/>
    </Routes>
    <ToastContainer/>
    </BrowserRouter>
    </>
  );
};
export default App;