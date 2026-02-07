import { useForm } from "react-hook-form";
import Logo from "../../assets/logo/logo";
import dance from "../../assets/images/dance.svg";
import dance1 from "../../assets/images/danceMove.svg";
import google from "../../assets/icons/google.svg";
import facebook from "../../assets/icons/facebook.svg";
import apple from "../../assets/icons/apple.svg";
import ThemeToggle from "../../components/common/ThemeToggle";

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
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 relative">
      {/* Theme Toggle */}
      <div className="absolute right-4 top-5">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-6xl flex items-center justify-between gap-20">
        {/* Left Illustration */}
        <div className="hidden lg:block flex-1 pb-36">
          <img
            src={dance}
            alt="Illustration of a dancing figure"
            className="w-full h-auto select-none pointer-events-none"
          />
        </div>

        {/* Form */}
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-3">
            <Logo />
          </div>
          <h2 className="text-primary text-center font-semibold text-lg mb-7">
            Artistry Coach
          </h2>
          <h1 className="text-2xl font-extrabold text-center text-base-content mb-1">
            Sign In
          </h1>
          <p className="text-center text-base-content/60 text-sm mb-8">
            Sign in with your account to get started
          </p>

          {/* Form Inputs */}
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
                className="w-full px-4 py-3 bg-base-100 shadow rounded-md outline-none text-sm text-base-content"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-error text-xs mt-1">
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
                className="w-full px-4 py-3 bg-base-100 shadow rounded-md outline-none text-sm text-base-content"
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-error text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full btn btn-primary text-base-100 py-3 rounded-md font-medium hover:scale-102 transition-transform duration-300"
            >
              Continue
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-base-content/20"></div>
            <span className="px-4 text-base-content/60 text-sm">OR</span>
            <div className="flex-1 border-t border-base-content/20"></div>
          </div>

          {/* Social Login */}
          <div className="flex flex-col gap-3">
            {[{ icon: google, label: "Google" }, { icon: facebook, label: "Facebook" }, { icon: apple, label: "Apple" }].map((s) => (
              <button
                key={s.label}
                type="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-base-100 shadow rounded-md hover:shadow-lg transition-shadow duration-300"
                aria-label={`Sign in with ${s.label}`}
              >
                <img
                  src={s.icon}
                  alt={`${s.label} logo`}
                  className="w-5 h-5 select-none pointer-events-none"
                />
                <span className="text-base-content font-medium text-sm">
                  {s.label}
                </span>
              </button>
            ))}
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-base-content/60 mt-6">
            Don&apos;t have an account yet?{" "}
            <a
              href="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>

        {/* Right Illustration */}
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
