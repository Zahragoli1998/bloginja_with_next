
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";



const SideBar = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [myBlogs, setMyBlogs] = useState([]);
  console.log(myBlogs);
  const [user, setUser] = useState("");
  const [urls, setUrls] = useState([
    {
      title: "مقاله های من",
      url: "/dashboard",
      isSelected: true,
    },
    {
      title: "نوشتن مقاله",
      url: "/dashboard/writeBlog",
      isSelected: false,
    },
    {
      title: "ادیت",
      url: "/dashboard/Edit",
      isSelected: false,
    },
    {
      title: "خروج",
      url: "",
      isSelected: false,
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:4000/user/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
    fetch("http://localhost:4000/blog/my-blogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMyBlogs(data));
  }, []);

  return (
    <div className="flex flex-row-reverse h-screen">
      <div className=" w-72 h-full ">
        <div className="w-full flex flex-col items-center relative">
          <div className="w-full bg-yellow-400 h-40 rounded-b-xl"></div>
          <div className="w-28 h-28 rounded-full bg-white shadow-lg absolute -bottom-1/4"></div>
          <div className="absolute -bottom-1/2">
            <span>{user.username}</span>
            <span></span>
          </div>
        </div>
        <div className="mt-32 flex flex-col gap-4 items-center">
          {urls.map((url, i) => {
            return (
              <div
                className={`p-1 px-3 rounded-lg cursor-pointer ${
                  url.isSelected ? "bg-yellow-400 text-white" : null
                }`}
                onClick={() => {
                  const newarr = [...urls];
                  newarr.map((url) => {
                    url.isSelected = false;
                  });
                  newarr[i].isSelected = true;
                  setUrls([...newarr]);
                }}
              >
                <Link href={url.url}><p className="">{url.title}</p></Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
