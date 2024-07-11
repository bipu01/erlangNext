import { useState } from "react";
// import { Link } from "react-router-dom";
import Link from "next/link";
import Image from "next/image";

export default function Hamburger() {
  const [show, setShow] = useState<boolean>(false);

  const handelHamClick = () => {
    setShow(!show);
  };
  // Define an array of menu items
  const menuItems = [
    { link: "/", icon: "/icons/back.png", text: "" },
    { link: "/product", icon: "/icons/fav.png", text: "Favorites" },
    { link: "/contact", icon: "/icons/email.png", text: "Contact us" },
    { link: "/aboutus", icon: "/icons/about2.png", text: "About us" },
    { link: "/", icon: "/icons/profile.png", text: "Profile" },
    { link: "/cart", icon: "/icons/tick.png", text: "My orders" },
    { link: "/login", icon: "/icons/exit.png", text: "Logout" },
  ];

  return (
    <>
      {/* Hamburger */}
      <div
        className="flex flex-col gap-1 cursor-pointer relative"
        onClick={handelHamClick}
      >
        <div className="bg-black w-8 h-1 rounded-xl"></div>
        <div className="bg-black w-8 h-1 rounded-xl"></div>
        <div className="bg-black w-8 h-1 rounded-xl"></div>
      </div>

      {/* lists */}
      <div
        className={`w-full h-screen backdrop-brightness-75 absolute left-0
            top-12 sm:top-16 ${show ? "block" : "hidden"}`}
        onClick={handelHamClick}
      >
        <div
          className={` text-sm flex flex-col gap-4 font-semibold sm:text-xl w-64 p-5 absolute right-1vw z-30 top-0 shadow-customSearchProduct bg-bodybg `}
        >
          {menuItems.map((item, index) => (
            <div className="" key={index}>
              <Link href={item.link}>
                <div className=" flex gap-3 pb-2 items-center">
                  {/* <img className=" h-5 w-5" src={item.icon} alt="" /> */}
                  <img className="h-5 w-5" src={item.icon} alt="" />
                  <p
                    className={`${
                      index === menuItems.length - 1 ? "text-red-600" : ""
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
              </Link>
              {index !== 0 && index !== menuItems.length - 1 && (
                <div className="bg-lineColor w-90% h-[1.5px] rounded-xl"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
