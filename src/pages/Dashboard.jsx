import React from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import { Outlet } from "react-router-dom"; // Use Outlet for nested routes

export default function Dashboard() {
  return (
    <div className="flex flex-col lg:flex-row">
      <DashboardSidebar />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}
