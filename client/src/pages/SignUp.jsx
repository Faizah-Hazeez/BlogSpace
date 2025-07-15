import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import Footer from "../component/Footer";

function SignUp() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullname, email, password }) {
    console.log(fullname, email, password);
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:px-10 px-4 py-6 bg-white shadow-sm lg:w-1/2 w-full lg:mx-auto lg:my-10 space-y-4 rounded-sm"
      >
        <h1 className="text-center font-bold lg:text-3xl text-2xl font-default-family">
          Sign<span className="text-blue-400 italic">Up</span>{" "}
        </h1>
        <div className="flex flex-col">
          <label className="text-xl font-semibold font-default-family">
            Fullname:
          </label>
          <input
            type="text"
            id="fullName"
            className="border rounded-sm p-2"
            {...register("fullName", { required: "This field is required" })}
          />
          {errors.fullName && (
            <p style={{ color: "red" }}>{errors.fullName.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-xl font-semibold font-default-family">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="border rounded-sm p-2"
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
          <label className="text-xl font-semibold font-default-family">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="border rounded-sm p-2"
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
        <div className="flex flex-col">
          <label className="text-xl font-semibold font-default-family">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="border rounded-sm p-2"
            {...register("confirmPassword", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords need to match",
            })}
          />
          {errors.passwordConfirm && (
            <p style={{ color: "red" }}>{errors.passwordConfirm.message}</p>
          )}
        </div>
        <div className="space-x-3">
          <Button className="border border-blue-500 rounded-sm py-2 px-6 font-default-family font-semibold hover:bg-blue-500 hover:text-white">
            Sign Up
          </Button>
        </div>
      </form>
      <Footer />
    </>
  );
}

export default SignUp;
