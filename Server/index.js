import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/AdminRoute.js";
import { employeeRouter } from "./Routes/EmployeeRoute.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/auth', adminRouter);
app.use('/employee', employeeRouter);
app.use(express.static("Public"));

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    Jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if (err) return res.json({ status: false, Error: "Unauthorized" });
      req.id = decoded.id;
      req.role = decoded.role;
      next();
    });
  } else {
    return res.json({ status: false , Error: "Unauthorized" });
  }
};
app.get('/verify', verifyUser, (req, res) => {
  return res.json({ status: true, id: req.id, role: req.role });
});

app.listen(3000, () => console.log("Server running on port 3000"));