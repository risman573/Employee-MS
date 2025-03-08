import express from "express";
import conn from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post('/employeelogin', (req, res) => {
  const sql = "SELECT * FROM employee WHERE email = ?";
  conn.query(sql, [req.body.email], (err, result) => {
    if(err) return res.json({ loginStatus: false, Error: "Query error" });
    if(result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        if(err) return res.json({ loginStatus: false, Error: "Wrong Password" });
        if(response) {
          const email = result[0].email;
          const token = jwt.sign(
            { role: "employee", email: email, id: result[0].id },
            "jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.json({ loginStatus: true, id: result[0].id });
        } else {
          return res.json({ loginStatus: false, Error: "wrong email or password" });
        }
      })
    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});

router.get('/detail/:id', (req, res) => {
  const id  = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  conn.query(sql, [id], (err, result) => {
    if(err) return res.json({ status: false, Error: "Query error" });
    return res.json({ status: true, result: result });
  });
});

router.get('/logout', (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true });
});

export { router as employeeRouter };