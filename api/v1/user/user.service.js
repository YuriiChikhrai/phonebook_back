const { compareSync } = require("bcrypt");

const UserModel = require("./user.model");

exports.compareUserPassword = async (email, password) => {
  const user = await UserModel.findOne({ email })
    .select("_id password")
    .lean()
    .exec();

  if (!user) {
    throw {
      code: 404,
      message: "user not found",
    };
  }

  if (!compareSync(password, user.password)) {
    throw {
      code: 404,
      message: "user not found",
    };
  }

  return user;
};

exports.registerUser = async (email, password, firstName, lastName) => {
  try {
    return await UserModel.create({
      email,
      password,
      firstName,
      lastName,
    });
  } catch (e) {
    if (e.code === 11000) {
      throw {
        code: 409,
        message: "email exists",
      };
    }
    throw e;
  }
};

exports.getUserData = async (user_id) => {
  try {
    const user = await UserModel.findById(user_id)
      .select("-role -createdAt")
      .lean()
      .exec();

    if (!user) {
      throw {
        code: 404,
        message: "user not found",
      };
    }

    return user;
  } catch (e) {
    throw e;
  }
}