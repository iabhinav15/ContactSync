import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { dbConnection } from "./dbconfig/db.js";
import auth from './routes/user.route.js'
import contactRoute from './routes/contact.route.js'
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended: true, limit: "50mb"}));
const PORT = 8080
dbConnection();

app.use('/auth', auth);
app.use('/contact',contactRoute);


app.use(errorMiddleware);

app.listen(PORT, ()=>{
   console.log(`server is running on port ${PORT}`)
});




