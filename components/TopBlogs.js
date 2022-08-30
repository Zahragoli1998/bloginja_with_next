import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

const TopBlogs = ({ blogs, navigateToSingleBlog }) => {
	const router = useRouter()
  return (
    <div className="flex items-center gap-8">
      <div className="2xl:hidden text-right text-xl font-semibold pr-4">
        <span>
          مقاله های <span className="text-yellow-400">برتر</span>
        </span>
        <div></div>
        <div></div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 ">
        {blogs.map((item) => {
          return (
            <div
              className="w-64 h-40 relative rounded-xl bg-yellow-400 cursor-pointer hover:shadow-2xl hover:mb-5"
              onClick={() => navigateToSingleBlog(item._id)}
            >
              <Image
                src={item.imgurl}
                alt={item.title}
                layout="fill"
                className="rounded-xl "
              />
            </div>
          );
        })}
      </div>
      <div
        className="flex items-center cursor-pointer gap-2"
				onClick={()=>{
					router.replace('/AllBlogs')
				}}
      >
        <span>بیشتر</span>
        <img className="w-6 h-6" src="/img/icons8-arrow-48.png" />
      </div>
    </div>
  );
};

export default TopBlogs;
