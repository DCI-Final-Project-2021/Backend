import dotenv from "dotenv";
import express from "express";
import database from "./lib/database.js";
import ordersRouter from "./routers/orders.js";
import usersRouter from "./routers/users.js";
import driversRouter from "./routers/drivers.js";
import customersRouter from "./routers/customers.js";
import errorHandling from "./middlewares/errorHandling.js";
import cookieParser from "cookie-parser";
import checkAuth from "./middlewares/checkAuth.js";
import cors from "cors";
import path from "path";
import {io} from "./lib/socket.js";
import { URL } from 'url';

dotenv.config();
database.init();

// SOCKET IO
import { createServer } from 'http';
const server = express();
const app = createServer(server);

app.listen(process.env.PORT, () =>
console.log(`server listening on port ${process.env.PORT}`)
);

var whitelist = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:2005', 'http://localhost:2006', 'https://delicious-things.herokuapp.com/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}
// server.use(cors(corsOptions));
server.use(cors());

// const config = {
//   origin: "http://localhost:3000", "http://localhost:3001", // zugriff auf cookie des backendserver ermöglichen
//   credentials: true, // JS kann Credentials zugreifen. Credentials are cookies, authorization headers, or TLS client certificates.
// };
// server.use(cors(config));

// server.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// GET oder POST ?????
server.get("/auth", checkAuth, async function (req, res, next) {
  try {
    const token = req.cookies;
    res.json({result: token});
  } catch (error) {
    next(error);
  }
});

server.use("/orders", ordersRouter);
server.use("/products", usersRouter);
server.use("/users", usersRouter);
server.use("/drivers", driversRouter);
server.use("/customers", customersRouter);

server.use(express.static("./app/driverOrderTracking"));

server.use((req, res) => res.sendFile("index.html"));

const url = new URL('./app/driverOrderTracking/index.html', import.meta.url).pathname;
server.use((req, res) => res.sendFile(url));

server.use(errorHandling);
