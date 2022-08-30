import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import TopBlogs from "./TopBlogs";
import TopWriters from "./TopWriters";

const HomePage = ({ blogs, topBlogs, topWriters }) => {
  const [currentIndex, setcurrentIndex] = useState(0);
  const router = useRouter();

  const addCurrentIndex = () => {
    if (currentIndex == blogs.length - 1) {
      setcurrentIndex(0);
    } else {
      setcurrentIndex((e) => e + 1);
    }
  };

  const navigateToSingleBlog = (id) => {
    router.replace({
      pathname: "/[sibgleBlog]",
      query: { sibgleBlog: id },
    });
  };
  return (
    <div className="">
      <div className="w-full bg-black lg:h-[32vw] h-[300px] flex items-center gap-8 justify-center text-white">
        <div className="hidden lg:block text-right w-[25vw]">
          <p className="text-3xl mb-5">{blogs[currentIndex].title}</p>
          <div
            className="text-right"
            dangerouslySetInnerHTML={{
              __html: blogs[currentIndex].content.substr(0, 100),
            }}
          />
        </div>
        <div className="flex items-center self-start lg:gap-20 gap-12 px-4">
          <div className="lg:w-[35vw] lg:h-[26vw] w-[350px] h-[250px] border-x-2 border-b-2 border-yellow-400 rounded-b-3xl ">
            <div
              className="lg:w-[35vw] lg:h-[24vw] w-[350px] h-[230px] bg-yellow-100  lg:translate-x-[2vw] translate-x-[20px] rounded-b-3xl cursor-pointer relative"
              onClick={() => navigateToSingleBlog(blogs[currentIndex]._id)}
            >
              <Image
                src={blogs[currentIndex].imgurl}
                alt={blogs[currentIndex].title}
                layout="fill"
                className="rounded-b-3xl"
              />
							<div className="z-50 absolute bottom-0 p-2 w-full lg:hidden text-right">
								<span className="text-white">
								{blogs[currentIndex].title}
								</span>
							</div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <div className="w-[15vw] h-[10vw] rounded-xl bg-yellow-300 relative hidden lg:block">
              <Image
                src={
                  blogs[currentIndex == blogs.length - 1 ? 0 : currentIndex + 1]
                    .imgurl
                }
                alt={
                  blogs[currentIndex == blogs.length - 1 ? 0 : currentIndex + 1]
                    .title
                }
                layout="fill"
                className="rounded-xl "
              />
              <div className="w-full h-full rounded-xl bg-black/50 absolute top-0 "></div>
            </div>
            <div
              className="flex items-center cursor-pointer gap-2"
              onClick={addCurrentIndex}
            >
              <span>بعدی</span>
              <img className="w-6 h-6" src="/img/icons8-arrow-64.png" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex  my-10 gap-8 items-center justify-center ">
        <div className="relative p-6 hidden 2xl:block">
          <div className="w-48 h-48 bg-black rounded-xl ml-6 flex items-center">
            <div className="ml-5 flex text-2xl font-medium gap-1 text-white">
              <p className="">برتر </p>
              <p>مقاله های</p>
            </div>
          </div>
          <div className="w-48 h-48 border-[3px] border-yellow-500 absolute top-0 rounded-xl"></div>
        </div>
        <TopBlogs blogs={blogs} navigateToSingleBlog={navigateToSingleBlog}/>
      </div>
      <TopWriters topWriters={topWriters} />
    </div>
  );
};

export default HomePage;
