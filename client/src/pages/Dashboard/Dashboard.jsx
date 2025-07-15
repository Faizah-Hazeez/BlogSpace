import BlogTable from "@/ui/BlogTable";
import { ListPlus, MessagesSquare, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";

const blogItem = [
  {
    icon: ListPlus,
    number: 9,
    title: "Blogs",
  },
  {
    icon: MessagesSquare,
    number: 3,
    title: "Comments",
  },
  {
    icon: SquarePen,
    number: 0,
    title: "Draft",
  },
];

function Dashboard() {
  const [dashboardData, setDashboardData] = useState([]);

  const fetchDashboard = async () => {
    setDashboardData(blogItem);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);
  return (
    <div className=" font-default-family space-y-6">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 ">
        {dashboardData.map((blog) => (
          <div
            key={blog.title}
            className="bg-white shadow-sm px-8 py-2 flex items-center gap-4 justify-center"
          >
            <blog.icon className="w-8 h-8 bg-gray-100 p-2             " />
            <div className="">
              <h2 className="text-blue-400 font-bold text-2xl">
                {blog.number}
              </h2>
              <p className="lg:text-xl text-lg">{blog.title}</p>
            </div>
          </div>
        ))}
      </div>

      <BlogTable />
    </div>
  );
}

export default Dashboard;
