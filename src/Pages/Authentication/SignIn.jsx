import { useForm } from "react-hook-form";
import Logo from "../../assets/logo/logo";
import dance from "../../assets/images/dance.svg";
import dance1 from "../../assets/images/danceMove.svg";
import google from "../../assets/icons/google.svg";
import facebook from "../../assets/icons/facebook.svg";
import apple from "../../assets/icons/apple.svg";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex items-center justify-between gap-20">
        <div className="hidden lg:block flex-1 pb-36">
          <img
            src={dance}
            alt="Illustration of a dancing figure"
            className="w-full h-auto select-none pointer-events-none"
          />
        </div>
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-3">
            <Logo />
          </div>
          <h2 className="text-[#9C1E1E] text-center font-semibold text-lg mb-7">
            Artistry Coach
          </h2>
          <h1 className="text-2xl font-extrabold text-center text-gray-900 mb-1">
            Sign In
          </h1>
          <p className="text-center text-gray-600 text-sm mb-8">
            Sign in with your account to get started
          </p>
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
                className="w-full px-4 py-3 bg-white shadow-md rounded-md outline-none text-sm"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-3 bg-white shadow-md rounded-md outline-none text-sm"
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-[#9C1E1E] text-white py-3 rounded-md font-medium hover:scale-102 transition-transform duration-300"
            >
              Continue
            </button>
          </form>
          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <div className="flex justify-between items-center gap-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-white shadow-md rounded-md hover:shadow-lg transition-shadow duration-300"
              aria-label="Sign in with Google"
            >
              <img src={google} alt="Google logo" className="w-5 h-5 select-none pointer-events-none" />
              <span className="text-gray-700 font-medium text-sm">Google</span>
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-white shadow-md rounded-md hover:shadow-lg transition-shadow duration-300"
              aria-label="Sign in with Facebook"
            >
              <img src={facebook} alt="Facebook logo" className="w-5 h-5 select-none pointer-events-none" />
              <span className="text-gray-700 font-medium text-sm">
                Facebook
              </span>
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-white shadow-md rounded-md hover:shadow-lg transition-shadow duration-300"
              aria-label="Sign in with Apple"
            >
              <img src={apple} alt="Apple logo" className="w-5 h-5 select-none pointer-events-none" />
              <span className="text-gray-700 font-medium text-sm">Apple</span>
            </button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account yet?{" "}
            <a
              href="/signup"
              className="text-[#9C1E1E] font-semibold hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
        <div className="hidden lg:block flex-1 pt-36">
          <img
            src={dance1}
            alt="Illustration of a dancing figure in motion"
            className="w-2/3 h-auto select-none pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
