import React from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Alert, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signOut } from "../store/slices/userSlice";

export default function Signout() {
  return (
    <Alert
      additionalContent={<AdditionalContent />}
      color="failure"
      icon={HiInformationCircle}
      className="text-3xl max-w-sm mx-auto mt-20"
    >
      Signing Out!!!
    </Alert>
  );
}

function AdditionalContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignout = async () => {
    axios
      .post("/api/user/signout")
      .then(function (response) {
        dispatch(signOut());
        navigate("/");
      })
      .catch(function (error) {
        const err = error.response.data.errorMessage;
        dispatch(signInFailure(err));
      });
  };
  return (
    <>
      <div className="mb-4 mt-2 text-2xl text-cyan-700 dark:text-cyan-800">
        Are you sure you want to Sign Out?
      </div>
      <div className="flex gap-3">
        <Button color="failure" onClick={handleSignout}>
          Yes, Sign Out
        </Button>
        <Link to="/dashboard/profile">
          <Button color="success">No</Button>
        </Link>
      </div>
    </>
  );
}
