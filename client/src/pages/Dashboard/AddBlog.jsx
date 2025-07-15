import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";

function AddBlog() {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const { register, formState, handleSubmit } = useForm();
  const [image, setImage] = useState(false);
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
    alert("Blog submitted! Check the console for details.");
  }

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
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 p-4 space-y-6 overflow-autow w-[900px]"
    >
      <h2 className="text-2xl font-bold">Create New Blog Post</h2>

      <p>Upload Image</p>
      <div className="bg-gray-50 w-50 h-50  rounded">
        <label htmlFor="image">
          <img
            src={!image ? `/upload.png` : URL.createObjectURL(image)}
            alt=""
            className="w-full h-full rounded"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            {...register("image", { required: "Image is required" })}
            hidden
            required
          />
        </label>
      </div>
      <div className="flex flex-col space-y-2 ">
        <label className="text-xl font-semibold">Title</label>
        <input
          type="text"
          id="title"
          className="w-[100%] border rounded-md p-2"
          placeholder="Enter your blog title..."
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-xl font-semibold">Category</label>
        <select
          id="category"
          className="w-full border rounded-md p-2"
          {...register("category", { required: "Category is required" })}
        >
          <option value="">Select a category</option>
          <option value="fashion">Fashion</option>
          <option value="beauty">Beauty</option>
          <option value="technology">Technology</option>
        </select>
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-xl font-semibold">Excerpt</label>
        <textarea
          id="excerpt"
          className="w-full border rounded-md p-2"
          rows="4"
          placeholder="Write a brief description of your blog post..."
          {...register("excerpt", { required: "Excerpt is required" })}
        />
        {errors.excerpt && (
          <p className="text-red-500">{errors.excerpt.message}</p>
        )}
      </div>

      <div className="flex flex-col space-y-2 relative h-74">
        <label className="text-xl font-semibold">Content</label>
        <div ref={editorRef}></div>
        <Button
          type="button"
          onClick={generateContent}
          className="absolute bottom-1 right-2 ml-2  text-white  px-4 py-1.5 rounded hover:underline cursor-pointer"
        >
          Generate with Ai
        </Button>

        {errors.content && (
          <p className="text-red-500">{errors.content.message}</p>
        )}
      </div>

      <div className="flex space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button type="submit">Publish Blog</Button>
      </div>
    </form>
  );
}

export default AddBlog;
