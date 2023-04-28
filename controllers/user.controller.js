const userService = require("../service/user.service");
// const HttpError = require("../../utils/custom-error/http-error");





//signIn controller
exports.signinController = async (req, res,next) => {
  const response = await userService.signInService(req.body); //sending data to service for response
  const { error, data } = response;
  if (error) return next(error);
  res.json(data);
};

exports.signupController = async (req, res,next) => {
  const response = await userService.signUpService(req.body);
  // console.log("response: ",response)
  const { error, data } = response;
  if (error) return next(error);
  res.json(data);;
};

exports.deleteUserController = async(req,res,next)=>{
  const {_id}=req.params;
  const response=await userService.deleteUserService({_id});
  const {error,data}=response;
  if(error) return next(error);
  res.json(data);
}

exports.updateUser=async(req,res,next)=>{
  const {id}=req.query;
  const newdata=req.body;
  const response = await userService.updateUser({newdata,id});
  const {error,data}=response;
  if(error) return next(error);
  res.json(data);
}
// module.exports={signinController,signupController}
