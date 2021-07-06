import { Request,Response,NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
export async function ensureAdmin(request:Request,response:Response,next:NextFunction){
    const {user_id} = request;
    const usersRepositories = getRepository(User);
    const {admin}=await usersRepositories.findOne(user_id);
    if(admin){
        return next();
    }
    return response.status(401).json({
        error:"Unauthorized"
    })
}