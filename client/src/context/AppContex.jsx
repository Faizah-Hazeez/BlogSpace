import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // const navigate = useNavigate();

  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    console.log("Initial token from localStorage:", storedToken);
    return storedToken;
  });
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const verifyToken = async (tokenToVerify) => {
    if (
      !tokenToVerify ||
      tokenToVerify === "undefined" ||
      tokenToVerify === "null"
    ) {
      console.log("No valid token to verify");
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return false;
    }
    try {
      const tempHeaders = { ...axios.defaults.headers.common };
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokenToVerify}`;
      console.log("Verifying token with backend...");
      const response = await axios.get("api/admin/verify");

      if (response.data.success) {
        console.log("Token verified successfully");
        setIsAuthenticated(true);
        setUser(response.data.user);
        setIsLoading(false);
        return true;
      } else {
        console.log("Token verification failed");
        throw new Error("Token verification failed");
      }
    } catch (error) {
      console.log(
        "Token verification error:",
        error.response?.data?.message || error.message
      );

      axios.defaults.headers.common = tempHeaders;

      // Clear invalid token
      localStorage.removeItem("token");
      setToken(null);
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);

      return false;
    }
  };

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      data.success ? setBlogs(data.blogs) : toast.error("nothing to show");
    } catch (error) {
      toast.error("Error fetching blogs");
      console.log("Fetch blogs error:", error);
    }
  };

  // Set up axios header whenever token changes
  useEffect(() => {
    console.log("Token changed:", token);
    if (token && token !== "undefined" && token !== "null") {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("Authorization header set:", `Bearer ${token}`);
      verifyToken(token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      console.log("Authorization header removed");
    }
  }, [token]);

  // fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // custom setToken function that also updates localStorage
  const updateToken = (newToken) => {
    console.log("Updating token:", newToken);
    if (newToken && newToken !== "undefined" && newToken !== "null") {
      localStorage.setItem("token", newToken);
      setToken(newToken);
      console.log("Token saved to localStorage:", newToken);
    } else {
      localStorage.removeItem("token");
      setToken(null);
      console.log("Token removed from localStorage");
    }
  };

  // Logout function
  const logout = () => {
    console.log("Logging out user");
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    toast.success("Logged out successfully");
  };

  const value = {
    axios,
    token,
    setToken: updateToken,
    blogs,
    setBlogs,
    input,
    setInput,
    isAuthenticated,
    isLoading,
    user,
    logout,
    verifyToken,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
