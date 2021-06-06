const { Schema, model } = require("mongoose");
const { hashSync } = require("bcrypt");
const { saltRounds } = require("../../../config");

const ROLES = {
  admin: "admin",
  user: "user",
};

const UserSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      default: ROLES.user,
      enum: [ROLES.admin, ROLES.user],
    },
    password: {
      type: String,
      trim: true,
      required: true,
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
  }
);

const isNewSymbol = Symbol("isNew");

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = hashSync(this.password, saltRounds);
  }
  this[isNewSymbol] = this.isNew;
  next();
});

UserSchema.post("save", function (doc, next) {
  try {
    if (this[isNewSymbol]) {
      //   sendConfirmEmail => template
    }
  } catch (e) {
    console.error(e);
  } finally {
    next();
  }
});

const UserModel = model("UserModel", UserSchema);
module.exports = UserModel;
