"use client";

import { useEffect, useState } from "react";
import ScrollToTop from "../../Functions/ScrollToTop/ScrollToTop";
import Star from "../../SVG/Star";
import {
  LikeButton,
  ProductAddToCartButton,
  ProductBuyNowBtn,
} from "../../components/Buttons/Buttons";
import { paddingForPage, priceTextSizeInPreviewPage } from "../../defineSize";
import { product } from "../../store/type";
import BackArrow from "../../SVG/BackArrow";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Popup from "@/app/components/Popups/Popup";
import NotLoggedPopup from "@/app/components/Popups/NotLoggedPopup";
import { setUser } from "@/redux/features/userSlice";

const fetchProductFromDb = async (productId: string) => {
  try {
    const res = await fetch(`/api/products/get?productId=${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await res.json();
    // console.log({ resFrombackend: body });
    return body;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const ProductPage = () => {
  const [openedProduct, setOpenedProduct] = useState<product | null>(null);
  const popup = useSelector((state: RootState) => state.popupSlice.popup);
  const heading = useSelector((state: RootState) => state.popupSlice.heading);
  const message = useSelector((state: RootState) => state.popupSlice.message);

  const notLoggedPopup = useSelector(
    (state: RootState) => state.popupSlice.notLoggedPopup
  );

  const [lastVisitedPage, setLastVisitedPage] = useState<string | null>(null);

  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );
  const { productId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        const id = Array.isArray(productId) ? productId[0] : productId;
        const data = await fetchProductFromDb(id);
        setOpenedProduct(data);
      }
    };
    fetchData();
    printPreviewPage();

    const lastVisitedPageString = sessionStorage.getItem("lastVisitedPage");
    if (lastVisitedPageString) {
      try {
        setLastVisitedPage(lastVisitedPageString);
      } catch (e) {
        console.error("Failed to parse lastVisitedPage from sessionStorage", e);
      }
    }

    const getUser = async () => {
      const res = await fetch("/api/user/info");
      const parsedRes = await res.json();
      const user = parsedRes.message;
      dispatch(setUser(user));
    };
    getUser();
  }, []);

  if (!productId) {
    console.log("No product found");
    return <div>No product found</div>;
  }

  const printPreviewPage = () => {
    if (openedProduct) {
      return (
        <div
          className={`relative bg-bgLightBlue min-h-95vh py-4 sm:py-16 sm:pt-16 ${paddingForPage}`}
        >
          {popup && isAuthorized && (
            <Popup heading={heading} message={message} />
          )}
          {notLoggedPopup && !isAuthorized && <NotLoggedPopup />}
          <ScrollToTop />
          <Link href={`${lastVisitedPage}`}>
            <div className="absolute left-6 top-8 sm:left-8 sm:top-4 z-40 hover:cursor-pointer before:content-[''] before:absolute before:h-12 before:w-12 before:rounded-full before:bg-white before:blur-xl before:-z-10 before:-left-2 before:-top-2 ">
              <BackArrow height={32} width={32} borderThickness={3} />
            </div>
          </Link>
          <div className=" grid sm:grid-rows-2 sm:grid-cols-5">
            <div className="relative sm:col-span-2 h-50vh min-w-15rem lg:h-70vh p-1 bg-bodybg rounded-sm shadow-customDown">
              <img
                src={openedProduct.img1}
                alt="productImage"
                className="w-100% h-100% object-cover rounded-sm"
              />

              {/* likeBtn */}
              <div className="h-8 w-8 absolute sm:hidden bottom-5 right-5">
                {/* <LikeButton /> */}
                <LikeButton
                  _id={openedProduct._id}
                  fillColor="white"
                  custom="w-8 h-8 sm:w-6 sm:h-6 "
                />
              </div>
            </div>

            <div className=" sm:col-span-3 pt-5 sm:pt-0 sm:pl-8 flex flex-col justify-between gap-6 sm:gap-0">
              <div className=" space-y-5% mb-5% sm:mb-10%">
                <div>
                  <h3
                    className={`relative font-medium sm:font-semibold z-20 whitespace-normal text-lg sm:text-2xl lg:text-2xl 2xl:text-4xl `}
                  >
                    {openedProduct.name || `Heading Loading...`}
                  </h3>
                </div>
                <div className=" text-xs sm:text-base">
                  <p className={` font-medium opacity-70 line-clamp-5`}>
                    {openedProduct.desc || `Description loading....`}
                  </p>
                </div>
                <div
                  id="rating"
                  className="hidden sm:flex gap-4 items-baseline "
                >
                  <div className="flex gap-2">
                    <Star custom="h-5 w-5 sm:h-7 sm:w-7 2xl:h-8  2xl:w-8" />
                    <Star custom="h-5 w-5 sm:h-7 sm:w-7 2xl:h-8  2xl:w-8" />
                    <Star custom="h-5 w-5 sm:h-7 sm:w-7 2xl:h-8  2xl:w-8" />
                    <Star custom="h-5 w-5 sm:h-7 sm:w-7 2xl:h-8  2xl:w-8" />
                    <Star
                      custom="h-5 w-5 sm:h-7 sm:w-7 2xl:h-8  2xl:w-8"
                      fillColor="#D9DFED"
                    />
                  </div>
                  <h3 className={` text-sm sm:text-2xl 2xl:text-2xl`}>
                    {openedProduct.ratingRate}
                  </h3>
                </div>
              </div>

              <div className="w-100%  space-y-6 sm:space-y-8">
                <div className="flex items-center gap-2">
                  <h3
                    className={`${priceTextSizeInPreviewPage} line-through opacity-70`}
                  >
                    {"NPR. " + openedProduct.priceOriginal}
                  </h3>
                  <h3 className={`${priceTextSizeInPreviewPage}`}>
                    NPR. {openedProduct.priceCurrent || `Price Loading...`}
                  </h3>
                </div>

                {/* <div className=" bg-black opacity-20 h-0.5 w-100% mb-2"></div> */}
                <div className="flex justify-between  items-center">
                  <div className="items-center gap-2 hidden sm:block h-10 w-10 3xl:h-12 3xl:w-12 hover:cursor-pointer">
                    {/* <LikeBtn fillColor="#D9DFED" borderThickness={1} /> */}
                    <LikeButton
                      _id={openedProduct._id}
                      custom="w-5 h-5 sm:w-6 sm:h-6"
                    />
                  </div>
                  <ProductBuyNowBtn
                    darkBg={true}
                    text="Buy now"
                    primary={true}
                  />
                  <ProductAddToCartButton
                    _id={openedProduct._id}
                    darkBg={false}
                    text="Add to cart"
                    primary={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  return printPreviewPage();
};

export default ProductPage;
