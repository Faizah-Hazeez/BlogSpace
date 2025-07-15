import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { SampleBlog } from "@/data/blogs";

function BlogTable() {
  return (
    <Table className="w-full">
      <TableCaption>A list of your recent blogs.</TableCaption>
      <TableHeader className="text-lg font-bold">
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead className="w-[400px]">Blog Title</TableHead>
          <TableHead className="w-[200px]">Date</TableHead>
          <TableHead className="w-[100px]">Status</TableHead>
          <TableHead className="w-[200px]">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {SampleBlog.map((blog) => (
          <TableRow key={blog.id}>
            <TableCell className="font-medium">{blog.id}</TableCell>
            <TableCell>{blog.title}</TableCell>
            <TableCell>{blog.date}</TableCell>
            <TableCell
              className={`${
                blog.status === "Published"
                  ? "text-green-600"
                  : "text-orange-700"
              }`}
            >
              {blog.status}
            </TableCell>
            <TableCell className="flex items-center gap-5">
              <button
                className={`${
                  blog.Action === "Unpulished"
                    ? "bg-red-300 text-white"
                    : "bg-green-300 text-white"
                } border px-4 py-0.5 mt-1 rounded-3xl cursor-pointer`}
              >
                {blog.Action}
              </button>
              <Trash2 className="text-red-300 w-5 h-5 hover:k,x6zzxd5" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default BlogTable;
