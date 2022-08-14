import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Cookies from "universal-cookie";
import Comments from "../../components/comments";
import Emojies from "../../components/Emojies";
import SigninModal from "../../components/signinModal";

const SingleBlog = ({ Blog }) => {
  const router = useRouter();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [showModal, setShowModal] = useState(false);

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

  const getRateOfBlog = (rate) => {
    fetch("http://localhost:4000/blog/submit-rate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
      body: JSON.stringify({
        blogId: Blog._id,
        score: rate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.msg === "ok") {
          router.replace(router.asPath);
        } else {
          setShowModal(true);
        }
      });
  };

  return (
    <div className="relative">
      <div className="flex flex-row-reverse gap-8 justify-end">
        <div className="flex flex-col gap-8 items-center">
          <div className="w-[38vw] h-[35vw] bg-yellow-400 rounded-l-full flex justify-end items-center">
            <div className="w-[35vw] h-full relative">
              <Image
                src={Blog.imgurl}
                layout="fill"
                className="rounded-l-full"
              />
            </div>
          </div>
          <div className=" w-full flex items-center justify-center">
            <div className=" w-[90%] flex flex-col items-center gap-8 shadow-lg rounded-xl border-2 p-2">
              <Emojies
                getRateOfBlog={getRateOfBlog}
                averageScore={Blog.averageScore}
              />
              <Comments getPersianDate={getPersianDate} blogID={Blog._id} />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-end text-right gap-4 mt-40 ml-20">
          <div className="mb-10 flex flex-col gap-2">
            <span className="text-3xl font-semibold ">{Blog.title}</span>
            <div className="text-sm text-gray-500 flex flex-row-reverse gap-2">
              <span>
                {Blog.creator.username}
                <span> :نویسنده</span>
              </span>
              <span>
                {getPersianDate(Blog.updatedAt).newDate}
                <span> :آخرین به روزرسانی </span>
              </span>
              <span>
                {Blog.averageScore}
                <span> :امتیاز</span>
              </span>
            </div>
          </div>
          <div
            className="text-right"
            dangerouslySetInnerHTML={{ __html: Blog.content }}
          />
          <div
            className="text-right"
            dangerouslySetInnerHTML={{ __html: Blog.content }}
          />
          <div
            className="text-right"
            dangerouslySetInnerHTML={{ __html: Blog.content }}
          />
          <div
            className="text-right"
            dangerouslySetInnerHTML={{ __html: Blog.content }}
          />
          <div
            className="text-right"
            dangerouslySetInnerHTML={{ __html: Blog.content }}
          />
          <div
            className="text-right"
            dangerouslySetInnerHTML={{ __html: Blog.content }}
          />
          <div
            className="text-right"
            dangerouslySetInnerHTML={{ __html: Blog.content }}
          />
          <div
            className="text-right"
            dangerouslySetInnerHTML={{ __html: Blog.content }}
          />
          <div
            className="text-right"
            dangerouslySetInnerHTML={{ __html: Blog.content }}
          />
          <div
            className="text-right"
            dangerouslySetInnerHTML={{ __html: Blog.content }}
          />
          <div
            className="text-right"
            dangerouslySetInnerHTML={{ __html: Blog.content }}
          />
        </div>
        {showModal ? <SigninModal setShowModal={setShowModal} /> : null}
      </div>
    </div>
  );
};

export default SingleBlog;

export async function getStaticProps(context) {
  const _id = context.params.singleBlog;
  const res = await fetch(`http://localhost:4000/blog/single-blog/${_id}`);
  const Blog = await res.json();

  return {
    props: {
      Blog,
    },
  };
}
export async function getStaticPaths() {
  const res = await fetch("http://localhost:4000/blog");
  const posts = await res.json();
  const ways = posts.map((post) => ({ params: { singleBlog: post._id } }));

  return {
    paths: ways,
    fallback: true,
  };
}
