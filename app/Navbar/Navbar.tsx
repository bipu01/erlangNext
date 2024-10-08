"use client";
import Link from "next/link";
import Hamburger from "../components/Hamburger/Hamburger";
import { LikeBtn } from "../SVG/LikeBtn";

import CartIcon from "../SVG/CartIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import Search from "../components/Search/Search";
import { product } from "../store/type";
import { NavLikedIconTransition } from "../transitionsAndAnimations/transitions";

const Navbar = () => {
    const [name, setName] = useState("");
    const [cartNum, setCartNum] = useState(Number);

    const uName = useSelector((state: RootState) => state.user.name);
    const isAuthorized = useSelector((state: RootState) => state.user.isAuthorized);

    const itemsInCart: Array<product> = useSelector((state: RootState) => state.user.itemsInCart);

    useEffect(() => {
        if (uName) {
            setName(uName.slice(0, 2));
        }
        if (itemsInCart) {
            setCartNum(itemsInCart.length);
        }
    }, [itemsInCart]);

    return (
        <div className=" sticky top-0 z-50 ">
            <div className="  flex sm:justify-between items-center pt-1 px-2 sm:px-5 md:px-10 bg-bodybg ">
                <div className=" flex gap-2 xmd:gap-10 items-center">
                    <Link href={"/"}>
                        <div className=" h-12 sm:h-16 aspect-square">
                            <img
                                className=" h-full w-full object-cover"
                                src="./assets/logo.svg"
                                alt=""
                            />
                        </div>
                    </Link>
                    <div className="">
                        <Search />
                    </div>
                </div>
                {/* navlinks */}
                <div className=" flex gap-5 2xl:gap-6  items-center ml-auto">
                    <div className="hidden sm:flex gap-4 text-sm font-medium sm:text-base 2xl:text-xl xmd:gap-10 sm:font-normal items-center ">
                        <div className="">
                            <Link href="/">Home</Link>
                        </div>
                        <div className="">
                            <Link href="/cart">
                                <div className="flex gap-1 items-center group transition-all delay-100 duration-200">
                                    <p>Cart</p>
                                    <div className={` relative ${NavLikedIconTransition}`}>
                                        <CartIcon borderThickness={2.7} width={23} height={20} />
                                        <span className="absolute bg-darkRed rounded-full h-3 aspect-square xmd:text-[10px] text-white flex items-center justify-center -top-2  -right-2 text-xs xmd:text-md xmd:h-5 sm:-top-3 sm:-right-2 xmd:-right-3 ">
                                            {cartNum && cartNum}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="">
                            <Link href="/liked">
                                <div
                                    className={`flex gap-1 items-center group transition-all duration-200  `}
                                >
                                    <p className=" "> Liked</p>
                                    <div className={`relative ${NavLikedIconTransition} `}>
                                        <LikeBtn
                                            borderThickness={1.5}
                                            width={23}
                                            height={20}
                                            fillColor="#1C244B"
                                        />
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className={`relative  `}>
                            <Link
                                href="/profile"
                                className={`${
                                    isAuthorized
                                        ? "p-3 before:content-[''] before:absolute before:-left-3 before:-top-2 before:bg-blue-300 before:h-10 before:w-10 before:rounded-full before:z-0 "
                                        : ""
                                }
                                `}
                            >
                                {isAuthorized ? (
                                    name ? (
                                        <div className="absolute z-20">{name}</div>
                                    ) : (
                                        ""
                                    )
                                ) : (
                                    <img
                                        className="h-7 aspect-square sm:h-6 xmd:h-9"
                                        src="./assets/userr.svg"
                                        alt=""
                                    />
                                )}
                            </Link>
                        </div>
                    </div>
                    {/* icons of links to show in mobile screen */}
                    <div className="block sm:hidden relative">
                        <Link href="/cart">
                            {/* <img className="w-5 aspect-auto" src="./assets/cart.svg" alt="" /> */}
                            <CartIcon borderThickness={2.5} width={25} height={22} />
                            <span className="absolute py-2 bg-darkRed text-white rounded-full h-3 aspect-square text-[10px]  flex items-center  justify-center -top-2  -right-2 sm:text-lg sm:h-5 sm:-top-3 sm:-right-3 ">
                                {cartNum && cartNum}
                            </span>
                        </Link>
                    </div>
                    <div className=" pl-2 sm:hidden relative">
                        <Link
                            href="/profile"
                            className={`${
                                isAuthorized
                                    ? "p-3 before:content-[''] before:absolute before:-left-0.5 before:-top-1.5 before:bg-blue-300 before:h-8 before:w-8 before:rounded-full before:z-0 "
                                    : ""
                            }
           `}
                        >
                            {isAuthorized ? (
                                name ? (
                                    <div className="absolute z-20 text-sm">{name}</div>
                                ) : (
                                    ""
                                )
                            ) : (
                                <img
                                    className="h-7 aspect-square sm:h-6 xmd:h-9"
                                    src="./assets/userr.svg"
                                    alt=""
                                />
                            )}
                        </Link>
                    </div>

                    <div className=" ">
                        <Hamburger />
                    </div>
                </div>
            </div>
            <div className=" flex justify-center">
                <div className=" bg-black opacity-15 w-[95%] h-[1px] sm:h-[2px] rounded-md -z-10 "></div>
            </div>
        </div>
    );
};

export default Navbar;
