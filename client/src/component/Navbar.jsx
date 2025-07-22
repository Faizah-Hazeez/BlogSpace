import { useState } from "react";
import Button from "../ui/Button";
import { Plus, CircleUserRound, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/ui/Logo";
import { useAppContext } from "@/context/AppContex";

function Navbar() {
  const navigate = useNavigate();
  const { token } = useAppContext();
  return (
    <header className="flex justify-between lg:px-20 px-5 py-4 border-b-1 border-b-blue-200 w-full">
      <Logo />
      <nav className="flex gap-4 font-serif ">
        <div className="flex gap-2">
          <Button
            onClick={() => navigate("/admin")}
            className="bg-blue-400 px-6 rounded-full  text-white py-1 text-lg hover:bg-blue-500"
          >
            {token ? "Dashboard" : "Login"}
          </Button>
        </div>
      </nav>
      {/* mobile view */}
      {/* <nav className="visible lg:hidden relative">
        <Button onClick={handleNav}>{!isOpen ? <Menu /> : <X />}</Button>

        {isOpen && (
          <div className="fixed top-0 right-0 w-1/2 h-screen bg-white shadow-md z-50 p-6 transition-transform duration-300">
            <Button onClick={handleNav} className="flex justify-end">
              <X />
            </Button>
            {isLoggedIn ? (
              <ul className="text-center pt-10 space-y-4 text-lg font-default-family">
                <Link to="/signin">
                  <li>Login</li>
                </Link>
                <Link to="/signup">
                  <li>Sign Up</li>
                </Link>
              </ul>
            ) : (
              <div className="flex justify-center gap-3 mt-6">
                <Button className="bg-blue-400 px-4 rounded-sm text-white py-1 text-lg hover:bg-blue-500 flex items-center gap-1">
                  <Plus />
                  Write
                </Button>
                <CircleUserRound size={36} />
              </div>
            )}
          </div>
        )}
      </nav> */}
    </header>
  );
}

export default Navbar;
