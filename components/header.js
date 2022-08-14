import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Profile from "./profile";

const Header = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
	const [isSelected,setIsSelected] =useState(false)


  return (
    <div className="z-[100] h-16 flex justify-center items-center relative font-semibold">
      <div className="w-full h-full bg-white flex justify-between items-center px-6 shadow-md shadow-black/20 absolute top-0">
        <div className="flex  items-center h-[2vw] gap-2 relative">
          <button className="bg-yellow-400 rounded-3xl px-6 py-1 flex items-center shadow-lg shadow-yellow-500/50">
            <Link href={"/login"}>
              <p className="text-xl">ورود</p>
            </Link>
          </button>
          <div className="flex gap-4" >
            <img
              src={"/img/icons8-search-64.png"}
              className="w-6 h-6 cursor-pointer"
							onClick={()=>setIsSelected(!isSelected)}
            />
						{
							isSelected ? <input className="outline-none px-2 transition-all duration-700" placeholder="جستجو..." /> : null
						}
            
          </div>

          <Link href={"/"}>
            <img
              src={"/img/icons8-home-64.png"}
              className="w-7 h-7 cursor-pointer"
            />
          </Link>
          {token ? <Profile /> : null}
        </div>
        <div className=" flex text-3xl">
          <p>بلاگین<span className="text-yellow-400">جا</span></p>
        </div>
      </div>
    </div>
  );
};

export default Header;
