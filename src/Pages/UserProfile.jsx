import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";

export const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async (user) => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        // console.log(docSnap.data());
      }
    } else {
      console.log("User not logged in");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      fetchUserData(user);
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);


  //------------------------------------------Log Out Button Function---------------------------------
  const handleLogOut = async () => {
    try {
      await auth.signOut();
      navigate("/signin");
      console.log("user Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div>
      {/* --------------------------------------NavBar------------------------------------------------- */}
      <nav className="navbar bg-body-secondary">
        <div className="container-fluid d-flex justify-content-between align-items-center indent">
          <a className="navbar-brand d-flex align-items-center" href="/profile">
            <img
              src="/images/asmadiya-logo.svg"
              alt="Logo"
              className="d-inline-block align-text-top"
            />
          </a>
          <button className="btn btn-primary btn-lg" onClick={handleLogOut}>
            Log out
          </button>
        </div>
      </nav>

      {/*---------------------------------------Profile Card------------------------------------------------- */}
      <div className="mt-5">
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <div
            className="card p-5 shadow-lg rounded-3 border-0"
            style={{
              maxWidth: "450px",
              backgroundColor: "#ffffff",
              borderRadius: "15px",
            }}
          >
            <div>
              {userDetails ? (
                <div className="card-body">
                  <h1 className="card-title text-center mb-4 text-primary">
                    Welcome! {userDetails.firstname}
                  </h1>
                  <div className="card p-3 shadow-sm bg-light">
                    <p className="card-text mb-2">
                      <strong>UserName:</strong> {userDetails.firstname}{" "}
                      {userDetails.lastname}
                    </p>
                    <p className="card-text">
                      <strong>Email:</strong> {userDetails.email}
                    </p>
                  </div>
                  <div className="mt-4 text-center">
                    <NavLink to="/forgetpassword">
                      <button className="btn btn-primary btn-lg px-4">
                        Change Password
                      </button>
                    </NavLink>
                  </div>
                </div>
              ) : (
                <p className="text-center">Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
