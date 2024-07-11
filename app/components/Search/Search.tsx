import axios from "axios";
import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.get(
      `http://localhost:3000/api/search/searchProduct?q=${searchTerm}`
    );

    console.log(res);
    window.location.reload();
  };

  return (
    <div className=" relative pb-1 sm:pb-0">
      <div className="">
        <form onSubmit={handeSubmit}>
          <input
            type="text"
            id="search"
            placeholder="Search"
            className="bg-bodybg  xmd:px-4 py-1 outline-none border-[1px] border-black rounded-md"
            onChange={handleChange}
          />
        </form>
      </div>
    </div>
  );
}
