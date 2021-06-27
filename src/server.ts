import "reflect-metadata";
import express,{Request, Response, NextFunction} from "express";
import "express-async-errors";
import "./database";
import { router } from "./routes";
import cors from "cors";
import { BaseError } from "./services/ErrorServices";
const app=express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use((err:Error,request:Request,response:Response,next:NextFunction)=>{
    if(err instanceof BaseError){
        return response.status(err.code).json({
            error:err.message
        });
    }
});
app.listen(3000, () => console.log("Server is running YEET!"));