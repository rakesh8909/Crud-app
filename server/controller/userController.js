import User from "../model/userModel.js";

// create a user
// request type : POST
// path : localhost:8000/api/create
export const create = async (req, res) => {
  //req = request and res = response
  try {
    const userData = new User(req.body);
    if (!userData) {
      return res.status(401).json({ msg: "User Data not found" });
    }
    const savedData = await userData.save();
    res.status(200).json({ msg: "User Created Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// get info about all users
// request type : GET
// path : localhost:8000/api/getall
export const getAll = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      return res.status(401).json({ msg: "Users Data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// get user info by id
// request Type : GET
// path : localhost:8000/api/getone/:id
export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(401).json({ msg: "User Data not found" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// get user info by id and update it
// request Type : PUT
// path : localhost:8000/api/update/:id
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(401).json({ msg: "User Data not found" });
    }
    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ msg: "User Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Delete a user
// request Type : DELETE
// path : localhost:8000/api/delete/:id
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User Data not found" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
