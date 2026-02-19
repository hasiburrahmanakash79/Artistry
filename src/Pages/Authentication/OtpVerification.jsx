import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import apiClient from "../../lib/api-client";
import { Dance, Danse2 } from "../../assets/icons/icons";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user_id = location.state?.user_id || "";
  const email = location.state?.email || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [apiError, setApiError] = useState(null);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const onSubmit = async (data) => {
    const otp = `${data.otp0}${data.otp1}${data.otp2}${data.otp3}`;
    setApiError(null);
    try {
      const response = await apiClient.post("/auth/verify-reset-code", {
        user_id: user_id,
        verification_code: otp,
      });
      // On success, navigate to reset password page
      navigate("/reset-password", {
        state: { user_id, secret_key: response.data.secret_key },
      });
    } catch (error) {
      console.error("OTP Verification Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "OTP verification failed. Please try again.";
      setApiError(errorMessage);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setResendEnabled(true);
    }
  }, [timer]);

  const handleResendOtp = async () => {
    if (resendEnabled) {
      setTimer(60);
      setResendEnabled(false);
      setApiError(null);
      try {
        await apiClient.post("/auth/forgot-password", {
          email_address: email,
        });
      } catch (error) {
        console.error("Resend OTP Error:", error);
        const errorMessage =
          error.response?.data?.message ||
          "Failed to resend OTP. Please try again.";
        setApiError(errorMessage);
      }
    }
  };

  const handleInputChange = (formOnChange) => (e, index) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return; // Allow only digits
    formOnChange(e);
    if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs[index - 1].current.focus();
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
            Verify Your Email
          </h1>

          <p className="text-center text-sm mb-8">
            We have sent a 4-digit verification code to your email.
          </p>

          {/* Display API error if any */}
          {apiError && (
            <p className="text-[#9C1E1E] text-sm text-center mb-4 font-medium">
              {apiError}
            </p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex space-x-4 justify-center">
              {[0, 1, 2, 3].map((index) => {
                const { onChange: formOnChange, ref: formRef, ...rest } =
                  register(`otp${index}`, { required: true, maxLength: 1 });
                return (
                  <input
                    key={index}
                    {...rest}
                    ref={(el) => {
                      formRef(el);
                      inputRefs[index].current = el;
                    }}
                    type="text"
                    maxLength="1"
                    onChange={(e) => handleInputChange(formOnChange)(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 text-center bg-base-100 shadow-md rounded-md outline-none text-lg"
                  />
                );
              })}
            </div>
            {Object.keys(errors).length > 0 && (
              <p className="text-[#9C1E1E] text-xs text-center mt-1">
                Please fill all OTP fields
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-md font-medium bg-[#9C1E1E] text-white hover:scale-102 transition-transform duration-300"
            >
              Verify OTP
            </button>
          </form>

          {/* Resend OTP with Timer */}
          <p className="text-center text-sm mt-6">
            {resendEnabled ? (
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-[#9C1E1E] hover:underline font-medium"
              >
                Resend OTP
              </button>
            ) : (
              <span className="text-gray-500">Resend OTP in {timer}s</span>
            )}
          </p>

          <p className="text-center text-sm mt-4">
            <Link
              to="/forget-password"
              className="text-[#9C1E1E] hover:underline font-medium"
            >
              Back to Forgot Password
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

export default OtpVerification;