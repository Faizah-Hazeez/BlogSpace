import Button from "../ui/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "@/ui/Logo";
import { useAppContext } from "@/context/AppContex";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, token } = useAppContext();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <header className="flex justify-between lg:px-20 px-5 py-4 border-b-1 border-b-blue-200 w-full ">
      <Logo />
      <nav className="flex gap-4 font-serif ">
        <div className="flex gap-2">
          {token ? (
            isAdminRoute ? (
              <Button
                onClick={handleLogout}
                className="bg-blue-300 px-6 rounded-full  text-white py-1 text-lg hover:bg-blue-400"
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/admin")}
                className="bg-blue-300 px-6 rounded-full text-white py-1 text-lg hover:bg-blue-400"
              >
                Dashboard
              </Button>
            )
          ) : (
            <Button
              onClick={() => navigate("/admin")}
              className="bg-blue-300 px-6 rounded-full  text-white py-1 text-lg hover:bg-blue-400"
            >
              Login
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
