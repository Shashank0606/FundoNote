import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';


// export const getAllUsers = async (req, res, next) => {
//   try {
//     const data = await UserService.getAllUsers();
//     res.status(HttpStatus.OK).json({
//       code: HttpStatus.OK,
//       data: data,
//       message: 'All users fetched successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Controller to get a single user
//  * @param  {object} req - request object
//  * @param {object} res - response object
//  * @param {Function} next
//  */
// export const getUser = async (req, res, next) => {
//   try {
//     const data = await UserService.getUser(req.params._id);
//     res.status(HttpStatus.OK).json({
//       code: HttpStatus.OK,
//       data: data,
//       message: 'User fetched successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUser = async (req, res, next) => {
  try {
    const data = await UserService.userRegistration(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    })
  }
  catch (error) {
    next(error);
  }
};

// /**
//  * Controller to update a user
//  * @param  {object} req - request object
//  * @param {object} res - response object
//  * @param {Function} next
//  */
// export const updateUser = async (req, res, next) => {
//   try {
//     const data = await UserService.updateUser(req.params._id, req.body);
//     res.status(HttpStatus.ACCEPTED).json({
//       code: HttpStatus.ACCEPTED,
//       data: data,
//       message: 'User updated successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Controller to delete a user
//  * @param  {object} req - request object
//  * @param {object} res - response object
//  * @param {Function} next
//  */
// export const deleteUser = async (req, res, next) => {
// try {
//   await UserService.deleteUser(req.params._id);
//   res.status(HttpStatus.OK).json({
//     code: HttpStatus.OK,
//     data: [],
//     message: 'User deleted successfully'
//   });
// } catch (error) {
//   next(error);
// }
// };
// export const login = async (req, res, next) => {
//   // try {
//   //   let user = await User.findOne({ email: req.body.email });
//   //   if (!user)
//   //     return res.status(422).send("Invalid Email");

//   //   const validPassword = await bcrypt.compare(req.body.password, user.password);
//   //   if (!validPassword)
//   //     return res.status(422).send("Invalid Password");

//   res
//     .send({ message: "Login Succesfull", data: login })
//     .status(200);
//   // } catch (error) {
//   //   res.status(500).send({ message: "Internal server error", error })
// };



export const login = async (req, res, next) => {
  try {
    const data = await UserService.login(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'User Login Succesfully'
    })
  }
  catch (error) {
    next(error);
  }
};


export const forgetPassword = async (req, res, next) => {
  try {
    const data = await UserService.forgetPassword(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'token succesfully send in email'
    })
  }
  catch (error) {
    next(error);
  }
};


// reset password
export const resetPassword = async (req, res, next) => {
  try {
    const data = await UserService.resetPassword(req.body, req.params.token);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Password reset successfully'
    })
  }
  catch (error) {
    next(error);
  }
};
