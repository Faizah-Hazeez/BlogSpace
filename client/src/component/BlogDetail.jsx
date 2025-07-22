import { Link, useParams } from "react-router-dom";
import { SampleBlog, SampleComments } from "../data/blogs";
import Button from "../ui/Button";
import { MoveLeft, CircleUserRound } from "lucide-react";
import { useEffect, useState } from "react";
import moment from "moment";
import { useAppContext } from "@/context/AppContex";
import toast from "react-hot-toast";

function BlogDetail() {
  const { id } = useParams();
  const { axios } = useAppContext();
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);

  const fetchBlogDetails = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post(`/api/blog/comments`, { blogId: id });
      if (data.success) {
        setComments(data.comments || []);
      } else {
        toast.error(data.message);
        console.log(data.message);
        setComments([]);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setComments([]);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!name || !content) {
      toast.error("Name and comment are required");
      return;
    }
    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blog: id,
        name,
        content,
      });
      if (data.success) {
        toast.success(data.message);
        setName("");
        setContent("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
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
      {/* <div className="flex justify-between mt-2">
        <div>
          <p className="font-mono font-bold">{data.author}</p>
          <p className="font-semibold">{data.date}</p>
        </div>
        <div>
          <p className="text-blue-500">{data.readTime}</p>
        </div>
      </div> */}

      {/* comment */}
      <div className="my-6">
        <h2 className="font-semibold mb-1">Comments({comments.length})</h2>
        {comments.length > 0 ? (
          <div className="flex flex-col gap-4">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="relative bg-slate-50 border border-slate-100  rounded text-gray-600 p-2 space-y-1"
              >
                <div className="flex gap-1 items-center">
                  <CircleUserRound size={20} />
                  <p className="font-medium">{comment.name}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm max-w-md">{comment.content}</p>
                  {/* <p className="flex item-center gap-2 text-xs text-gray-500">
                    {moment(comment.created).fromNow()}
                  </p> */}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded outline-none"
            required
          />
          <textarea
            name="content"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
