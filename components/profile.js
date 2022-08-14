import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useAppContext } from "../context/state";

const Profile = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [userInfo, setUserInfo] = useState({});
  const { isEdited } = useAppContext();

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
      .then((data) => setUserInfo(data));
  }, [isEdited]);


  return (
    <div className="w-[20vw] bg-white/30 rounded-b-xl flex items-center">
      {token ? (
        <div className="">
          <div className="flex flex-row-reverse items-center gap-4">
            <span className="hidden md:block"><span>{userInfo.name} </span>خوش آمدید</span>
            <div className="">
							<Link href={"/dashboard"}><img src="/img/icons8-user-64.png" className="w-6 h-6 cursor-pointer"/></Link>
						</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
