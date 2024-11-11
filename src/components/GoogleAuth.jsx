import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../store/slices/userSlice.js";
import { useNavigate } from "react-router-dom";

export default function GoogleAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      axios
        .post("/api/auth/google", {
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        })
        .then(function (response) {
          dispatch(signInSuccess(response.data));
          navigate("/");
        })
        .catch(function (error) {
          const err = error.response.data.errorMessage;
          dispatch(signInFailure(err));
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="mt-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
      onClick={handleGoogleAuth}
    >
      Sign In with google
    </button>
  );
}
