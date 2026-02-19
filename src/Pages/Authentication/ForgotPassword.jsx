import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../lib/api-client";
import { Dance, Danse2 } from "../../assets/icons/icons";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setApiError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const response = await apiClient.post("/auth/forgot-password", {
        email_address: data.email,
      });

      setSuccessMessage("A password reset link has been sent to your email.");
      navigate("/otp-verification", {
        state: { user_id: response.data.user_id, email: data.email },
      });
    } catch (error) {
      console.error("Forgot Password Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send reset link. Please try again.";
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
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
            Forgot Password
          </h1>

          <p className="text-center text-sm mb-8">
            Enter your email to receive a reset link
          </p>

          {/* Messages */}
          {successMessage && (
            <p className="text-green-600 text-sm text-center mb-4 font-medium">
              {successMessage}
            </p>
          )}

          {apiError && (
            <p className="text-[#9C1E1E] text-sm text-center mb-4 font-medium">
              {apiError}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-3 bg-base-100 shadow-md rounded-md outline-none text-sm"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-xs mt-1 text-[#9C1E1E]">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-md font-medium text-white hover:scale-102 transition-transform duration-300 flex items-center justify-center
                ${isLoading ? "bg-[#9C1E1E]/70 cursor-not-allowed" : "bg-[#9C1E1E] hover:bg-[#8a1a1a]"}`}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            Remember your password?{" "}
            <Link
              to="/signin"
              className="font-semibold hover:underline text-[#9C1E1E]"
            >
              Sign In
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

export default ForgotPassword;