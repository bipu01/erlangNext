"use client";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotLoggedPopup from "../components/Popups/NotLoggedPopup";
import { setUser } from "@/redux/features/userSlice";
import Popup from "../components/Popups/Popup";
import {
  popupSetHeading,
  popupSetMessage,
  togglePopup,
} from "@/redux/features/popupSlice";

const ProfilePage = () => {
  // const [formData, setFormData] = useState({ name: "", email: "" });
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );
  const popup = useSelector((state: RootState) => state.popupSlice.popup);
  const heading = useSelector((state: RootState) => state.popupSlice.heading);
  const message = useSelector((state: RootState) => state.popupSlice.message);

  const handleProfileEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = {
      name: name,
      address: address,
      phone: phone,
    };
    e.preventDefault();

    if (name === "") {
      console.error("name cannot be empty");
      dispatch(popupSetHeading("username cannot be empty"));
      dispatch(popupSetMessage("❌❌❌❌❌"));
      dispatch(togglePopup());
    } else {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      dispatch(popupSetHeading("Profile Successfully updated"));
      dispatch(popupSetMessage("✅✅✅✅✅"));
      dispatch(togglePopup());

      const parsedRes = await res.json();
      console.log({ parsedRes: parsedRes.message });
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/user/profile");
      const parsedRes = await res.json();
      const user = parsedRes.message;

      setName(user?.name);
      setAddress(user?.address);
      setPhone(user?.phone);

      console.log({ userInProfile: user });
      dispatch(setUser(user));
    };
    getUser();
  }, []);

  return (
    <section className="">
      {!isAuthorized && <NotLoggedPopup />}
      {popup && isAuthorized && <Popup heading={heading} message={message} />}
      <div className="flex flex-col   justify-center items-center gap-10 bg-bgLightBlue p-6 py-8 sm:py-16 rounded-md w-100vw sm:mt-5vh sm:w-60vw max-w-40rem ml-auto mr-auto">
        <div className="text-base sm:text-lg sm:font-xl font-semibold text-center pt-0 sm:pt-8 ">
          Profile
        </div>
        <div className=" rounded-full bg-black/10 p-12  bg-pink-300">
          {user?.email?.slice(0, 2)}
        </div>
        <div className="">
          <form
            onSubmit={handleProfileEdit}
            className="flex flex-col gap-4 items-start sm:items-center"
          >
            <div className=" items-start flex flex-col gap-1 sm:gap-3">
              <div>Name {" :"} </div>
              <input
                name="name"
                id="name"
                defaultValue={user && user.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.currentTarget.value)
                }
                // required
                className="h-8 w-15rem sm:w-15rem border-2 border-black/30 resize-none rounded-md px-2 py-0.5"
              ></input>
            </div>
            <div className=" items-start flex flex-col  gap-1 sm:gap-3">
              <div>Address {" :  "} </div>
              <textarea
                name="address"
                id="address"
                defaultValue={user.address}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setAddress(e.currentTarget.value)
                }
                className="h-8 w-15rem sm:w-15rem border-2 border-black/30 resize-none rounded-md px-2 py-0.5"
              ></textarea>
            </div>
            <div className=" items-start flex flex-col gap-1 sm:gap-3">
              <div>Phone {" :  "} </div>
              <input
                type="number"
                name="phone"
                id="phone"
                defaultValue={user.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPhone(e.currentTarget.value)
                }
                className="h-8 w-15rem sm:w-15rem border-2 border-black/30 resize-none rounded-md px-2 py-0.5"
              ></input>
            </div>
            <button
              type="submit"
              className="w-15rem h-8 mt-8 rounded-md bg-primaryBlue text-white"
            >
              Change
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
