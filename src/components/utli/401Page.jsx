import React from "react";
import { useNavigate } from "react-router-dom";

function UnauthorizedPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <div className="flex items-center justify-center gap-3">
          <h1 className="header">Unauthorized</h1>
          <p>You do not have permission to access this page</p>
        </div>

        <div className="">
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white py-2 px-5 rounded-lg mt-3"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
