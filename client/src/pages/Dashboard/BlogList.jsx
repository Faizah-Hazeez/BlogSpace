import BlogTable from "@/ui/BlogTable";
import { BookOpenCheck } from "lucide-react";

function BlogList() {
  return (
    <div className="font-default-family -mt-8">
      <div className="flex items-center gap-2 mt-6 ">
        <BookOpenCheck className="w-8 h-8 bg-blue-50 rounded p-1.5 text-blue-400" />
        <p className="text-lg font-semibold">Latest Blogs</p>
      </div>
      <BlogTable />
    </div>
  );
}

export default BlogList;
