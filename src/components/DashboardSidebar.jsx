import React from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiUser } from "react-icons/hi";
import { RxUpdate } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function DashboardSidebar() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Sidebar
      aria-label="Default sidebar example"
      className=" lg:left-0 border-b-4 lg:border-r-4 w-full lg:w-fit lg:h-screen "
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard/profile">
            <Sidebar.Item icon={HiChartPie} as="div">
              Dashboard
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard/update">
            <Sidebar.Item icon={RxUpdate} as="div">
              Update
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to="/dashboard/users">
              <Sidebar.Item icon={HiUser} as="div">
                Users
              </Sidebar.Item>
            </Link>
          )}
          <Link to="/dashboard/signout">
            <Sidebar.Item icon={HiArrowSmRight} as="div">
              Sign Out
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard/delete">
            <Sidebar.Item icon={HiArrowSmRight} as="div">
              Delete
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
