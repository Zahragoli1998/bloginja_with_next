import React from "react";
import Cookies from "universal-cookie";
import DashboardLayout from "../../components/dashboardLayout";

const WriteBlog = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  const write = () => {
    fetch("http://localhost:4000/blog/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
      body: JSON.stringify({
        title: "مراحل تولید و ساخت یک فیلم سینمایی به چه صورتی است؟",
        content:
          "<p>ور کلی یک فیلم مراحل بسیار زیاد و پیچیده‌ای را طی می‌کند و فیلمی که درپایان هفته، 2ساعت زمان برای دیدنش صرف می‌کنیم، ممکن است از 3سال پیش درمراحل تولید قرار گرفته باشد.</p>",
        imgurl:
          "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2059&q=80",
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <DashboardLayout>
      <div>
        WriteBlog
        <button onClick={write}>clickme</button>
      </div>
    </DashboardLayout>
  );
};

export default WriteBlog;
