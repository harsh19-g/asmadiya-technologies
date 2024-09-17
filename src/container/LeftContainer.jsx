export const LeftContainer = () => {
  return (
    <div className="col-md-9">
      <div className="navigate-back-icon d-flex align-items-center">
        <img src="/images/back.svg" alt="back-icon" />
        <span className="mx-3 fs-5 text-muted">Go Back</span>
      </div>
      <img
        src="/images/login-cover.svg" 
        alt="AI-Model "
        className="img w-100"
      />
      <p className="mt-4 fs-4 text-center fw-semibold text-muted">
        Train And Analyze Models Performance For Your Next Project
      </p>
      <div className="company-logo">
        <img src="/images/logo.png" alt="logo" />
      </div>
    </div>
  );
};
