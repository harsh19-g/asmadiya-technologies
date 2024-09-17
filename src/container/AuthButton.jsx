import "../App.css"
export const AuthButton = () => {
  return (
    <div className="d-flex justify-content-between  mt-4">
      <button
        type="button"
        className="auth-googit btn btn-lg  w-100 me-2 fw-semibold"
      >
        <img src="/images/google.png " className="me-4" alt="google.png" />
        Sign up with Google
      </button>
      <button
        type="button"
        className=" auth-googit btn btn-lg  w-100 ms-2 fw-semibold"
      >
        <img src="/images/github.png " className="me-4" alt="github.png" />
        Sign up with GitHub
      </button>
    </div>
  );
};
