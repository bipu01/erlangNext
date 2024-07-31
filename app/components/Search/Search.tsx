"use client";
import axios from "axios";
import React, { useState } from "react";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `api/search/getSearchProduct?q=${searchTerm}`
      );

      sessionStorage.setItem("searchedProducts", JSON.stringify(res.data));
      if (typeof window !== "undefined") {
        window.location.href = "/searchedProducts";
      }
      console.log(res.data);
    } catch (error) {
      sessionStorage.setItem("searchedProducts", "");
      console.log(error);
      window.location.href = "/searchedProducts";
    }
  };

  return (
    <div className=" relative pb-1 sm:pb-0">
      <form onSubmit={handeSubmit}>
        <input
          type="text"
          id="search"
          placeholder="Search"
          className="bg-bodybg w-35vw h-8 text-xs sm:w-auto sm:h-auto sm:text-sm px-1  xmd:px-4 py-1 outline-none border-[1px] border-black rounded-md"
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
