import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      data.success ? setBlogs(data.blogs) : toast.error("nothing to show");
    } catch (error) {
      toast.error(error, ":not fetching");
    }
  };

  useEffect(() => {
    fetchBlogs();
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("Token set in headers:", token); // Debug
    } else {
      delete axios.defaults.headers.common["Authorization"];
      console.log("No token, removed Authorization header");
    }
  }, [token]);

  const value = {
    axios,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
