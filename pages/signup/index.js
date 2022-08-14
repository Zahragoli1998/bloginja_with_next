import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useRouter } from 'next/router'

const Signup = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const cookies = new Cookies();
  const router = useRouter();

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
    <div>
      <input className="border-2" onChange={(e) => setName(e.target.value)} />
      <input
        className="border-2"
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={() => register()}>signup</button>
    </div>
  );
};

export default Signup;
