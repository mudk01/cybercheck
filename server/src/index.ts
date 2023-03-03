import express, { Express, Request, Response } from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import { userTable } from './db/Create-Tables';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());

// Initialize Passport
app.use(passport.initialize());

app.get('/', (req: Request, res: Response) => {
  res.send({ data: 'cyber CHECK' });
});

const userRoute = require("./routes/User");
const commentsRoute = require("./routes/Comments");
const reportRoute = require("./routse/reportRoutes")

app.use('/Users', userRoute);
app.use("/api/comments", commentsRoute);
app.use('/Reports', reportRoute);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
userTable()
