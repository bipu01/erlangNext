"use client";
import { LikeBtn } from "@/app/SVG/LikeBtn";
import CartIcon from "../../SVG/CartIcon";
import { buttonProp, buttonPropInterface } from "../../declare";
import { sizeOfLessMajorText } from "../../defineSize";
import { useDispatch, useSelector } from "react-redux";
import {
  popupSetHeading,
  popupSetMessage,
  setTime,
  toggleNotLoggedPopup,
  togglePopup,
} from "@/redux/features/popupSlice";
import { setUser, updateCart } from "@/redux/features/userSlice";
import { RootState } from "@/redux/store";
import {
  BuyButtonTransition,
  CartButtonTransition,
  CartBuyButtonTransition,
  LikeButtonTransition,
  ProductCartButtonTransition,
} from "@/app/transitionsAndAnimations/transitions";
import { toggleLoading } from "@/redux/features/postPopupSlice";

export const CartBuyNowBtn = (prop: buttonPropInterface) => {
  return (
    <button
      className={`${
        prop.primary
          ? "bg-primaryBlue text-bodybg rounded-md"
          : "bg-bodybg text-primaryBlue rounded-md"
      } absolute bottom-0 right-0 px-4 sm:px-5vw ${sizeOfLessMajorText} w-auto  max-w-15rem py-2 sm:py-3
  items-center flex gap-1 sm:gap-2 font-normal sm:font-medium tracking-wider justify-center
  whitespace-nowrap ${CartBuyButtonTransition}`}
    >
      {prop.text}
    </button>
  );
};

export const ProductBuyNowBtn = (prop: buttonPropInterface) => {
  return (
    <button
      className={`${
        prop.primary
          ? "bg-primaryBlue text-bodybg rounded-md"
          : "bg-bodybg text-primaryBlue rounded-md"
      } px-4 sm:px-5vw ${sizeOfLessMajorText}  max-w-15rem py-2 sm:py-3 w-50% sm:w-40%
  items-center flex gap-1 sm:gap-2 font-normal sm:font-medium tracking-wider justify-center
  whitespace-nowrap ${BuyButtonTransition}`}
    >
      {prop.text}
    </button>
  );
};

export const AddToCartButton = (prop: buttonPropInterface) => {
  const dispatch = useDispatch();

  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );

  const HandleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const productId = e.currentTarget.id.replace(/\baddToCart\D*/g, "");
    try {
      dispatch(toggleLoading());
      const res = await fetch("/api/user/cart/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: productId }),
      });
      // alert("Item added to cart");
      const parsedData = await res.json();
      dispatch(popupSetHeading("Added to cart"));
      dispatch(popupSetMessage(""));
      dispatch(updateCart(parsedData.itemsInCart));
      dispatch(setTime(1000));

      if (!isAuthorized) {
        dispatch(toggleLoading());
        dispatch(toggleNotLoggedPopup());
      } else {
        dispatch(toggleLoading());
        dispatch(togglePopup());
      }
    } catch (error) {
      console.log({ "Error adding to cart": error });
    }
  };
  return (
    <>
      <button
        id={`addToCart` + prop._id}
        className={`${
          prop.primary
            ? "bg-primaryBlue text-bodybg rounded-md px-5vw sm:px-4 lg:px-5  w-full sm:w-auto"
            : "bg-bodybg text-primaryBlue rounded-md py-1 sm:py-3 px-10vw sm:px-4vw w-45vw sm:w-auto"
        } ${sizeOfLessMajorText} ${
          prop.custom
        } py-1 sm:py-2 items-center flex gap-1 sm:gap-2 font-medium tracking-wider justify-center
        ${CartButtonTransition}
        whitespace-nowrap shadow-md`}
        onClick={HandleAddToCart}
      >
        {prop.text}
      </button>
    </>
  );
};

export const ProductAddToCartButton = (prop: buttonPropInterface) => {
  const dispatch = useDispatch();

  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );

  const HandleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const productId = e.currentTarget.id.replace(/\baddToCart\D*/g, "");

    try {
      dispatch(toggleLoading());
      const res = await fetch("/api/user/cart/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: productId }),
      });

      // alert("Item added to cart");
      const parsedData = await res.json();
      dispatch(popupSetHeading("Added to cart"));
      dispatch(popupSetMessage(""));
      dispatch(updateCart(parsedData.itemsInCart));
      dispatch(setTime(1000));

      if (!isAuthorized) {
        dispatch(toggleLoading());
        dispatch(toggleNotLoggedPopup());
      } else {
        dispatch(toggleLoading());
        dispatch(togglePopup());
      }
    } catch (error) {
      console.log({ "Error adding to cart": error });
    }
  };
  return (
    <>
      <button
        id={`addToCart` + prop._id}
        className={`${
          prop.primary
            ? "bg-primaryBlue text-bodybg rounded-md px-5vw sm:px-4 lg:px-5  "
            : "bg-bodybg text-primaryBlue rounded-md py-1 sm:py-3 px-10vw sm:px-4vw  "
        } ${sizeOfLessMajorText} ${
          prop.custom
        }  py-2 sm:py-3 w-50% sm:w-40% items-center flex gap-1 sm:gap-2 font-medium tracking-wider justify-center
        ${ProductCartButtonTransition}
        whitespace-nowrap`}
        onClick={HandleAddToCart}
      >
        {prop.text}
      </button>
    </>
  );
};

export const OptionsPanelBtn = (prop: buttonProp) => {
  if (prop.active) {
    return (
      <>
        <button className="bg-primaryBlue text-bodybg py-1 px-4 xmd:px-8  rounded-sm">
          {prop.text}
        </button>
      </>
    );
  }
  return (
    <>
      <button className=" bg-bgLightBlue text-primaryBlue py-1 px-2 xmd:px-8 rounded-sm">
        {prop.text}
      </button>
    </>
  );
};

export const LikeButton = (prop: buttonPropInterface) => {
  const dispatch = useDispatch();

  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );

  const handleAddToLiked = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const productId = e.currentTarget.id.replace(/\like\D*/g, "");
    // console.log("add to liked clicked");
    try {
      dispatch(toggleLoading());
      const res = await fetch(
        `/api/user/liked/addToLiked?productId=${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // const data = await res.json();
      dispatch(popupSetHeading("Added to Liked"));
      dispatch(popupSetMessage(""));
      dispatch(setTime(1000));
      if (!isAuthorized) {
        dispatch(toggleLoading());
        dispatch(toggleNotLoggedPopup());
      } else {
        dispatch(toggleLoading());
        dispatch(togglePopup());
      }
    } catch (error) {
      console.log({ "Error adding to liked": error });
    }
  };

  return (
    <>
      <button
        id={`like` + prop._id}
        className={`${LikeButtonTransition}`}
        onClick={handleAddToLiked}
      >
        <LikeBtn fillColor={prop.fillColor} custom={prop.custom} />
      </button>
    </>
  );
};
