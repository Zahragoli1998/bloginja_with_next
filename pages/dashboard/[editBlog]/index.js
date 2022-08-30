import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import DashboardLayout from "../../../components/dashboardLayout";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/router";

const EditBlog = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
	const router = useRouter()
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
	const [blog,setBlog] = useState({})
  const editorRef = useRef(null);
  const write = () => {
    fetch("http://localhost:4000/blog/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
      body: JSON.stringify({
				blogId: router.query.editBlog,
				data: {
					title: title,
					content: editorRef.current.getContent(),
					imgurl: imgUrl,
				}
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
		fetch(`http://localhost:4000/blog/single-blog/${router.query.editBlog}`)
		.then(res=>res.json())
		.then(data=>{
			setBlog(data)
			setTitle(data.title)
			setImgUrl(data.imgurl)
		})
	}, [])
	
	
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 m-5 items-end">
				<div className="flex flex-row-reverse gap-8 w-full">
					<div className="flex flex-row-reverse gap-4">
						<label for="title">: عنوان </label>
						<input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className='w-48 px-2 border-2 rounded-lg' />
					</div>
					<div className="flex flex-row-reverse gap-4">
						<label for="imgUrl">: افزودن تصویر </label>
						<input
							id="imgUrl"
							value={imgUrl}
							onChange={(e) => setImgUrl(e.target.value)}
							className='w-64 px-2 border-2 rounded-lg'
						/>
					</div>
				</div>
        <Editor
          apiKey="your-api-key"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={blog.content}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <div> 
          <button className="bg-yellow-500 p-1 px-3 rounded-lg text-white font-medium hover:scale-110 shadow-xl self-end" onClick={write}>ویرایش</button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditBlog;
