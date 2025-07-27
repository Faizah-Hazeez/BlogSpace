import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "@/context/AppContex";
import toast from "react-hot-toast";

function AddBlog() {
  const { axios, token } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("fashion");
  const [image, setImage] = useState(null);
  const [isPublished, setIsPublish] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);

      if (!token || token === "undefined") {
        toast.error("You must be logged in to create a blog post.");
        console.log("No valid token available:", token);

        return;
      }

      if (!image) {
        toast.error("Please select an image to upload.");
        return;
      }

      const description = quillRef.current
        ? quillRef.current.root.innerHTML
        : "<p>No content</p>";
      console.log("Submitting blog:", {
        title,
        category,
        excerpt,
        description,
        isPublished,
        image,
      });
      console.log("Current token:", token);
      console.log("Request headers:", axios.defaults.header);

      const blog = {
        title,
        category,
        excerpt,
        description,
        isPublished,
      };
      console.log(blog);
      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message);
        // Reset form
        setImage(null);
        setTitle("");
        setCategory("fashion");
        setExcerpt("");
        setIsPublish(false);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
        console.log("Server error:", data.message);
      }
    } catch (error) {
      console.log("Error submotting blog:", error.message);
      if (error.response) {
        // Server responded with error status
        toast.error(error.response.data?.message || "Server error occurred");
        console.log("Server response:", error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        toast.error("Network error - please check your connection");
        console.log("Network error:", error.request);
      } else {
        // Something else happened
        toast.error("An unexpected error occurred");
        console.log("Unexpected error:", error.message);
      }
    } finally {
      setIsAdding(false);
    }
  };

  const generateContent = async (e) => {
    e.preventDefault();
  };

  // quill editor
  useEffect(() => {
    // initiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  // Debug token changes
  useEffect(() => {
    console.log("AddBlog - Token updated:", token);
  }, [token]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 p-4 space-y-6 overflow-auto w-[900px]" // Fixed 'overflow-autow' typo
    >
      <h2 className="text-2xl font-bold">Create New Blog Post</h2>

      <p>Upload Image</p>
      <div className="bg-gray-50 w-50 h-50 rounded">
        <label htmlFor="image">
          <img
            src={!image ? "/upload.png" : URL.createObjectURL(image)}
            alt=""
            className="w-full h-full rounded object-cover"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </label>
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-xl font-semibold">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          className="w-full border rounded-md p-2"
          placeholder="Enter your blog title..."
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-xl font-semibold">Category</label>
        <select
          id="category"
          className="w-full border rounded-md p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="fashion">Fashion</option>
          <option value="beauty">Beauty</option>
          <option value="technology">Technology</option>
        </select>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-xl font-semibold">Excerpt</label>
        <textarea
          id="excerpt"
          className="w-full border rounded-md p-2"
          rows="4"
          placeholder="Write a brief description of your blog post..."
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
      </div>

      <div className="flex flex-col space-y-2 relative h-74">
        <label className="text-xl font-semibold">Content</label>
        <div ref={editorRef} className="border rounded-md min-h-[200px]"></div>
        <Button
          type="button"
          onClick={generateContent}
          className="absolute bottom-1 right-2 ml-2 text-white px-4 py-1.5 rounded hover:underline cursor-pointer bg-blue-400"
        >
          Generate with AI
        </Button>
      </div>
      <div className="flex space-x-1 items-center">
        <input
          type="checkbox"
          id="publish"
          checked={isPublished} // Use checked for checkbox
          onChange={(e) => setIsPublish(e.target.checked)}
        />
        <p>Publish</p>
      </div>

      <Button disabled={isAdding} type="submit">
        {isAdding ? "Publishing..." : "Publish Blog"}
      </Button>
    </form>
  );
}

export default AddBlog;
