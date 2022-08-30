import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useAppContext } from "../../context/state";

const Login = () => {
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const cookies = new Cookies();
	const { isEdited,setIsEdited } = useAppContext();
	const [notFound,setNotFound] = useState(false)

	useEffect(() => {
		cookies.remove("token")
		setIsEdited(!isEdited)
		setNotFound(false)
	}, [])
	

  const register = () => {
    try {
      fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: "1111",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            cookies.set("token", data.token);
            setIsEdited(!isEdited)
            router.replace("/");
          }
					else{
          setNotFound(true)
					}
        });
    } catch (error) {
      console.log(error);
    }
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
					{notFound? <span className="text-red-600 text-right text-sm font-medium">نام کاربری یا رمز عبور اشتباه است</span>:null}
          <label className="text-lg font-semibold text-right" for={"name"}>
            نام کاربری
          </label>
          <input
            id="name"
            className="border-2 text-right rounded-lg p-3 w-full bg-white/10 border-black"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="w-[80%] flex flex-col gap-2">
          <label className="text-lg font-semibold text-right" for={"pass"}>
            رمز عبور
          </label>
          <input
            type={"password"}
            id="pass"
            className="border-2  rounded-lg p-3 w-full bg-white/10 border-black"
          />
        </div>
        <button
          className="border-2  rounded-xl p-3 w-[80%] text-white text-xl font-semibold bg-black border-black"
          onClick={() => register()}
        >
          ورود
        </button>
        <div>
          <span className="font-semibold">
            اگر ثبت نام نکرده اید؟
            <span className="text-lg cursor-pointer font-bold hover:scale-50" onClick={()=>router.push('/signup')}>
              کلیک کنید
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
