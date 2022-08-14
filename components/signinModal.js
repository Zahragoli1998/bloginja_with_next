import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Cookies from 'universal-cookie';

const SigninModal = ({setShowModal}) => {
	const router = useRouter()
	const [userName, setUserName] = useState("");
	const cookies = new Cookies();

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
            router.replace(router.asPath);
						setShowModal(false)
          }
        });
    } catch (error) {
      console.log(error);
    }
  };


	return (
		<div className='w-full h-full bg-black/30 absolute top-0 flex justify-center'>
			<div className='bg-white w-[450px] absolute top-[150px] rounded-xl shadow-xl flex flex-col gap-8 items-center z-50'>
         <span className='text-2xl font-semibold text-yellow-400 mt-5'>ابتدا وارد شوید</span>
				 <div className="w-[60%] flex flex-col gap-2">
          <label className="text-sm font-semibold text-right " for={"name"}>
            نام
          </label>
          <input
            id="name"
            className="border-2 rounded-lg p-3 w-full bg-white/10 border-black"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="w-[60%] flex flex-col gap-2">
          <label className="text-sm font-semibold text-right" for={"pass"}>
            رمز عبور
          </label>
          <input
            type={"password"}
            id="pass"
            className="border-2 rounded-lg p-3 w-full bg-white/10 border-black"
          />
        </div>
				<div className='w-[60%] flex flex-col items-center mb-5 gap-2'>
					<button
						className=" rounded-xl p-3 w-full text-xl font-semibold bg-yellow-400 "
						onClick={() => register()}
					>
						ورود
					</button>
					<div>
						<span className="font-medium text-sm text-gray-400">
							اگر ثبت نام نکرده اید؟
							<span className=" cursor-pointer font-bold hover:scale-50" onClick={()=>router.push('/signup')}>
								کلیک کنید
							</span>
						</span>
					</div>
				</div>
			<div className='absolute top-0 left-0 p-2 cursor-pointer' onClick={()=>setShowModal(false)}>*</div>
			</div>
		</div>
	)
}

export default SigninModal