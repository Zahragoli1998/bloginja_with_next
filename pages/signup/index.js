import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useRouter } from 'next/router'
import Image from "next/image";
import { useAppContext } from "../../context/state";

const Signup = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const cookies = new Cookies();
  const router = useRouter();
	const { isEdited,setIsEdited } = useAppContext();
  


  const register = () => {
    try {
      fetch("http://localhost:4000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          name: name,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            cookies.set("token", data.token);
						setIsEdited(!isEdited)
            router.replace("/");
          }
        });
    } catch (error) {
      console.log(error);
    }

    // const data = res.json().then((ut) => {
    //   if (ut.token) {
    //     console.log("token hast");
    //     cookies.set("token", ut.token);
    //     router.replace("/");
    //   }
    // });
  };

  return (
		<div className="w-screen h-screen bg-yellow-100 absolute top-0 flex items-center">
      <Image src={"/img/mona-eendra-vC8wj_Kphak-unsplash.jpg"} layout="fill" />
      <div className="w-[25vw] h-[35vw] bg-white/40 z-[100] ml-40 mt-10 rounded-xl shadow-xl flex flex-col items-center justify-around">
        <span className="text-4xl font-semibold">
          {" "}
          خوش <span className="text-yellow-500">آمدید</span>
        </span>
        <div className="w-[80%] flex flex-col gap-2">
          <label className="text-lg font-semibold text-right" for={"name"}>
            نام
          </label>
          <input
            id="name"
            className="border-2 text-right rounded-lg p-3 w-full bg-white/10 border-black"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-[80%] flex flex-col gap-2">
          <label className="text-lg font-semibold text-right" for={"username"}>
             نام کاربری
          </label>
          <input
            id="username"
						onChange={(e) => setUserName(e.target.value)}
            className="border-2 text-right rounded-lg p-3 w-full bg-white/10 border-black"
          />
        </div>
        <button
          className="border-2 rounded-xl p-3 w-[80%] text-white text-xl font-semibold bg-black border-black"
          onClick={() => register()}
        >
          ثبت نام
        </button>
        <div>
          <span className="font-semibold">
            اگر ثبت نام کرده اید؟
            <span className="text-lg cursor-pointer font-bold hover:scale-50" onClick={()=>router.push('/login')}>
              کلیک کنید
            </span>
          </span>
        </div>
      </div>
    </div>
    // <div>
    //   <input className="border-2" onChange={(e) => setName(e.target.value)} />
    //   <input
    //     className="border-2"
    //     onChange={(e) => setUserName(e.target.value)}
    //   />
    //   <button onClick={() => register()}>signup</button>
    // </div>
  );
};

export default Signup;
