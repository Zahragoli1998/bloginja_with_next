import React, { useEffect, useLayoutEffect, useState } from "react";
import Cookies from "universal-cookie";
import DashboardLayout from "../../components/dashboardLayout";
import { useAppContext } from "../../context/state";

const Edit = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [name, setName] = useState("");
  const [type, settype] = useState("");
  const [user, setUser] = useState("");
  const { isEdited, setIsEdited } = useAppContext();
  console.log("user", user);

  const editUser = () => {
    fetch("http://localhost:4000/user/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
      body: JSON.stringify({
        name: name,
        bio: type,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.msg === "ok") {
          setIsEdited(!isEdited);
        }
      });
  };

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
  }, [isEdited]);
  return (
    <DashboardLayout>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full flex flex-col items-center gap-16">
          <div className="relative">
            <div className="w-36 h-36 rounded-full shadow-md"></div>
						<img className="w-8 h-8 absolute bottom-0 " src="/img/icons8-edit-60.png"/>
          </div>
          <div className="flex flex-col gap-4 items-end font-semibold">
            <label for={"name"}>: نام </label>
            <input
              id={"name"}
              className=" p-2 outline-none text-right border-b-2"
              placeholder={user.name}
              onChange={(e) => setName(e.target.value)}
            />
            <label for={"bio"}>: بیوگرافی </label>
            <textarea
              id={"bio"}
              className="text-right border-b-2 outline-none "
              maxLength={200}
							placeholder={user.bio}
              onChange={(e) => settype(e.target.value)}
            />
          </div>
          <button className="bg-black p-2 w-48 text-white font-semibold shadow-xl rounded-xl hover:scale-110" onClick={editUser}>ویرایش</button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Edit;
