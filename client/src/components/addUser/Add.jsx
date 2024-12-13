import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./add.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const Add = () => {
  const initialUserState = {
    fname: "",
    lname: "",
    email: "",
    details: "",
    password: "",
  };

  const [user, setUser] = useState(initialUserState);
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      ["link", "image", "video", "formula"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ],

    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
  ];

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // handle ReactQuill input
  const handleDetailsChange = (value) => {
    setUser((prevUser) => ({ ...prevUser, details: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.0.104:8000/api/create",
        user
      );
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Add new user</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="First Name"
            onChange={inputHandler}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            name="lname"
            autoComplete="off"
            placeholder="Last Name"
            onChange={inputHandler}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
            onChange={inputHandler}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="details">Details</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={user.details}
            className="custom-editor"
            onChange={handleDetailsChange}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Password"
            onChange={inputHandler}
          />
        </div>
        <div className="inputGroup">
          <button type="submit">Add User</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
