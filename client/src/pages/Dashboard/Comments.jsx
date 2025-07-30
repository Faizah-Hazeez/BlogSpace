import { Button } from "@/components/ui/button";
import Dashboard from "./Dashboard";
import { DataTable } from "@/components/ui/dataTable";
import { SampleComments } from "@/data/blogs";
import { useEffect, useState } from "react";
import CommentTableItem from "./CommentTableItem";
import { useAppContext } from "@/context/AppContex";
import toast from "react-hot-toast";

function Comments() {
  const [comments, setComments] = useState([]);
  const { axios, isAuthenticated, isLoading, token } = useAppContext();
  const [filter, setFilter] = useState("Not Approved");
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      setLoading(true);
      if (!isAuthenticated || !token) {
        toast.error("User not authentictaed");
        return;
      }
      const { data } = await axios.get("/api/admin/comments");
      console.log("Comment data:", data);
      if (data.success) {
        setComments(Array.isArray(data.comments) ? data.comments : []);
      } else {
        toast.error(data.message || "Failed to fetch dashboard data");
      }
    } catch (error) {
      console.error("Fetch comments error:", error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch comments"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated && token) {
      fetchComments();
    } else if (!isLoading && !isAuthenticated) {
      setLoading(false);
      console.log("User not authenticated");
    }
  }, [isLoading, isAuthenticated, token]);

  // filter
  const filteredComments = comments.filter((comment) => {
    if (filter === "Approved") return comment.isApproved === true;
    return comment.isApproved === false;
  });

  return (
    <div className="flex-1 font-default-family m-4 lg:m-0">
      <div className="flex justify-between items-center max-w-3xl">
        <h1>Comments</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "Approved" ? "text-white bg-blue-400" : "text-gray-700"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("Not Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "Not Approved"
                ? "text-white bg-blue-400"
                : "text-gray-700"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>
      <div className="relative h-4/5 max-w-6xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hidden">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Blog Title & Comment
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredComments.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No {filter.toLowerCase()} comments found
                </td>
              </tr>
            ) : (
              filteredComments.map((comment, index) => (
                <CommentTableItem
                  key={comment._id || comment.id || index}
                  comment={comment}
                  index={index + 1}
                  fetchComment={fetchComments}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Comments;
