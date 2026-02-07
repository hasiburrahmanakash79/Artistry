import { Outlet } from "react-router";

const Main = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Outlet />
    </div>
  );
};

export default Main;
