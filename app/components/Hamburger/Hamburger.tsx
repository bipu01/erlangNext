import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";

export default function Hamburger() {
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    sessionStorage.removeItem("currentUser");
    await axios.post("/api/user/logout");

    dispatch(logout());
    router.push("/login");
  };

  const handelHamClick = () => {
    setShow(!show);
  };
  // Define an array of menu items
  const menuItems = [
    { link: "/", icon: "/icons/back.png", text: "" },
    { link: "/liked", icon: "/icons/fav.png", text: "Liked" },
    {
      link: "/postProducts",
      icon: "/icons/postProducts.png",
      text: "Post products",
    },
    { link: "/contact", icon: "/icons/email.png", text: "Contact us" },
    { link: "/aboutus", icon: "/icons/about2.png", text: "About us" },
    { link: "/profile", icon: "/icons/profile.png", text: "Profile" },
    { link: "/orders", icon: "/icons/tick.png", text: "My orders" },
  ];

  return (
    <>
      {/* Hamburger */}
      <div
        className="flex flex-col gap-1 cursor-pointer relative  transition-all duration-200  hover:-translate-y-1 "
        onClick={handelHamClick}
      >
        <div className="bg-black w-7 h-1 rounded-xl  "></div>
        <div className="bg-black w-6 h-1 rounded-xl"></div>
        <div className="bg-black w-6 h-1 rounded-xl"></div>
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
                  <p>{item.text}</p>
                </div>
              </Link>

              {index !== 0 && index !== menuItems.length - 1 && (
                <div className="bg-lineColor w-90% h-[1.5px] rounded-xl"></div>
              )}
            </div>
          ))}
          <div
            className="text-red-600 cursor-pointer flex items-center gap-3 px-1"
            onClick={handleLogout}
          >
            <div className=" h-5, w-5">
              <img
                className="object-cover"
                src="/icons/logout.png"
                alt="icon"
              />
            </div>
            Logout
          </div>
        </div>
      </div>
    </>
  );
}
