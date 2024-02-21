// import jwt from "jsonwebtoken";

// const authenticatedUser = (req, res, next) => {
//   const authHeader = req.header.authorization;

//   if (authHeader === null || authHeader === undefined) {
//     return res.status(401).json({ status: 401, message: "Unauthorized user" })
//   }

//   const token = authHeader.split(" ")[1]

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err)
//       return res.status(401).json({ status: 401, message: "UnAuthorized" });
//     req.user = user;
//     next();
//   })

// }

// export default authenticatedUser;
