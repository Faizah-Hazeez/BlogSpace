import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContex";
import { Button } from "@/components/ui/button";

const Logout = () => {
  const { logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // navigate("/admin/logout", { replace: true });
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className={`text-red-600 hover:text-red-700 hover:bg-red-50 `}
    >
      Logout
    </Button>
  );
};

export default Logout;
