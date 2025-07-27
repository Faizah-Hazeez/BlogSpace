import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import Footer from "../component/Footer";
import { useAppContext } from "@/context/AppContex";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;
  const { axios, setToken } = useAppContext();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/admin/login", {
        email: data.email,
        password: data.password,
      });

      if (response.data.success) {
        const newToken = response.data.token;
        setToken(newToken);
        navigate("/admin");
      } else {
        toast.error(response.data.message || "Login failed");
        console.log(data.message);
      }
    } catch (error) {
      toast.error(
        "Login error: " + (error.response?.data?.message || error.message)
      );
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:px-10 px-4 py-6 bg-white shadow-sm lg:w-1/2 w-full lg:mx-auto lg:my-10 rounded-sm space-y-4"
      >
        <div>
          <h1 className="text-center font-bold lg:text-3xl text-2xl font-default-family">
            Admin
            <span className="text-blue-400 italic"> Login</span>{" "}
          </h1>
          <p className="text-center text-lg">
            Enter your credentials to access the admin panel
          </p>
        </div>

        <div className="flex flex-col ">
          <label className="text-xl font-semibold font-default-family text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="border-b-2 outline-0 rounded-sm p-2"
            {...register("email", {
              required: "This field is required",

              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-xl font-semibold font-default-family text-gray-700">
            Password:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="border-b-2 outline-0 rounded-sm p-2 bg-transparent"
            {...register("password", {
              required: "This field is required",

              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        <Button className="border  rounded-sm py-2 px-6 font-default-family font-semibold hover:bg-blue-500 text-white mx-auto w-full bg-blue-400">
          Login
        </Button>
      </form>
      <Footer />
    </>
  );
}

export default SignIn;
