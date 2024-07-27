"use client";
import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotLoggedPopup from "../components/Popups/NotLoggedPopup";
import { setUser } from "@/redux/features/userSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/user/info");
      const parsedRes = await res.json();
      const user = parsedRes.message;

      dispatch(setUser(user));
    };
    getUser();
  }, []);

  return (
    <section className="">
      {!isAuthorized && <NotLoggedPopup />}
      <div>ProfilePage</div>
      <div className="flex flex-col   justify-center items-center gap-12">
        <div className=" rounded-full bg-black/10 p-12 bg-pink-300">
          {user?.email?.slice(0, 2)}
        </div>
        <div className="flex flex-col gap-4">
          <div className="items-center flex gap-3">
            <div>Name {" :"} </div>
            <textarea
              name="name"
              id="name"
              defaultValue={user && user.name}
              className="h-8 w-10rem sm:w-15rem border-2 border-black/30 resize-none rounded-md px-2 py-0.5"
            ></textarea>
          </div>
          <div className="items-center flex gap-3">
            <div>Email {" :  "} </div>
            <textarea
              name="email"
              id="email"
              defaultValue={user.email}
              className="h-8 w-10rem sm:w-15rem border-2 border-black/30 resize-none rounded-md px-2 py-0.5"
            ></textarea>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
