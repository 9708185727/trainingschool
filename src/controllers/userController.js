import { createAuthToken } from "../helpers/authHelpers.js";

import authService from "../services/authService.js";


const userRegister = async (req, res) => {
  const userData = req.body;
  console.log(req.file); // Check the uploaded file object
  console.log(userData); // Check the user data

  if (!userData.name) return res.status(422).send("required data name");
  if (!userData.email) return res.status(422).send("required data email");
  if (!userData.password) return res.status(422).send("required data password");
  if (!userData.role) return res.status(422).send("required role ");
  
  if (userData.password !== userData.confirmPassword) {
    return res.status(400).send("password and confirm password doesnot match");
  }
  if (userData.password.length < 8) {
    return res.status(400).send("password must greater than 8");
  }

  // Handle file upload
  const resumeFile = req.file ? req.file.path : null; // Store file path if available

  const profileData = {
    bio: userData.bio || '', // Ensure bio is present
    resume: resumeFile || '', // Use file path if available
    participationHistory: userData.participationHistory ? [userData.participationHistory] : [], // Ensure it's an array
  };

  try {
    const userAdd = await authService.userCreate({
      ...userData,
      profile: profileData, // Pass profile data
    });

    const token = createAuthToken(userAdd);
    res.status(201).json({ ...userAdd, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const userLog = async (req, res) => {
  const userData = req.body;
  try {
    const user = await authService.userLogin(userData);
    const token = createAuthToken(user);
    // console.log(authToken);
    res.cookie("authToken", token);
    //  localStorage.setItem('key',data);//use in local browser stroage for large storage
      // res.send("user login successfully");
    res.status(201).json({ ...user, token });
  
  } catch (error) {
    res.status(500).send(error.message);
  }
};
  const logout = async (req, res) => {
     res.clearCookie("authToken");
      res.json({
        status:"OK",
      })
};

  const getAllUser= async (req, res) => {
    try {
      const getUsers = await authService.getUserDetails(req.query);
      res.status(201).json(getUsers);
      // console.log(req.query)
    }
     catch (error) {
      res.status(400).send(error.message);
    }
    // res.json(Opportunitys)
  };


  //controller user to get by id
  const getUserId = async (req, res) => {
    // console.log(req.query);
    console.log(req.params.id);
  
    const id = req.params.id;
    try {
      const User = await authService.getUserById(id);
      if (!User) res.status(404).send("User not found");
  
      res.json(User);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  //toupdate user details
  const getUpdateUser = async (req, res) => {
 
    const id = req.params.id;
  const data = req.body;
  const user = req.user;
    
   
    try {
      const userdata = await authService.getUserEdit(id);
      if (!userdata) return res.status(404).send("user data not Found");
      if (!user.role.includes("Admin")) {
        return res.status(404).send("Access Denied");
      }
      const updatedUser = await authService.getUserEdit(id,data);
      res.status(201).json(updatedUser);
      
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
export { userRegister, userLog, logout, getAllUser,getUserId,getUpdateUser};
