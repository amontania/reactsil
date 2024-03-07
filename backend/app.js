
import express from "express";
import morgan from "morgan";
import {auth} from "./src/_middleware/auth.js";
import cookieParser from "cookie-parser";
import path from 'path';
import cors from "cors";
import { fileURLToPath } from 'url';
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import multer from "multer";
// import bodyParser from "body-parser";
import { config } from "dotenv";

import Routes from "./src/routes/routes.js";

import errorHandler from "./src/_util/errorhandler.js";
import ErrorResponse from "./src/_util/error.js";


config();

const app = express();
app.use(cookieParser());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const corsOptions = {
   origin: "http://localhost:5173",
   methods: ["GET", "POST", "PUT", "DELETE"],
   Credential: true,
   optionsSuccessStatus: 200,
   preflightContinue: false,
   allowedHeaders: [
     " Content-Type","Authorization",
   
  ],
};
app.use(cors(corsOptions));

 app.use(express.json());
 const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: true,
  message: "Too many requests, please try again after 15 minutes",
});
 app.use(limiter);
 app.use(helmet());
// app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.NODE_DOCKER_PORT || 8080; ;
app.set("port", port);

// Middlewares
app.use(morgan("dev"));

// parse requests of content-type - application/json
app.use(express.json());
//middleware to read req.body.<params>

app.use(express.urlencoded({ extended: true }));
// parse requests of content-type - application/x-www-form-urlencoded

app.get("/message", (req, res) => {
  res.cookie("hola", 24);
  res.json({ message: "ok1" });
});

app.post("/welcome", auth, (req, res) => {
  
  res.status(200).send("Welcome 🙌 ");
});

app.use("/api",cors(),Routes);
const upload = multer({ dest: "uploads/" });


 // 404 error handler
// app.use("*", (req, res) => {
 // return res.status(404).json({ message: "Route not found" });
//});
app.all("*", async (req, res, next) => { // *
  const err = new ErrorResponse( //**
  `${req.originalUrl} does not exist on the server`,
  404
  );
  next(err); // ***
  });
app.use(errorHandler);

export default app;
