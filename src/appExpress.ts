
import  express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import * as admin from 'firebase-admin';;
//import {NodeSchedule, } from './app'
import serviceAccount from './serviceAccountKey.json';
import  routes from './app/routes';

let sa:any = serviceAccount;
const app = express();

admin.initializeApp({
  credential: admin.credential.cert(sa),
});

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req:any, res:any, next) => {
  res.setHeader("Permissions-Policy", "autoplay=(*)");
  next();
});

// Use CORS middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.static(path.join(__dirname, "..", "public", "images")));

// Routes
app.use("/", routes);

export default app;
