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
import { AppProvider, useAppContext } from "./context/AppContex";
import { Toaster } from "react-hot-toast";

const AppContent = () => {
  const { token } = useAppContext();
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/admin/*" element={token ? <Layout /> : <SignIn />}>
        <Route index element={<Dashboard />} />
        <Route path="addblogs" element={<AddBlog />} />
        <Route path="bloglist" element={<BlogList />} />
        <Route path="comment" element={<Comments />} />
      </Route>
    </Routes>
  );
};

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <AppProvider>
      <Toaster />
      <Router>
        <div className="overflow-hidden">
          <Navbar />
          <AppContent />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
