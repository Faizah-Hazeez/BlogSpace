import { Button } from "@/components/ui/button";
import Dashboard from "./Dashboard";
import { DataTable } from "@/components/ui/dataTable";
import { SampleComments } from "@/data/blogs";
import { useEffect, useState } from "react";
import CommentTableItem from "./CommentTableItem";

function Comments() {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");

  const fetchComments = async () => {
    setComments(SampleComments);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex-1 font-default-family">
      <div className="flex justify-between items-center max-w-3xl">
        <h1>Comments</h1>
        <div className="flex gap-4">
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
      <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
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
            {comments
              .filter((comment) => {
                if (filter === "Approved") return comment.isApproved === true;
                return comment.isApproved === false;
              })
              .map((comment, index) => (
                <CommentTableItem
                  key={comment.id}
                  comment={comment}
                  index={index + 1}
                  fetchComment={fetchComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Comments;
