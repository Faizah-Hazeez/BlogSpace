import { useAppContext } from "@/context/AppContex";
import { useState } from "react";
import toast from "react-hot-toast";

function NewsLetter() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { axios } = useAppContext();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      const { data } = await axios.post("/api/newsletter/subscribe", {
        email: email.trim().toLowerCase(),
      });

      if (data.success) {
        toast.success(data.message || "Successfully subscribed to newsletter!");
        setEmail("");
      } else {
        toast.error(data.message || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);

      if (error.response?.status === 409) {
        toast.error("This email is already subscribed!");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to subscribe. Please try again later.");
      }
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section className="px-6 py-10 lg:px-20 my-4 font-default-family">
      <div>
        <h2 className="text-lg font-bold text-gray-800 text-center">
          Never Miss a Blog!
        </h2>
        <p className="text-gray-600 mb-2 text-center">
          Subscribe to our newsletter for the latest blog updates.
        </p>
      </div>

      <form onSubmit={handleSubscribe} className="flex justify-center w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-400 w-1/2"
          disabled={isSubscribing}
        />
        <button
          type="submit"
          disabled={isSubscribing}
          className="px-4 py-2 bg-blue-400 text-white rounded-r-md hover:bg-blue-500 transition-colors"
        >
          {isSubscribing ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </section>
  );
}

export default NewsLetter;
