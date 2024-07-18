"use client";

import { useEffect, useState } from "react";
import { paddingForPage } from "../defineSize";
import axios from "axios";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { PopupOfFailed, PopupOfSuccess } from "./subComponents/PopupCards";
import { useDispatch, useSelector } from "react-redux";
import {
  makeFailedCardVisible,
  makeSuccessCardVisible,
} from "@/redux/features/postPopupSlice";
import { RootState } from "@/redux/store";

const PostProducts = () => {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState({ currentPrice: 0, originalPrice: 0 });
  const [isFeatured, setIsFeatured] = useState(false);
  const [category, setCategory] = useState("dress");
  // const [postStatus, setPostStatus] = useState(99);
  const dispatch = useDispatch();

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

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgPreview = document.getElementById("img-preview");
    if (e.currentTarget.files) {
      setImage1(e.currentTarget.files[0]);
      const imgURL = URL.createObjectURL(e.currentTarget.files[0]);

      if (e.currentTarget.files[1]) {
        setImage2(e.currentTarget.files?.[1]);
        // const img2URL = URL.createObjectURL(e.currentTarget.files[3]);
      }
      if (e.currentTarget.files[2]) {
        setImage3(e.currentTarget.files?.[2]);
        // const img3URL = URL.createObjectURL(e.currentTarget.files[2]);
      }

      if (typeof window !== "undefined") {
        const imgPreview = document.getElementById("img-preview");
        if (imgPreview) {
          imgPreview.style.backgroundImage = `url(${imgURL})`;
        }
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

  const uploadAllData = async () => {
    if (name != "" && description != "" && price != null && image1 != null) {
      //Uploads the image selected by the user
      await axios.post(`http://localhost:4000/api/postProduct`, {
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
      });
      // setPostStatus(1);
      dispatch(makeSuccessCardVisible());
      console.log("upload all data is fired ");
    } else {
      // setPostStatus(0);
      dispatch(makeFailedCardVisible());
    }
  };

  // It checks if the form is filled and help to throw dialouge box
  const handleSubmit = async () => {
    await Promise.all([uploadAndGetImgURL()]);
    await uploadAllData();
    setPrice({ originalPrice: 0, currentPrice: 0 });
    setName("");
    setDescription("");
  };
  const postListner = useSelector(
    (state: RootState) => state.postPopupReducer.status
  );
  const postSuccessStatus = useSelector(
    (state: RootState) => state.postPopupReducer.successCard.isVisible
  );

  const postFailedCard = document.getElementById("postFailedCardContainer");
  const postSuccessCard = document.getElementById("postSuccessCardContainer");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (postSuccessStatus == true) {
        if (postSuccessCard) {
          postSuccessCard.style.display = `block`;
        }
      } else {
        if (postFailedCard) {
          postFailedCard.style.display = `block`;
        }
      }
    }
  }, [postListner]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (postFailedCard) {
        postFailedCard.style.display = `none`;
    }
    }
  };

  const makeSuccessDialougeBoxInvisible = () => {
    const postSuccessCard = document.getElementById("postSuccessCardContainer");
      }
  };

  const makeSuccessDialougeBoxInvisible = () => {
    const postSuccessCard = document.getElementById("postSuccessCardContainer");
      if (postSuccessCard) {
        postSuccessCard.style.display = `none`;
      }
    }
  }, []);

  return (
    <>
      <div className={` ${paddingForPage} mt-5vh mb-24 `}>
        {postSuccessStatus ? <PopupOfSuccess /> : <PopupOfFailed />}

        <h1 className=" text-2xl font-bold text-primaryBlue ">
          Upload Products
        </h1>

        <label htmlFor="title">
          <h1 className="mt-8 font-semibold mb-2 text-primaryBlue">
            Name of the product:
          </h1>
          <textarea
            required
            name="title"
            id="title"
            placeholder="Title here"
            className="w-95vw sm:w-35vw h-12 p-2 rounded-md border-solid border-gray-600 border-2 "
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
            className="w-95vw sm:w-35vw h-32 p-2 rounded-md border-solid border-gray-600 border-2 "
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
            className="w-95vw sm:w-35vw h-12 p-2 rounded-md border-solid border-gray-600 border-2 "
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
            className="h-8 w-95vw sm:w-35vw border-solid border-black border-2 rounded-md mb-8"
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
            className="h-8 w-95vw sm:w-35vw border-solid border-black border-2 rounded-md "
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
          className="mt-12 bg-primaryBlue rounded-md p-4 w-95vw sm:w-35vw  text-white font-bold"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default PostProducts;
