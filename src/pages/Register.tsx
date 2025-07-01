import { Plus, Shield, User } from "lucide-react";
import { useRegisterUserMutation } from "../redux/features/user/userApi";
import { useNavigate } from "react-router-dom";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import Loader from "../components/common/Loader";

export default function Register() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      photoUrl: data.photoUrl,
    };
    try {
      const result = await registerUser(userInfo).unwrap();
      if (result.error) {
        toast.error(result.error?.data?.message);
      } else {
        toast.success("User registration successfully!");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-neutral-900 dark:to-neutral-800 p-4">
      <div className="glass rounded-3xl overflow-hidden w-full max-w-md backdrop-blur-xl shadow-2xl hover:shadow-accent-500/40 ring-1 ring-white/10 dark:ring-white/5 transition-all hover:scale-[1.01]">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary-500 to-accent-500 p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-white/90 mt-2">
            Join the EventHub community today
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="form-input pl-10"
                  placeholder="Enter your name"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message as string}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-neutral-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="form-input pl-10"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="w-5 h-5 text-neutral-400" />
                </div>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="form-input pl-10"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            {/* Photo URL */}
            <div>
              <label htmlFor="photoUrl" className="form-label">
                Profile Photo URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-neutral-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  {...register("photoUrl", {
                    required: "PhotoUrl is required",
                  })}
                  className="form-input pl-10"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
              {errors.photoUrl && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.photoUrl.message as string}
                </p>
              )}
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full"
              >
                {isLoading ? <Loader /> : "Register"}
              </button>
            </div>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
