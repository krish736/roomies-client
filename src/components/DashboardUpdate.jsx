import React, { useState } from "react";
import defaultAvatar from "../assets/defaultAvatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  updateImageStart,
  updateImageSuccess,
  updateImageFailure,
} from "../store/slices/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { Alert, Spinner } from "flowbite-react";

export default function DashboardUpdate() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    phoneNo: currentUser.phoneNo,
    city: currentUser.city,
    profilePicture: currentUser.profilePicture,
  });
  const [updateStatus, setUpdateStatus] = useState(false);
  const [imageFileURL, setImageFileURL] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(updateImageStart());

      const fileUrl = URL.createObjectURL(file);
      setImageFileURL(fileUrl);

      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}_${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          dispatch(updateImageFailure(error.message));
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setImageFileURL(downloadURL);
            setFormData((prevFormData) => ({
              ...prevFormData,
              profilePicture: downloadURL,
            }));
            setFormData({ ...formData, profilePicture: downloadURL });
            dispatch(updateImageSuccess());
            setImageUploaded(true);
          });
        }
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateStart());
    axios
      .put(`/api/user/update/${currentUser._id}`, {
        username: formData.username,
        email: formData.email,
        phoneNo: formData.phoneNo,
        city: formData.city,
        profilePicture: formData.profilePicture,
      })
      .then(function (response) {
        console.log("success");
        dispatch(updateSuccess(response.data));
        setUpdateStatus(true);
        setImageUploaded(false);
        setTimeout(() => {
          setUpdateStatus(false);
        }, 1000);
      })
      .catch(function (error) {
        const err = error.response.data.errorMessage;
        dispatch(updateFailure(err));
      });
  };
  return (
    <div className="flex-1 p-3 flex flex-col justify-center rounded max-w-sm mx-auto mt-10 mb-7 border-4">
      <h1 className=" text-center text-2xl mb-3">Update Profile</h1>
      {updateStatus && (
        <Alert className="mb-2" color="success">
          Updates Succesfully!
        </Alert>
      )}
      {imageUploaded && (
        <Alert className="mb-2" color="success">
          Image uploaded Succesfully! Please click on update to confirm changes!
        </Alert>
      )}
      <label htmlFor="profileImageInput">
        <img
          src={formData.profilePicture}
          alt="Profile"
          className="h-24 w-24 mx-auto rounded-full mb-3 cursor-pointer object-cover object-center"
        />
      </label>
      <input
        type="file"
        id="profileImageInput"
        hidden
        accept="image/*"
        onChange={handleImageChange}
      />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col">
          <span className="font-medium">Username</span>
          <input
            type="text"
            name="username"
            className="p-2 border rounded text-gray-900"
            required
            id="username"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium">Email</span>
          <input
            type="email"
            name="email"
            className="p-2 border rounded  text-gray-900"
            required
            id="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium">Phone no.</span>
          <input
            type="tel"
            name="tel"
            className="p-2 border rounded  text-gray-900"
            id="phoneNo"
            required
            defaultValue={currentUser.phoneNo || ""}
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium">City</span>
          <input
            type="text"
            name="text"
            className="p-2 border rounded  text-gray-900"
            id="city"
            required
            defaultValue={currentUser.city || ""}
            onChange={handleChange}
          />
        </label>
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? <Spinner size="sm" /> : "Update"}
        </button>
      </form>
      {error && (
        <Alert className="mt-5" color="failure">
          {error}
        </Alert>
      )}
    </div>
  );
}
