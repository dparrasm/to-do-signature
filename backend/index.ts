import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

const connectDB = require("./config/database");

const app = express();

//Connect Database
connectDB();

//Init Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => res.send("API running"));

//Define routes
app.use("/api/users", require("./routes/api/user"));
//app.use('/api/profile', require('./routes/api/profile'));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/document", require("./routes/api/document"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
