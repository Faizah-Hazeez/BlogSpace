import { CheckCheck, Trash2 } from "lucide-react";

function CommentTableItem({ comment, fetchComment }) {
  const { title, name, content, createdAt } = comment;
  return (
    <tr className="order-y border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog</b> : {title}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b> : {name}
        <br />
        <b className="font-medium text-gray-600">Comment</b> : {content}
      </td>
      <td className="px-6 py-4 max-sm:hidden">{createdAt}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {!comment.isApproved ? (
            <CheckCheck className="w-5 h-5" />
          ) : (
            <p className="text-xs border border-green-600 bg-green-300 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          <Trash2 className="w-5 h-5" />
        </div>
      </td>
    </tr>
  );
}

export default CommentTableItem;
