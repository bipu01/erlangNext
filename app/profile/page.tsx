"use client";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import NotLoggedPopup from "../components/Popups/NotLoggedPopup";

const ProfilePage = () => {
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );
  return (
    <>
      {!isAuthorized && <NotLoggedPopup />}
      <div>ProfilePage</div>
    </>
  );
};

export default ProfilePage;
