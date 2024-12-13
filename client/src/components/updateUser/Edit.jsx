import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../addUser/add.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);

const Edit = () => {
  /*
   * Quill modules to attach to editor
   * See https://quilljs.com/docs/modules/ for complete options
   */
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      ["link", "image", "video", "formula"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
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

  const initialUserState = {
    fname: "",
    lname: "",
    email: "",
    details: "",
  };
  const { id } = useParams();
  const [user, setUser] = useState(initialUserState);
  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleDetailsChange = (value) => {
    setUser((prevUser) => ({ ...prevUser, details: value }));
  };

  useEffect(() => {
    axios
      .get(`http://192.168.0.104:8000/api/getone/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://192.168.0.104:8000/api/update/${id}`, user)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Update user</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="First Name"
            onChange={inputChangeHandler}
            value={user.fname}
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
            onChange={inputChangeHandler}
            value={user.lname}
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
            onChange={inputChangeHandler}
            value={user.email}
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
          <button type="submit">Update User</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
