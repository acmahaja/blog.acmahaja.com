const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");

const { join } = require("path");

const User = require("./model/User");
const UserData = require("./model/UserData");

app.use(cors());
app.use(express.json());
dotenv.config();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

mongoose
  .connect(
    process.env.NODE_ENV === "production"
      ? process.env.DATABASE
      : "mongodb://0.0.0.0:27017/template-mern"
  )
  .then(() => {
    console.log(`🌿[Database]: Connected to database`);
  })
  .catch((error) => {
    console.log(`🖥️[Server]: Failed to connect to database`);
    console.log(error.message);
  });

const port = process.env.PORT || 3001;

async function verifyAccessToken(req, res, next) {
    try {
      const token = req.headers["x-access-token"];
      const decoded = await jwt.verify(token, process.env.SECRET_HASH);
    } catch (error) {
      res.json({ status: "error", error: "Session error" });
    }
    next();
  }


app.post('/api/message', verifyAccessToken, async(req,res)=> {
    try {
        const token = req.headers["x-access-token"];
        const decoded = jwt.verify(token, process.env.SECRET_HASH);
    
        const user = await User.findOne({
          email: decoded.email,
        });
    
        let userData = new UserData({
            user: user._id,
            Message: req.body.message,
        })
    
        await userData.save()
    
        res.json({ status: "ok", userData: userData.id });    
      } catch (error) {
        res.json({ status: "error", error: "Something Broke" });
      }
})  

app.get('/api/message', verifyAccessToken, async (req, res)=>{
    try {
        const token = req.headers["x-access-token"];
        const decoded = jwt.verify(token, process.env.SECRET_HASH);

        const {_id} = await User.findOne({
          email: decoded.email,
        });
    
        const userData = await UserData.find({
          user: _id
        });

        res.json({ status: "ok", data: userData });
      
    } catch (error) {

        res.json({ status: "error", error: "Something Broke" });
      
    }
})

app.post("/api/login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      res.json({ status: "error", error: "Invalid login" });
    }
    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (checkPassword) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        process.env.SECRET_HASH
      );
      res.json({ status: "ok", token: token });
    } 
    else {
      res.json({ status: "error", error: "Invalid login" });
    }
  } catch (error) {
    res.json({ status: "error", error: "Something Broke" });

  }
});

app.post("/api/register", async (req, res) => {
  try {
  let user = User.findOne({
    email: req.body.email,
  });

  if (!user) {
    console.log(`⚠️ [Server]: Error\nUser Exists!`);
    throw new Error("RegisterError: User Already Exists")
  }

    req.body.password = await bcrypt.hash(
      req.body.password,
      Number.parseInt(process.env.SALT)
    );

    user = new User(req.body);

    await user.save();

    res.json({ status: "ok" });
  } catch (error) {
    console.log(`⚠️ [Server]: Error!\n${error}`);

    res.json({ status: "error", error: error.message || "RegisterError: Something Broke Registering User" });
  }
});

app.get("/api", (req, res) => {
  res.json({ message: "🖥️[server]: Hello from MernTemplate server!" });
});

app.get("/", (req, res) => {
  res.send("🖥️ Hello From MernTemplate");
});

app.listen(port, () => {
  console.log(`🖥️ [Server]: Listening on ${port}`);
});
