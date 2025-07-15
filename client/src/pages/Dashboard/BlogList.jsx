import BlogTable from "@/ui/BlogTable";

function BlogList() {
  return (
    <div className="font-default-family ">
      <h2 className="text-3xl mb-4 text-blue-400 italic">All Blogs</h2>
      <BlogTable />
    </div>
  );
}

export default BlogList;
