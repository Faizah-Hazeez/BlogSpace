import { useState } from "react";
import Button from "../ui/Button";
import { SampleBlog } from "../data/blogs";
import { Link } from "react-router-dom";

const Categories = ["All", "Fashion", "Beauty", "Technology"];

function Blogs() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleShowLess = () => {
    setVisibleCount((prev) => Math.max(prev - 3, 6));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleCount(6);
  };

  // Filter
  const filterBlogs =
    selectedCategory === "All"
      ? SampleBlog
      : SampleBlog.filter((blog) => blog.category === selectedCategory);

  const visibleBlogs = filterBlogs.slice(0, visibleCount);
  const hasMore = visibleCount < filterBlogs.length;
  const hasLess = visibleCount > 6 && filterBlogs.length > 6;

  return (
    <section className="lg:px-20 px-5 py-4">
      <div
        className="lg:space-x-4 space-x-2 flex justify-center"
        data-aos="fade-up"
      >
        {Categories.map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`lg:px-6 px-4 py-1.5 text-lg border border-blue-500 rounded-full font-semibold ${
              selectedCategory === category
                ? "bg-blue-400 text-white"
                : "bg-white text-gray-800 hover:bg-blue-100"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>
      <div
        className=" grid lg:grid-cols-3 grid-cols-1 gap-4 mt-8"
        data-aos="fade-left"
      >
        {visibleBlogs.map((blog) => (
          <Link to={`/blog/${blog.id}`} key={blog.id}>
            <div className="bg-white p-4 shadow-sm">
              <img src={blog.image} alt={blog.title} className="mb-4" />
              <Button className="border-blue-500 border px-4 font-semibold py-1 rounded-full ">
                {blog.category}
              </Button>
              <h2 className="font-bold mt-2">{blog.title}</h2>
              <p className="mt-1">{blog.excerpt}</p>
              <div className="flex justify-between mt-2 ">
                <div>
                  <p className="font-mono font-bold">{blog.author}</p>
                  <p className="font-semibold">{blog.date}</p>
                </div>
                <div>
                  <p className="text-blue-500">{blog.readTime}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleShowMore}
            className="px-6 py-1.5 bg-blue-400 text-white rounded-full hover:bg-blue-500"
          >
            Load More
          </Button>
        </div>
      )}

      {hasLess && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleShowLess}
            className="px-6 py-1.5  bg-blue-400 text-white rounded-full hover:bg-blue-500"
          >
            Load Less
          </Button>
        </div>
      )}
    </section>
  );
}

export default Blogs;
