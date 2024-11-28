const roleBaseAuth = (role) => {
    return (req, res, next) => {
      // Check if req.user exists
      console.log(req.user.role)
      if (!req.user) {
        return res.status(401).send("Authentication required: user not found");
      }
  console.log(req.user)
 // Check if req.user.roles exists and is an array
      // if (!req.user.role || !Array.isArray(req.user.role)) {
      //   return res.status(403).send("Access denied: roles not found or invalid");
      // }
  
      // Check if the role exists in user roles
      if (!req.user.role.includes(role)) {
        return res.status(403).send("Access denied: insufficient permissions");
      }
  
      // If user has the required role, continue to the next middleware
      next();
    };
  };
  
  export default roleBaseAuth;
  