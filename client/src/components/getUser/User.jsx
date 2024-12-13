import React, { useEffect, useState } from "react";
import "./user.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://192.168.0.104:8000/api/getall");
      setUsers(response.data);
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await axios
      .delete(`http://192.168.0.104:8000/api/delete/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        toast.success(response.data.msg, { position: "top-right" });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="userTable">
      <Link to={"/add"} className="addButton">
        Add User
      </Link>
      <table border="1" cellPadding="10px" cellSpacing="0px">
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>User Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  {user.fname} {user.lname}
                </td>
                <td>{user.email}</td>
                <td dangerouslySetInnerHTML={{__html: user.details}}></td>
                <td className="actionButtons">
                  <button onClick={() => deleteUser(user._id)}>Delete</button>
                  <Link to={`/edit/` + user._id}>Edit</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
