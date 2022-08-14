import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import DashboardLayout from "../../components/dashboardLayout";

const Dashboard = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const router = useRouter();
  const [myBlogs, setMyBlogs] = useState([]);

  const getPersianDate = (date) => {
    const newDate = new Date(date);
    return {
      newDate: newDate.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
    };
  };


  useEffect(() => {
    fetch("http://localhost:4000/blog/my-blogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const newarr = [...data];
        newarr.map((item) => {
          item.isSelected = false;
        });
        setMyBlogs([...newarr]);
      });
  }, []);

  return (
    <DashboardLayout>
      <div className="w-full flex justify-center flex-wrap gap-4 mt-10">
        {myBlogs.map((blog, i) => {
          return (
            <div
              className="w-[300px] h-[350px] shadow-lg rounded-xl relative"
              onMouseEnter={() => {
                const newarr = [...myBlogs];
                newarr[i].isSelected = true;
                setMyBlogs([...newarr]);
              }}
              onMouseLeave={() => {
                const newarr = [...myBlogs];
                newarr.map((item) => {
                  item.isSelected = false;
                });

                setMyBlogs([...newarr]);
              }}
            >
              <div className="w-full h-full cursor-pointer">
                <div className="w-[300px] h-[200px] relative rounded-xl">
                  <Image
                    src={blog.imgurl}
                    alt={blog.title}
                    layout="fill"
                    className="rounded-xl"
                  />
                </div>
                <div className="flex flex-col text-right gap-1 mr-3 mt-3 text-sm text-gray-500">
                  <span className="font-semibold text-black">{blog.title}</span>
                  <span>
                    {blog.averageScore}
                    <span> :امتیاز</span>
                  </span>
                  <span>
                    {getPersianDate(blog.createdAt).newDate}
                    <span> ایجاد شده در</span>
                  </span>
                  <span>
                    {getPersianDate(blog.updatedAt).newDate}
                    <span> :آخرین بروزرسانی</span>
                  </span>
                </div>
              </div>
              {blog.isSelected ? (
                <div className="w-full h-full bg-black/50 absolute top-0 rounded-xl text-white font-semibold flex flex-col items-center justify-center gap-2">
                  <button className="border-2 p-1 w-[100px] rounded-lg hover:bg-yellow-400 hover:border-yellow-400">
                    ویرایش
                  </button>
                  <button
                    className="border-2 p-1 w-[100px] rounded-lg hover:bg-yellow-400 hover:border-yellow-400"
                    onClick={() =>
                      router.replace({
                        pathname: "/[sibgleBlog]",
                        query: { sibgleBlog: blog._id },
                      })
                    }
                  >
                    بیشتر
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
