import express from "express"
import bodyparser from "body-parser" 
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import cors from "cors";
import { Sequelize } from "sequelize"
import {development} from "./database/config/config.js"

//global ...
const app = express()
app.use(cors())

//CONNECTING APP TO POSTGRESS

const sequelize = new Sequelize(development.url,{
    dialect: 'postgres' 
  });

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
connectDb();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/",(req,res)=>{
  res.send("hello the!")
})
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});


const port=process.env.PORT||4000

const server=app.listen(port,()=>{

    console.log(`listen to ${port}`)
})

export default server;