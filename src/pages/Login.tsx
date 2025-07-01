import { Calendar, Mail, Shield, Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { verifyToken } from "../utils/verifyToken";
import { setUser, type TUser } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
import { useState } from "react";
import Loader from "../components/common/Loader";

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      const { userId, email } = verifyToken(result.data.accessToken) as TUser;
      dispatch(
        setUser({ user: { userId }, email, token: result.data.accessToken })
      );

      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Invalid email or password!");
    }
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="glass rounded-3xl overflow-hidden w-full max-w-md backdrop-blur-xl shadow-2xl hover:shadow-accent-500/40 ring-1 ring-white/10 dark:ring-white/5 transition-all hover:scale-[1.01]">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-white/90 mt-2 text-sm">
              Sign in to your EventHub account
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="form-input pl-10"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="form-error">{errors.email.message as string}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="form-input pl-10 pr-10"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 inset-y-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="form-error">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? <Loader /> : "Sign In"}
            </button>
          </form>

          {/* Register */}
          <p className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="text-primary-500 hover:text-primary-600 font-medium transition"
            >
              Sign up for free
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
