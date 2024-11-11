import { Card } from "flowbite-react";
import { useSelector } from "react-redux";
import defaultAvatar from "../assets/defaultAvatar.jpg";

export default function DashboardProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Card className="max-w-sm mx-auto mt-10 mb-7">
      <div className="flex flex-col items-center">
        <img
          src={currentUser.profilePicture}
          className=" h-24 w-24 mx-auto rounded-full mb-3 cursor-pointer object-cover object-center"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {currentUser.username}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {currentUser.isAdmin ? "Admin" : "Member"}
        </span>
        <div className=" flex flex-col items-center mt-4 border-t-4 pt-2">
          <div className=" items-center">{currentUser.email}</div>
          <div className="">{currentUser.phoneNo || "-"}</div>
          <div className="">{currentUser.city || "-"}</div>
        </div>
      </div>
    </Card>
  );
}
