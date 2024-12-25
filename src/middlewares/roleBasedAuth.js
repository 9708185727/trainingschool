const roleBaseAuth = (role) => {
  return (req, res, next) => {
    // Check if req.user exists
  //   console.log(req.user.roles)
    if (!req.user) {
      return res.status(401).send("Authentication required: user not found");
    }


  
    // Check if the role exists in user roles
    if (!req.user.role.includes(role)) {
      return res.status(403).send("Access denied: insufficient permissions");
    }

    // If user has the required role, continue to the next middleware
    next();
  };
};

export default roleBaseAuth;
