import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import apiClient from "../../lib/api-client";
import { Dance, Danse2 } from "../../assets/icons/icons";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user_id = location.state?.user_id || "";
  const secret_key = location.state?.secret_key || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [apiError, setApiError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setApiError("Passwords do not match.");
      return;
    }
    setApiError(null);
    try {
      await apiClient.post("/auth/reset-password", {
        user_id: user_id,
        secret_key: secret_key,
        new_password: data.password,
        confirm_password: data.confirmPassword,
      });
      // On success, navigate to login page
      navigate("/signin");
    } catch (error) {
      console.error("Reset Password Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Password reset failed. Please try again.";
      setApiError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-secondary">
      <div className="w-full max-w-6xl flex items-center justify-between gap-20">
        {/* Left dancing icon - lg+ only */}
        <div className="hidden lg:block flex-1 pb-36">
          <Danse2 />
        </div>

        {/* Center form */}
        <div className="w-full max-w-md">
          

          <h1 className="text-2xl font-extrabold text-center mb-1">
            Reset Password
          </h1>

          <p className="text-center text-sm mb-8">
            Enter your new password below.
          </p>

          {/* Display API error if any */}
          {apiError && (
            <p className="text-[#9C1E1E] text-sm text-center mb-4 font-medium">
              {apiError}
            </p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full px-4 py-3 bg-base-100 shadow-md rounded-md outline-none text-sm pr-10"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-[#9C1E1E] text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
                className="w-full px-4 py-3 bg-base-100 shadow-md rounded-md outline-none text-sm pr-10"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.confirmPassword && (
                <p className="text-[#9C1E1E] text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-md font-medium bg-[#9C1E1E] text-white hover:scale-102 transition-transform duration-300"
            >
              Reset Password
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            <Link
              to="/signin"
              className="text-[#9C1E1E] hover:underline font-medium"
            >
              Back to Sign In
            </Link>
          </p>
        </div>

        {/* Right dancing icon - lg+ only */}
        <div className="hidden lg:block flex-1 pt-36">
          <Dance className="w-full h-auto select-none pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;