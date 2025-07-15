import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import BlogDetail from "./component/BlogDetail";
import Navbar from "./component/Navbar";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Layout from "./pages/Dashboard/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddBlog from "./pages/Dashboard/AddBlog";
import BlogList from "./pages/Dashboard/BlogList";
import Comments from "./pages/Dashboard/Comments";
import "quill/dist/quill.snow.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <Router>
      <div className="overflow-hidden">
        <Navbar />
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="addblogs" element={<AddBlog />} />
            <Route path="bloglist" element={<BlogList />} />
            <Route path="comment" element={<Comments />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
