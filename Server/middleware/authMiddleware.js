// Importing the required jwt module to verify JSON Web Tokens
const jwt = require("jsonwebtoken");

// Middleware function to authenticate requests based on the provided JWT token
const authMiddleware = (req, res, next) => {
  // Extracting the token from the "Authorization" header (assuming the token is in the format "Bearer <token>")
  const token = req.header("Authorization")?.split(" ")[1]; // Optional chaining to handle cases when header is undefined

  // If no token is found, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verifying the token using the secret key stored in environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adding the decoded user information (e.g., user ID) to the request object for further use in routes
    req.user = decoded;

    // Call next() to pass control to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or verification fails, return a 401 Unauthorized response
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Exporting the authMiddleware function to be used in protected routes
module.exports = authMiddleware;
