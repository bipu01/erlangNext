// import config from "@/app/config/config";
import { storage } from "@/app/firebase";
import {
  popupSetHeading,
  popupSetMessage,
  setTime,
  togglePopup,
} from "@/redux/features/popupSlice";
import {
  makeFailedCardVisible,
  toggleLoading,
} from "@/redux/features/postPopupSlice";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";

const FormLayout = () => {
  const [price, setPrice] = useState({ currentPrice: 0, originalPrice: 0 });
  const [isFeatured, setIsFeatured] = useState(false);
  const [category, setCategory] = useState("dress");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image1, setImage1] = useState<File>();
  const [image2, setImage2] = useState<File>();
  const [image3, setImage3] = useState<File>();

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setName(e.currentTarget.value);
  };
  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice({
      currentPrice: parseInt(e.currentTarget.value),
      originalPrice: parseInt(e.currentTarget.value),
    });
  };
  const dispatch = useDispatch();

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof window !== "undefined") {
      if (e.currentTarget.files) {
        setImage1(e.currentTarget.files[0]);
        const imgURL = URL.createObjectURL(e.currentTarget.files[0]);

        if (e.currentTarget.files[1]) {
          setImage2(e.currentTarget.files?.[1]);
        }
        if (e.currentTarget.files[2]) {
          setImage3(e.currentTarget.files?.[2]);
        }
        // if (typeof window !== "undefined") {
        const imgPreview = document.getElementById("img-preview");
        if (imgPreview) {
          imgPreview.style.backgroundImage = `url(${imgURL})`;
        }
        // }
      }
    }
  };

  let imgURL1: string;
  let imgURL2: string;
  let imgURL3: string;

  const uploadAndGetImgURL = async () => {
    if (image1 == null) return;

    const img1Ref = ref(storage, `/products/dress/${image1.name + v4()}`);
    const img2Ref = ref(storage, `/products/dress/${image2?.name + v4()}`);
    const img3Ref = ref(storage, `/products/dress/${image3?.name + v4()}`);
    try {
      if (image1) {
        await uploadBytes(img1Ref, image1);
        const product1ImgUrl = await getDownloadURL(img1Ref);
        imgURL1 = product1ImgUrl;
      }
      if (image2) {
        await uploadBytes(img2Ref, image2);
        const product2ImgUrl = await getDownloadURL(img2Ref);
        imgURL2 = product2ImgUrl;
      }
      if (image3) {
        await uploadBytes(img3Ref, image3);
        const product3ImgUrl = await getDownloadURL(img3Ref);
        imgURL3 = product3ImgUrl;
      }
      // setUploadedImgUrl(productImgUrl);
    } catch (error) {
      alert(error);
    }
  };

  // It checks if the form is filled and help to throw dialouge box
  const handleSubmit = async () => {
    dispatch(toggleLoading());
    await Promise.all([uploadAndGetImgURL()]);
    await uploadAllData();
    setPrice({ originalPrice: 0, currentPrice: 0 });
    setName("");
    setDescription("");
  };

  const uploadAllData = async () => {
    if (
      name !== "" &&
      description !== "" &&
      price !== null &&
      image1 !== null
    ) {
      //Uploads the image selected by the user
      const res = await fetch(`/api/postProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
          currentPrice: price.currentPrice,
          originalPrice: price.originalPrice,
          img1: imgURL1 ?? "img1",
          img2: imgURL2 ?? "img2",
          img3: imgURL3 ?? "img3",
          ratingRate: 0,
          ratingCount: 0,
          category: category,
          isFeatured: isFeatured,
        }),
      });
      // const response = await res.json();
      switch (res.status) {
        case 200:
          dispatch(toggleLoading());
          dispatch(popupSetHeading("Product successfully saved"));
          dispatch(popupSetMessage(""));
          dispatch(setTime(1700));
          dispatch(togglePopup());
          return;
        case 402:
          dispatch(toggleLoading());
          dispatch(popupSetHeading("You are not allowed to post"));
          dispatch(popupSetMessage(""));
          dispatch(setTime(3000));
          dispatch(togglePopup());
          return;
        case 501:
          dispatch(toggleLoading());
          dispatch(popupSetHeading("Error saving product"));
          dispatch(popupSetMessage(""));
          dispatch(setTime(3000));
          dispatch(togglePopup());
          return;
        case 500:
          dispatch(toggleLoading());
          dispatch(popupSetHeading("Trouble connecting to db"));
          dispatch(popupSetMessage(""));
          dispatch(setTime(3000));
          dispatch(togglePopup());
          return;
      }
    } else {
      dispatch(makeFailedCardVisible());
    }
  };
  return (
    <>
      <label htmlFor="title">
        <h1 className="mt-8 font-semibold mb-2 text-primaryBlue">
          Name of the product:
        </h1>
        <textarea
          required
          name="title"
          id="title"
          placeholder="Title here"
          className="w-95vw sm:w-35vw h-12 p-2 rounded-md border-solid border-gray-600 border-2 bg-bodybg"
          onChange={handleTitleChange}
        ></textarea>
      </label>

      <label htmlFor="des">
        <h1 className="mt-8 font-semibold mb-2 text-primaryBlue">
          Description the post:
        </h1>
        <textarea
          required
          name="desc"
          id="desc"
          placeholder="Description here"
          className="w-95vw sm:w-35vw h-32 p-2 rounded-md border-solid border-gray-600 border-2 bg-bodybg"
          onChange={handleDescChange}
        ></textarea>
      </label>

      <label htmlFor="price">
        <h1 className="mt-8 font-semibold mb-2 text-primaryBlue">
          Price of the product:
        </h1>
        <input
          required
          type="number"
          id="price"
          placeholder="Price here"
          className="w-95vw sm:w-35vw h-12 p-2 rounded-md border-solid border-gray-600 border-2 bg-bodybg"
          onChange={handlePriceChange}
        />
      </label>

      <label htmlFor="imgUpload" className="w-95vw sm:w-35vw  ">
        <h1 className="mt-8 font-semibold mb-2 text-primaryBlue">
          Drag and drop or click for the image:
        </h1>
        <input
          required
          type="file"
          id="imgUpload"
          placeholder="Drag and drop or click for the image"
          className="hidden w-95vw sm:w-35vw h-32 "
          accept="image"
          onChange={handleImgChange}
        />
        <div
          id="img-preview"
          className=" bg-cover w-95vw sm:w-35vw h-32 p-2 rounded-md border-solid border-gray-600 border-2 hover:cursor-pointer text-primaryBlue"
        >
          Click here to add image
        </div>
      </label>
      <div className="mt-8 gap-4 items-center">
        <h1 className=" font-semibold mb-4 text-primaryBlue">Category:</h1>
        <select
          name="categoy"
          id="category"
          className="h-8 w-95vw sm:w-35vw border-solid border-black border-2 rounded-md mb-8 bg-bodybg"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setCategory(e.currentTarget.value);
          }}
        >
          <option value="dress">Dress</option>
          <option value="jewellery">Jewellery</option>
          <option value="footwear">Footwear</option>
        </select>
      </div>
      <div>
        <h1 className=" font-semibold mb-4 text-primaryBlue">Is Featured:</h1>
        <select
          name="isFeatured"
          id="isFeatured"
          className="h-8 w-95vw sm:w-35vw border-solid border-black border-2 rounded-md bg-bodybg"
          onChange={() => {
            setIsFeatured(!isFeatured);
          }}
        >
          <option value={0}>False</option>
          <option value={1}>true</option>
        </select>
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="my-12 bg-primaryBlue rounded-md p-4 w-95vw sm:w-35vw  text-white font-bold"
      >
        Submit
      </button>
    </>
  );
};

export default FormLayout;
