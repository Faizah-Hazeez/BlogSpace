import { useAppContext } from "@/context/AppContex";
import BlogTable from "@/ui/BlogTable";
import {
  ListPlus,
  MessagesSquare,
  SquarePen,
  BookOpenCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Dashboard() {
  const { axios, isAuthenticated, token, isLoading } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState([]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      if (!isAuthenticated || !token) {
        toast.error("Not authenticated, skipping dashboard fetch");
        setLoading(false);
        return;
      }
      const { data } = await axios.get("/api/admin/dashboard");
      console.log("Dashboard data:", data);
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message || "Failed to fetch dashboard data");
      }
    } catch (error) {
      console.log("Fetch dashboard error:", error);
      if (error.respons?.status === 401) {
        toast.error("Session expired. Please login again");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to fetch dashboard data"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated && token) {
      fetchDashboard();
    } else if (!isLoading && !isAuthenticated) {
      setLoading(false);
      console.log("User not authenticated");
    }
  }, [isLoading, isAuthenticated, token]);

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="text-center text-gray-500">
          Verifying authentication...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="p-8">
        <div className="text-center text-gray-500">
          Please login to access the dashboard.
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  const totalBlogs = dashboardData?.blogs ?? 0;
  const totalDrafts = dashboardData?.drafts ?? 0;
  const totalComment = dashboardData?.comments ?? 0;
  return (
    <div className="flex-1 p-4 md:p-1 -lg:mt-8">
      {dashboardData ? (
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="bg-white flex  items-center gap-4 justify-left p-4 lg:min-w-48 rounded shadow cursor-pointer hover:scale-105 transition-all">
            <div className=" bg-blue-50 rounded p-1.5 text-blue-400">
              <ListPlus className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xl font-bold text-blue-400">{totalBlogs}</p>
              <h3 className="font-semibold text-gray-700">Total Blogs</h3>
            </div>
          </div>
          <div className="bg-white flex  items-center gap-4 justify-left p-4 lg:min-w-48 rounded shadow cursor-pointer hover:scale-105 transition-all">
            <div className=" bg-blue-50 rounded p-1.5 text-blue-400">
              <SquarePen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xl font-bold text-blue-400">{totalDrafts}</p>
              <h3 className="font-semibold text-gray-700">Drafts</h3>
            </div>
          </div>
          <div className="bg-white flex  items-center gap-4 justify-left p-4 lg:min-w-48 rounded shadow cursor-pointer hover:scale-105 transition-all">
            <div className=" bg-blue-50 rounded p-1.5 text-blue-400">
              <MessagesSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xl font-bold text-blue-400">{totalComment}</p>
              <h3 className="font-semibold text-gray-700">Comments</h3>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No dashboard data available</p>
      )}
      <div className="flex items-center gap-2 mt-6 ">
        <BookOpenCheck className="w-8 h-8 bg-blue-50 rounded p-1.5 text-blue-400" />
        <p className=" font-medium">Latest Blogs</p>
      </div>
      <BlogTable />
    </div>
  );
}

export default Dashboard;
