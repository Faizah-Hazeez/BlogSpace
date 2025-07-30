import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import { useAppContext } from "@/context/AppContex";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { format } from "date-fns";

function BlogTable() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { axios, isAuthenticated, isLoading, token } = useAppContext();

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      //Don't fetch if not authenticated
      if (!isAuthenticated || !token) {
        console.log("Not authenticated, skipping blog fetch");
        setLoading(false);
        return;
      }
      const { data } = await axios.get("/api/admin/blogs");
      console.log(data);
      if (data.success) {
        setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Fetch blogs error:", error);
      if (error.responses?.status === 401) {
        toast.error(` login again.`);
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (blogId) => {
    const confirmDelete = window.confirm(
      `Are you sure uou want to delete this blog?`
    );
    if (!confirmDelete) return;
    try {
      const { data } = await axios.post("/api/blog/delete", { id: blogId });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error;
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const togglePublish = async (blogId) => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        id: blogId,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Toggle publish error:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated && token) {
      fetchBlogs();
    } else if (!isLoading && !isAuthenticated) {
      setLoading(false);
      console.log("User not authenticated");
    }
  }, [isLoading, isAuthenticated, token]);

  if (isLoading) {
    return (
      <div className="relative max-w-3xl shadow rounded-lg bg-white mt-1.5 px-4 py-8">
        <div className="text-center text-gray-500">
          Verifying authentication...
        </div>
      </div>
    );
  }

  // Show message if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="relative max-w-3xl shadow rounded-lg bg-white mt-1.5 px-4 py-8">
        <div className="text-center text-gray-500">
          Please login to access this page.
        </div>
      </div>
    );
  }

  // Show loading while fetching blogs
  if (loading) {
    return (
      <div className="relative max-w-3xl shadow rounded-lg bg-white mt-1.5 px-4 py-8">
        <div className="text-center text-gray-500">Loading blogs...</div>
      </div>
    );
  }

  return (
    <div className="relative max-w-3xl over-x-auto shadow rounded-lg scrollbar-hide bg-white mt-1.5 px-4 py-2">
      <Table className="w-full text-sm text-gray-500">
        <TableHeader className="lg:text-xs text-sm uppercase text-left font-bold">
          <TableRow>
            <TableHead className="w-[50px] font-bold text-gray-700 max-sm:hidden">
              #
            </TableHead>
            <TableHead className="w-[300px] font-bold text-gray-700">
              Title
            </TableHead>
            <TableHead className="w-[150px] font-bold text-gray-700 max-sm:hidden">
              Date
            </TableHead>
            <TableHead className="w-[150px] font-bold text-gray-700 ">
              Status
            </TableHead>
            <TableHead className="w-[150px] font-bold text-gray-700">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                No blogs found
              </TableCell>
            </TableRow>
          ) : (
            blogs.map((blog, index) => (
              <TableRow key={index}>
                <TableCell className="max-sm:hidden">{index + 1}</TableCell>
                <TableCell className="text-sm">{blog.title}</TableCell>
                <TableCell className="max-sm:hidden">
                  {format(new Date(blog.createdAt), "MMM dd, yyyy")}
                </TableCell>
                <TableCell
                  className={
                    blog.isPublished ? "text-blue-400" : "text-red-600"
                  }
                >
                  {blog.isPublished ? "Published" : "Draft"}
                </TableCell>
                <TableCell className="px-2 py-4 flex gap-1 items-center">
                  <button
                    onClick={() => togglePublish(blog._id)}
                    className="border px-2 py-0.5 mt-1 rounded cursor-pointer w-full"
                  >
                    {" "}
                    {!blog.isPublished ? "Published" : "Draft"}
                  </button>
                  <Trash
                    onClick={() => deleteBlog(blog._id)}
                    className="w-4 h-4 hover:scale-110 transition-all cursor-pointer"
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default BlogTable;
