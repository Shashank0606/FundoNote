import User from '../models/user.model';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
// import sendMail from '../utils/user.util'
import { sendMail } from '../utils/user.util';
import * as mq from '../utils/rabbitmq'


// //get all users
// export const getAllUsers = async () => {
//   const data = await User.find();
//   return data;
// };

//create new user
export const userRegistration = async (body) => {
  const userexist = await User.findOne({ email: body.email });
  if (!userexist) {
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);
    const data = await User.create(body);
    const dataRabbit = JSON.stringify(data);
    mq.producer('receive', dataRabbit);
    return data;
  }
  else {
    throw new Error("User already exist")
  }
};

// login user
export const login = async (body) => {
  try {
    const user = await User.findOne({ email: body.email });
    if (!user)
      throw new Error("Invalid Email");

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword)
      throw new Error("Invalid Password");
    else
      var token = Jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY);
    return (user, token);
  }
  catch (error) {
    throw new Error(error)
  }
};

// //update single user
// export const updateUser = async (_id, body) => {
//   const data = await User.findByIdAndUpdate(
//     {
//       _id
//     },
//     body,
//     {
//       new: true
//     }
//   );
//   return data;
// };

// //delete single user
// export const deleteUser = async (id) => {
//   await User.findByIdAndDelete(id);
//   return '';
// };

// //get single user
// export const getUser = async (id) => {
//   const data = await User.findById(id);
//   return data;
// };

export const forgetPassword = async (body) => {
  try {
    const user = await User.findOne({ email: body.email });
    if (!user) {
      throw new Error("Invalid Email");
    }
    else
      var token = await Jwt.sign(user.email, process.env.EMAIL_SECRET_KEY);
    const data = await sendMail(token, user.email)
    // console.log("sadfasdfasd-------------", token);
    // console.log("Token send in mail------", data);
    return {
      message: `Token send in mail`,
      data
    }
  }
  catch (error) {
    throw new Error(error)
  }
};


export const resetPassword = async (body) => {
  try {
    const userexist = await User.findOne({ email: body.email });

    if (userexist) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
      const data = await User.findOneAndUpdate({ email: body.email }, { new: true });
      return data;
    }
  }
  catch (error) {
    throw new Error(error)
  }
};