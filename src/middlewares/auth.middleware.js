import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const user = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    req.body.userId = user.email
    // res.locals.user = user;
    // res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};

// forget password
export const userAuthforget = async (req, res, next) => {
  try {
    let bearerToken = req.params.token
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    // bearerToken = bearerToken.split(' ');

    const user = await jwt.verify(bearerToken, process.env.EMAIL_SECRET_KEY);
    req.body.email = user.email
    // res.locals.user = user;
    // res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};
