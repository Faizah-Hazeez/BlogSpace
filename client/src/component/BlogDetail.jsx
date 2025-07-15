import { Link, useParams } from "react-router-dom";
import { SampleBlog, SampleComments } from "../data/blogs";
import Button from "../ui/Button";
import { MoveLeft, CircleUserRound } from "lucide-react";
import { useEffect, useState } from "react";
import moment from "moment";

function BlogDetail() {
  const [data, setData] = useState(null);
  const [comment, setComment] = useState([]);
  const { id } = useParams();

  const fetchBlogDetails = async () => {
    const blog = SampleBlog.find((blog) => blog.id === parseInt(id));
    setData(blog);
  };

  const fetchComments = async () => {
    const comments = SampleComments.filter(
      (comment) => comment.blog === parseInt(id) && comment.isApproved
    );
    setComment(comments);
  };

  const addComment = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    fetchBlogDetails();
    fetchComments();
  }, [id]);

  if (!data) {
    return (
      <div className="lg:px-20 px-5 py-5 font-default-family">
        <h2 className="text-2xl font-bold">Blog Not Found</h2>
        <Link to="/">
          <Button>
            <MoveLeft />
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <section className="lg:px-20 px-5 lg:py-10 py-5 font-default-family">
      <Link to="/">
        <Button>
          <MoveLeft />
        </Button>
      </Link>

      <img src={data.image} className="rounded-xl mb-6" />
      <Button className="border-blue-500 border px-4 font-semibold py-1 rounded-full mb-2">
        {data.category}
      </Button>
      <h1 className="font-bold text-blue-400 lg:text-3xl text-xl">
        {data.title}
      </h1>
      <p className="lg:mt-4 mt-2 lg:text-xl leading-8">{data.content}</p>
      <div className="flex justify-between mt-2">
        <div>
          <p className="font-mono font-bold">{data.author}</p>
          <p className="font-semibold">{data.date}</p>
        </div>
        <div>
          <p className="text-blue-500">{data.readTime}</p>
        </div>
      </div>

      {/* comment */}
      <div className="my-6">
        <h2 className="font-semibold mb-1">Comments({comment.length})</h2>
        {comment.length > 0 ? (
          <div className="flex flex-col gap-4">
            {comment.map((comment) => (
              <div
                key={comment.id}
                className="relative bg-slate-50 border border-slate-100  rounded text-gray-600 p-2 space-y-1"
              >
                <div className="flex gap-1 items-center">
                  <CircleUserRound size={20} />
                  <p className="font-medium">{comment.name}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm max-w-md">{comment.content}</p>
                  <p className="flex item-center gap-2 text-xs text-gray-500">
                    {moment(comment.created).fromNow()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No approved comments yet.</p>
        )}
      </div>

      {/* Add Comment */}
      <div className=" mx-auto">
        <p className="font-semibold">Add your comment</p>
        <form onSubmit={addComment}>
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="w-full p-2 border border-gray-200 rounded outline-none"
            required
          />
          <textarea
            name="comment"
            id="comment"
            placeholder="Comment....."
            className="w-full p-2 border border-gray-200 rounded outline-none"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 rounded-sm  px-4 py-1 text-lg"
          >
            Comment
          </button>
        </form>
      </div>
    </section>
  );
}

export default BlogDetail;
