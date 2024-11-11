import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Spinner } from "flowbite-react";
import GoogleAuth from "../components/GoogleAuth";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("All Fields Are Required!");
    }
    setLoading(true);
    setErrorMessage(null);

    axios
      .post("/api/auth/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .then(function (response) {
        const data = response.config.data;
        setLoading(false);
        navigate("/signin");
      })
      .catch(function (error) {
        setErrorMessage(error.response.data.errorMessage);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col max-w-3xl mx-auto h-auto  mt-0 lg:mt-28 border-4 justify-between gap-2 lg:flex-row p-6">
      <div className="flex-1 p-3 flex items-center justify-center border-b-2 lg:border-r-2 lg:border-b-0 ">
        <div className="text-center">
          <h1 className=" text-2xl">Hello, Friend</h1>
          <h4>Welcome to roomies, looking for rooms or roomies?</h4>
        </div>
      </div>
      <div className="flex-1 p-3 flex flex-col justify-center rounded">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h1 className=" text-center text-2xl">Sign Up</h1>
          <label className="flex flex-col">
            <span className="font-medium">Username</span>
            <input
              type="text"
              name="username"
              className="p-2 border rounded text-gray-900"
              placeholder="Enter your username"
              required
              id="username"
              onChange={handleChange}
            />
          </label>
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
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : "Sign Up"}
          </button>
          <GoogleAuth />
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </span>
        </div>
        {errorMessage && (
          <Alert className="mt-5" color="failure">
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}
