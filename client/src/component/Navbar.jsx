import { useState } from "react";
import Button from "../ui/Button";
import { Plus, CircleUserRound, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/ui/Logo";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = () => setIsOpen((open) => !open);
  return (
    <header className="flex justify-between lg:px-20 px-5 py-4 border-b-1 border-b-blue-200 w-full">
      <Logo />
      {/* desktop view */}
      <nav className="lg:flex gap-4 font-serif hidden">
        {isLoggedIn ? (
          <div className="flex gap-2">
            <Link to="/signin">
              <Button className="bg-blue-400 px-6 rounded-full  text-white py-1 text-lg hover:bg-blue-500">
                Login
              </Button>
            </Link>
            <Link to="signup">
              <Button className="border-blue-500 rounded-full border px-6 py-1 text-lg">
                Signup
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-2">
            <Button className="bg-blue-400 px-4 rounded-sm text-white py-1 text-lg hover:bg-blue-500 flex items-center gap-1">
              <Plus />
              Write
            </Button>

            <Button className="border-blue-500 rounded-sm border px-4 py-1 text-lg">
              Logout
            </Button>
          </div>
        )}
      </nav>
      {/* mobile view */}
      <nav className="visible lg:hidden relative">
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
      </nav>
    </header>
  );
}

export default Navbar;
