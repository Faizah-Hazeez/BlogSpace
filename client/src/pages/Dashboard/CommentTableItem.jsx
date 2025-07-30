import { CheckCheck, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useAppContext } from "@/context/AppContex";
import { useState } from "react";
import toast from "react-hot-toast";

function CommentTableItem({ comment, index, fetchComments }) {
  const blogTitle = comment.blog?.title || "Unknown Blog";
  const { name, content, createdAt, _id } = comment;
  const [loading, setLoading] = useState(true);
  const { axios, isAuthenticated, isLoading, token } = useAppContext();

  const approveComment = async () => {
    try {
      setLoading(true);
      if (!isAuthenticated || !token) {
        toast.error("User not authentictaed");
        return;
      }
      if (!confirm) return;
      const { data } = await axios.post("/api/admin/approve-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async () => {
    try {
      setLoading(true);
      if (!isAuthenticated || !token) {
        toast.error("User not authentictaed");
        return;
      }
      const confirm = window.confirm(
        `Are you sure you want to delete this comment`
      );
      if (!confirm) return;
      const { data } = await axios.post("/api/admin/delete-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="order-y border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog</b> : {blogTitle}
        <br />
        <b className="font-medium text-gray-600">Name</b> : {name}
        <br />
        <b className="font-medium text-gray-600">Comment</b> : {content}
      </td>
      <td className="px-6 py-4 max-sm:hidden">
        {format(new Date(createdAt), "MMM dd, yyyy")}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {!comment.isApproved ? (
            <button onClick={approveComment}>
              <CheckCheck className="w-5 h-5" />
            </button>
          ) : (
            <p className="text-xs text-white bg-blue-400 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          <button onClick={deleteComment}>
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default CommentTableItem;
