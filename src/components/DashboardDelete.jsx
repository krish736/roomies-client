import React from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Alert, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../store/slices/userSlice.js";

export default function DashboardDelete() {
  return (
    <Alert
      additionalContent={<AdditionalContent />}
      color="failure"
      icon={HiInformationCircle}
      className="text-3xl max-w-sm mx-auto mt-20"
    >
      Deleting the Account!!!
    </Alert>
  );
}

function AdditionalContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const handleDelete = async () => {
    axios
      .delete(`/api/user/delete/${currentUser._id}`)
      .then(function (response) {
        dispatch(deleteUser());
        navigate("/");
      })
      .catch(function (error) {
        const err = error.response.data.errorMessage;
        console.log(err);
      });
  };
  return (
    <>
      <div className="mb-4 mt-2 text-2xl text-cyan-700 dark:text-cyan-800">
        Are you sure you want to Delete your account?
      </div>
      <div className="flex gap-3">
        <Button color="failure" onClick={handleDelete}>
          Yes, Delete
        </Button>
        <Link to="/dashboard/profile">
          <Button color="success">No</Button>
        </Link>
      </div>
    </>
  );
}
