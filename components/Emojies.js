import React, { useState } from "react";

const Emojies = ({ getRateOfBlog,averageScore }) => {
	const [rate,setRate] = useState(averageScore)
  const [emojies, setEmojies] = useState([
    {
      title: "عالی",
      rate: 5,
      imgUrl: "/img/icons8-star-struck-96.png",
      isSelcted: true,
    },
    {
      title: "خوب",
      rate: 4,
      imgUrl: "/img/icons8-smiling-face-with-heart-eyes-96.png",
      isSelcted: false,
    },
    {
      title: "متوسط",
      rate: 3,
      imgUrl: "/img/icons8-pleading-face-96.png",
      isSelcted: false,
    },
    {
      title: "بد",
      rate: 2,
      imgUrl: "/img/icons8-disappointed-face-96.png",
      isSelcted: false,
    },
    {
      title: "خیلی بد",
      rate: 1,
      imgUrl: "/img/icons8-crying-face-96.png",
      isSelcted: false,
    },
  ]);
  return (
    <div className="flex flex-row-reverse items-center gap-2">
      {emojies.map((emoji, i) => {
        return (
          <div
            className={`flex flex-col items-center pb-1${
              emoji.isSelcted ? " border-b-2 border-black mb-3" : null
            }`}
            onClick={() => {
              const newarr = [...emojies];
              newarr.map((item) => {
                item.isSelcted = false;
              });
              newarr[i].isSelcted = true;
              setEmojies([...newarr]);
							setRate(emoji.rate)
            }}
          >
            <img className="w-12 h-12" src={emoji.imgUrl} />
            <span className="text-xs font-semibold">{emoji.title}</span>
          </div>
        );
      })}
      <button className="bg-green-500 p-1 px-4 font-semibold rounded-lg mr-5 hover:shadow-xl"
			onClick={()=>{
				getRateOfBlog(rate)
			}}>
        ثبت
      </button>
    </div>
  );
};

export default Emojies;
