require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet")

const authroute = require("./routes/auth-route")

const app = express();

app.use(cors());

app.use(helmet())
app.use(express.json());

app.use("/auth", authroute)

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
