const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// require("custom-env").env("dev");
const HttpError = require("../utils/custom-error/http-error");

exports.signUpService = async (data) => {
  // console.log("data: ", data);
  try {
    const { email, password } = data;
    //checking if user already exists
    const isExist = await UserModel.findOne({ email });
    if (isExist) {
      const error = new HttpError("User already exists.", 400);
      return { error };
    }
    const newUser = new UserModel(data);
    //password hashing
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    //assigning hashed password
    newUser.password = hashedPassword;
    //saving user to db
    await newUser.save();
    return {
      data: newUser,
    };
  } catch (err) {
    const error = new HttpError(
      "Something went wrong please try again later in some time",
      500
    );
    return { error };
  }
};

//signIn service control
exports.signInService = async (data) => {
  try {
    const user = await UserModel.findOne({ email: data.email }); //finding emailId in database
    // console.log('user: ', user);

    if (!user) {
      const error = new HttpError("User doesnot  exists.", 400);
      return { error };
    }

    //comapre password
    const comparePassword = await bcrypt.compare(
      data.password, //input password
      user.password //saved password
    );
    // console.log('comparePassword: ', comparePassword);

    if (!comparePassword) {
      const error = new HttpError("Incorrect Password", 400);
      return { error };
    }

    // token generation
    const token = jwt.sign(
      { _id: user._id.toString() }, //payload
      process.env.SECRETKEY //secretKey fetch from env
    );
    user.password = undefined;
    return {
      data: { user, token }, //sending data back to controller
    };
  } catch (err) {
    const error = new HttpError(
      "Something went wrong please try again later in some time",
      500
    );
    return { error };
  }
};

exports.deleteUserService=async(data)=>{
  const {_id}=data;
  try {
    const UserInstance =await UserModel.findByIdAndDelete({_id})
    if(!UserInstance){
      const error= new HttpError("Invalid User",404);
      return {error};
    }
    return {data:UserInstance}
  } catch (err) {
    const error=new HttpError("Something went wrong. Please try again Later",500);
    return {error}
  }
}

exports.updateUser=async(data)=>{
  const {id}=data;
  try {

    const UserInstance = await UserModel.findByIdAndUpdate({_id:id},data.newdata);
    if(!UserInstance){
      const error= new HttpError("Invalid User",404);
      return {error};
    }
    return {data: UserInstance}
  } catch (err) {
    console.log('err: ', err);

    const error = new HttpError("Something went wrong, Please try again after sometime.");
    return {error}
  }

}