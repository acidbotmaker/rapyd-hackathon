import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import generateToken from "../utils/generateToken.js";

//@description___Authenticate User and Getting token...
//@route___POST./api/users/login...
//@access___Public...

const userAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@description__Register a new user..
//@route___POST./api/users...
//@access___Public...

const newUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error(`User with ${req.body.email} already Exists`);
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//@description___Getting user Profile...
//@route___GET./api/users/profile...
//@access___Private...

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error(` Name: ${req.user.name}, is not our user`);
  }
});

//@description___Update  user Profile...
//@route___PUT./api/users/profile...
//@access___Private...

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error(` User: ${req.user.name}, Not Found`);
  }
});

//@description___GET All Users...
//@route___GET--/api/users...
//@access___Private/admin...

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@description___DELETE USERS...
//@route___DELETE /api/users/:id...
//@access___Private/admin...

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User Removed Successfully" });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  } 
});

//@description___GET user by id...
//@route___GET /api/users/:id...
//@access___Private/admin...

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});




//@description___Update  user ..
//@route___PUT./api/users/:id...
//@access___Private/Admin...

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin
   

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      
    });
  } else {
    res.status(404);
    throw new Error(` User: ${req.user.name}, Not Found`);
  }
});




export {
  userAuth,
  getUserProfile,
  newUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser
};
