import User from '../models/user.model';
import bcrypt from 'bcrypt';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const newUser = async (body) => {
  const salt = await bcrypt.genSalt(10);
  body.password = await bcrypt.hash(body.password, salt);
  const data = await User.create(body);
  return data;
};

// login user
// export const login = async (body) => {
//   try {
//     let user = await User.findOne({ email: body.email });
//     if (!user)
//       throw new error("Invalid Email");

//     const validPassword = await bcrypt.compare(body.password, user.password);
//     if (!validPassword)
//       throw new error("Invalid Password");
//     else
//       return user;
//   }
//   catch (error) {
//     throw new error(error)
//   }
// }

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
