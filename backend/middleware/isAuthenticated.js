import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("Token received:", token); // Log the received token

    if (!token) {
      console.log("No token provided"); // Log if token is missing
      return res.status(401).json({ message: "User not authenticated." });
    }

    // Attempt to verify the token
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded token:", decode); // Log the decoded token data

    if (!decode) {
      console.log("Token verification failed"); // Log if token verification fails
      return res.status(401).json({ message: "Invalid token" });
    }

    // Set userId to req.id
    req.id = decode.userId;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Log the entire error object
    console.error("Error in isAuthenticated middleware:", error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

export default isAuthenticated;
