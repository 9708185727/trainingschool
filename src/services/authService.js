import User from "../models/User.js";
import bcrypt from "bcryptjs";
const userCreate = async (data) => {
  // Check if user with the given email already exists
  const userExists = await User.findOne({ email: data.email });
  if (userExists) throw new Error("User Email already exists");

  // Hash the user's password
  const hashpassword = bcrypt.hashSync(data.password);

  try {
    return await User.create({
      name: data.name,
      email: data.email,
      password: hashpassword,
      role: data.role,
      profile: {
        bio: data.profile?.bio || '',
        resume: data.profile?.resume || '', // Ensure this is correctly set
        participationHistory: data.profile?.participationHistory || [],
      },
    });
  } catch (error) {
    console.error(error.message);
    throw new Error("Error creating user");
  }
};

const userLogin = async (data) => {
  const userExisting = await User.findOne({ email: data.email });

  if (!userExisting) throw new Error("user not exists");
  const isMatch = bcrypt.compareSync(data.password, userExisting.password);

  if(!isMatch){
    throw  Error('password  doesnot match');
}
   

  return userExisting;
};

//getalldetails user
const getUserDetails = async (query) => {
  const limit = query?.limit || 10;
  const sort = query?.sort ? JSON.parse(query.sort) : {};
  const filters = query?.filters ? JSON.parse(query.filters) : {};
  const page = query?.page || 1;
  const offset = (page - 1) * limit;

  const customQuery = Object.entries(filters).reduce((acc, [key, value]) => {
    const result = { ...acc, [key]: new RegExp(value, "i") };

    return result;
  }, {});

  return await User.find(customQuery).limit(limit).sort(sort).skip(offset);
};
//getbyid user
const getUserById = async (id) => {
  return await User.findById(id);
};
//to update details of user
const getUserEdit = async (id, data) => {
  return await User.findByIdAndUpdate(id, data);
};

export default {
  userCreate,
  userLogin,
  getUserDetails,
  getUserById,
  getUserEdit,
};
