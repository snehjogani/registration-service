const _ = require('lodash');
const HTTPStatus = require('http-status');

const sequelize = require('@Sequelize').get()
const User = require('@User/model')
const APIError = require('@api-error')
const logger = require('@winston');

const ALLOWED_VALUES = ['name', 'email', 'password', 'topic'];
const REQUIRED_VALUES = ['name', 'email', 'password'];

/**
 * Register a new user
 * @property {string} req.body - Body.
 * @returns {User}
 */
async function register(req, res, next) {
  let transaction;

  try {
    const body = _.pick(req.body, ALLOWED_VALUES);

    let inValid = false;
    _.forEach(REQUIRED_VALUES, (field) => {
      if (!body[field]) {
        inValid = true;
        return false;
      }
    })

    if (inValid) {
      return next(new APIError('Missing required data!', HTTPStatus.UNPROCESSABLE_ENTITY));
    }

    transaction = await sequelize.transaction();

    const checkUser = async () => {
      try {
        let filter = {
          where: {
            email: body.email
          },
          transaction
        }
        let userInstance = await User.findOne(filter);
        if (userInstance) {
          throw new APIError('Email already registered', HTTPStatus.CONFLICT);
        }
      } catch (exec) {
        throw exec;
      }
    }

    const createUser = async () => {
      try {
        let userData = {
          name: body.name,
          email: body.email,
          password: body.password,
          topic: body.topic,
        }
        let userInstance = await User.create(userData, { transaction });
        return userInstance;
      } catch (exec) {
        logger.error('ERROR > CREATING USER > ', exec);
        throw exec;
      }
    }

    // CHECk IF USER ALREADY EXISTS
    await checkUser();

    // CREATE USER
    let userInstance = await createUser();

    // COMMIT
    await transaction.commit();

    return res.json({
      data: userInstance,
      status: 200
    });
  } catch (exec) {
    if (transaction) {
      await transaction.rollback()
    }
    logger.error('ERROR > USER SIGNUP > ', exec)
    return next(exec)
  }
}

module.exports = register