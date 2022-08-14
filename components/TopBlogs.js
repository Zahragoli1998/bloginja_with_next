import Image from "next/image";
import React, { useState } from "react";

const TopBlogs = ({ blogs,navigateToSingleBlog }) => {
  return (
    <div className="flex flex-col gap-8">
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
            <div className="w-64 h-40 relative rounded-xl bg-yellow-400 cursor-pointer hover:shadow-2xl hover:mb-5" onClick={()=>navigateToSingleBlog(item._id)}>
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
    </div>
  );
};

export default TopBlogs;
