import { Outlet } from "react-router";

const Main = () => {
  return (
    <div
      className="min-h-screen bg-gray-100 bg-[#c0c0c0]"
    >
      <Outlet />
    </div>
  );
};

export default Main;
