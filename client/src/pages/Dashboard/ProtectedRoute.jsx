import { useAppContext } from "@/context/AppContex";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, token } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ProyectedRoute check:", { isAuthenticated, isLoading, token });
    if (!isLoading) {
      if (!isAuthenticated || !token) {
        console.log("User not authenticated, redirecion to login");
        navigate("/admin/login", { replace: true });
      }
    }
  }, [isAuthenticated, isLoading, token, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Verifying authentication...</div>
      </div>
    );
  }

  //   only renderr children if authenticated
  if (isAuthenticated && token) {
    return children;
  }
};

export default ProtectedRoute;
