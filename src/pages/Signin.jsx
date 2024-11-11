import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Spinner } from "flowbite-react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../store/slices/userSlice.js";
import { useSelector, useDispatch } from "react-redux";
import GoogleAuth from "../components/GoogleAuth.jsx";

export default function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("All Fields are Required!"));
    }
    dispatch(signInStart());

    axios
      .post("/api/auth/signin", {
        email: formData.email,
        password: formData.password,
      })
      .then(function (response) {
        dispatch(signInSuccess(response.data));
        navigate("/");
      })
      .catch(function (error) {
        const err = error.response.data.errorMessage;
        dispatch(signInFailure(err));
      });
  };

  return (
    <div className="flex flex-col max-w-3xl mx-auto h-auto  mt-0 lg:mt-28 border-4 justify-between gap-2 lg:flex-row p-6">
      <div className="flex-1 p-3 flex flex-col justify-center rounded order-2 lg:order-1">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h1 className=" text-center text-2xl">Sign In</h1>
          <label className="flex flex-col">
            <span className="font-medium">Email</span>
            <input
              type="email"
              name="email"
              className="p-2 border rounded text-gray-900"
              placeholder="Enter your email"
              required
              id="email"
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col">
            <span className="font-medium">Password</span>
            <input
              type="password"
              name="password"
              className="p-2 border rounded text-gray-900"
              placeholder="Enter your password"
              required
              id="password"
              onChange={handleChange}
            />
          </label>
          <button className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            {loading ? <Spinner size="sm" /> : "Sign In"}
          </button>
          <GoogleAuth />
        </form>
        <div className="mt-4 text-center  ">
          <span className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </span>
        </div>
        {error && (
          <Alert className="mt-5" color="failure">
            {error}
          </Alert>
        )}
      </div>
      <div className="flex-1 p-3 flex items-center justify-center border-b-2 lg:border-l-2 lg:border-b-0  order-1 lg:order-2">
        <div className="text-center">
          <h1 className=" text-2xl">Welcome back</h1>
          <h4>Welcome again to roomies, looking for rooms or roomies?</h4>
        </div>
      </div>
    </div>
  );
}
