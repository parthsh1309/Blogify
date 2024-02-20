import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children, authentication = true }) {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // Check if authentication status has changed and redirect accordingly
    // If user is authenticated but authStatus is not updated, navigate to login page
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } 
    // If user is not authenticated but authStatus is not updated, navigate to home page
    else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoading(false);
  }, [navigate, authStatus, authentication]);

  return loading ? <div>Loading....</div> : <>{children}</>;
}

export default Protected;
