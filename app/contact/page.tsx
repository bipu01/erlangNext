"use client";

import React, { useEffect, useState } from "react";
import ScrollToTop from "../Functions/ScrollToTop";
import { paddingForPage } from "../defineSize";
// import { Link } from "react-router-dom";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import image1 from "../../public/icons/facebook.svg";
import image2 from "../../public/icons/instagram.svg";
import image3 from "../../public/icons/telegram.svg";
import image4 from "../../public/icons/tiktok.svg";

export default function ContactUsPage() {
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [postStatus, setPostStatus] = useState(99);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await Promise.all([sendEmail()]);
    await uploadMessage();
    setMessage("");
  };

  const sendEmail = async () => {
    try {
      const formData = new FormData();
      const entireMessage: string =
        "email: " + email + " \n" + "message: " + message;

      formData.append("message", entireMessage);
      formData.append("access_key", "c135e344-d3ee-433d-8429-dbcc0dfbb3f9");

      const res = await axios.post(
        "https://api.web3forms.com/submit",
        formData
      );
      if (res.data.success) {
        console.log("Success", res.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    console.log("not sent to api");
  };

  const uploadMessage = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/message/contactUsMessage`,
        {
          message: message,
          email: email,
        }
      );
      setPostStatus(1);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      setPostStatus(0);
    }
  };

  useEffect(() => {
    if (postStatus == 1) {
      const postSuccessCard = document.getElementById(
        "postSuccessCardContainer"
      );
      if (postSuccessCard) {
        postSuccessCard.style.display = `block`;
        //   e.currentTarget.style.visibility = `hidden`;
      }
    } else if (postStatus == 0) {
      const postFailedCard = document.getElementById("postFailedCardContainer");
      if (postFailedCard) {
        postFailedCard.style.display = `block`;
        //   e.currentTarget.style.visibility = `hidden`;
      }
    }
  }, [postStatus]);

  useEffect(() => {
    makeFailedDialougeBoxInvisible();
    makeSuccessDialougeBoxInvisible();
    console.log(postStatus);
  }, []);

  const makeFailedDialougeBoxInvisible = () => {
    const postFailedCard = document.getElementById("postFailedCardContainer");
    if (postFailedCard) {
      postFailedCard.style.display = `none`;
      setPostStatus(99);
    }
  };

  const makeSuccessDialougeBoxInvisible = () => {
    const postSuccessCard = document.getElementById("postSuccessCardContainer");
    if (postSuccessCard) {
      postSuccessCard.style.display = `none`;
      setPostStatus(99);
    }
  };

  return (
    <div
      className={`bg-bodybg w-full h-screen pt-5 sm:grid sm:grid-cols-2 ${paddingForPage}`}
    >
      <ScrollToTop />
      {postStatus ? (
        <div
          id="postSuccessCardContainer"
          onClick={makeSuccessDialougeBoxInvisible}
          className=" absolute w-100vw h-120vh top-0 left-0 bg-[rgba(0,0,0,0.3)] "
        >
          <div
            //   id="postSuccessCard"
            className=" fixed top-8vh left-25vw rounded-md text-center py-4 text-xl font-medium text-bodybg w-50vw  bg-primaryBlue"
          >
            Message successfully sent <br />
            <span className=" text-base font-base">Click anywhere </span>
          </div>
        </div>
      ) : (
        <div
          id="postFailedCardContainer"
          onClick={makeFailedDialougeBoxInvisible}
          className="  absolute w-100vw h-120vh top-0 left-0 bg-[rgba(0,0,0,0.3)]"
        >
          <div
            //   id="postFailedCard"
            className=" fixed top-8vh left-25vw rounded-md text-center py-4 text-xl font-medium text-bodybg w-50vw  bg-red-950"
          >
            Internal Server Error <br />
            <span className=" text-base font-base">Please Try again later</span>
          </div>
        </div>
      )}

      <div className=" flex flex-col gap-5 col-span-1 ">
        <div className="inline-block">
          <p className="text-xl sm:text-3xl text-primaryBlue font-semibold border-b-2 border-lineColor inline-block leading-relaxed">
            Have any Questions?
          </p>
        </div>

        <div className="mt-8">
          <p className="text-base sm:text-xl text-primaryBlue font-semibold">
            Enter your Email here:
          </p>
          <input
            type="email"
            className="w-full bg-bodybg rounded-md border-2 border-primaryBlue p-2 h-12 mt-4"
            onChange={handleEmailChange}
            placeholder="Enter your email "
          />
        </div>
        <div className="">
          <p className="text-base sm:text-xl text-primaryBlue font-semibold">
            Send us a message here:
          </p>
          <form className="mt-4" onSubmit={handleSubmit}>
            <textarea
              className="w-full bg-bodybg rounded-md border-2 border-primaryBlue p-2 h-40"
              name="message"
              id="message"
              placeholder="Type your message here..."
              value={message}
              onChange={handleChange}
            ></textarea>
            <button
              type="submit"
              className="mt-4 bg-primaryBlue text-white py-2 px-10 rounded-md font-semibold"
            >
              Send
            </button>
          </form>
        </div>
        <div className="mt-5 sm:mt-10">
          <p className="text-base sm:text-xl text-primaryBlue font-semibold">
            Connect with us through our email:
          </p>
          <div className="inline-block">
            <p className="text-sm text-primaryBlue font-semibold opacity-60 border-b-2 border-lineColor">
              erlangcontactus@gmail.com
            </p>
          </div>
        </div>
        <div className="">
          <p className="text-base sm:text-xl text-primaryBlue font-semibold py-2">
            Our social links
          </p>
          <div className=" ">
            <div className="">
              <Link href="">
                <div className=" flex items-center  gap-3 py-1">
                  <div className="w-5 h-5 sm:w-7 sm:h-7 overflow-hidden ">
                    <Image
                      className=" w-full h-full object-cover"
                      src={image1}
                      alt=""
                    />
                  </div>
                  <p className="text-sm text-primaryBlue font-semibold opacity-70">
                    Facebook
                  </p>
                </div>
              </Link>
              <Link href="">
                <div className=" flex items-center  gap-3  py-1">
                  <div className="w-5 h-5 sm:w-7 sm:h-7 overflow-hidden ">
                    <Image
                      className=" w-full h-full object-cover"
                      src={image2}
                      alt=""
                    />
                  </div>
                  <p className="text-sm text-primaryBlue font-semibold opacity-70">
                    Instagram
                  </p>
                </div>
              </Link>
              <Link href="">
                <div className=" flex items-center  gap-3 py-1">
                  <div className="w-5 h-5 sm:w-7 sm:h-7 overflow-hidden ">
                    <Image
                      className=" w-full h-full object-cover"
                      src={image3}
                      alt=""
                    />
                  </div>
                  <p className="text-sm text-primaryBlue font-semibold opacity-70">
                    Telegram
                  </p>
                </div>
              </Link>
              <Link href="">
                <div className=" flex items-center  gap-3 py-1">
                  <div className="w-5 h-5 sm:w-7 sm:h-7 overflow-hidden ">
                    <Image
                      className=" w-full h-full object-contain"
                      src={image4}
                      alt=""
                    />
                  </div>
                  <p className="text-sm text-primaryBlue font-semibold opacity-70">
                    Tiktok
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
