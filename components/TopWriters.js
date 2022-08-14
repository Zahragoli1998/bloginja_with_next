import React from "react";

const TopWriters = ({ topWriters }) => {
  console.log(topWriters);
  return (
    <div className="w-full min-h-[300px] mt-10 flex lg:flex-row-reverse flex-col items-center lg:gap-20 gap-8  ">
      <div className="relative p-6">
        <div className="w-48 h-48 bg-yellow-400 rounded-full ml-6"></div>
        <div className="w-48 h-16 absolute top-1/4 right-1/4 rounded-xl bg-black flex items-center justify-center">
          <span className="text-white font-medium text-xl">نویسندگان برتر</span>
        </div>
      </div>
      <div className="flex flex-row-reverse gap-8">
        {topWriters.map((user) => {
          return (
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center">
                <div className="w-[88px] h-[88px] bg-white rounded-full ">
                  <img
                    className="w-full h-full p-1"
                    src="/img/icons8-male-user-100.png"
                  />
                </div>
              </div>
              <span className="text-gray-600 font-medium">{user.username}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopWriters;
