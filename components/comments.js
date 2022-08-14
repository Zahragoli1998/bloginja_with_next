import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const Comments = ({ blogID, getPersianDate }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const cookies = new Cookies();
  console.log(comments);

  useEffect(() => {
    fetch(`http://localhost:4000/comment/by-blog/${blogID}`)
      .then((res) => res.json())
      .then((data) => setComments([...data]));
  }, [isAdded]);

  const addComment = () => {
    fetch("http://localhost:4000/comment/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("token")}`,
      },
      body: JSON.stringify({
        text: comment,
        blogId: blogID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "ok") {
          setIsAdded(!isAdded);
        }
      });
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center gap-4">
        {comments.map((comment) => {
          return (
            <div className=" w-[90%] min-h-[100px] border-2 shadow-lg rounded-xl flex flex-col">
              <div className="flex gap-4 items-center flex-row-reverse p-2">
                <img
                  src="/img/icons8-male-user-100.png"
                  className="w-10 h-10"
                />
                <div className="flex flex-col text-right">
                  <span className="text-sm font-medium text-gray-400">
                    {comment.user.username}
                  </span>
                  <span className="text-xs font-medium text-gray-400">
                    {getPersianDate(comment.createdAt).newDate}
                  </span>
                </div>
              </div>
              <span className="text-right px-2">{comment.text}</span>
            </div>
          );
        })}
        <div className="w-[90%] flex gap-4 flex-row-reverse">
          <input
            onChange={(e) => setComment(e.target.value)}
            placeholder={"...نظر خود  را بنویسید"}
            className="p-2 w-full border-2 rounded-xl text-right"
          />
          <button onClick={addComment} className='w-10 h-10 p-2 border-2 rounded-xl hover:bg-green-500'>+</button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
