import {Request,Response} from "express";
import { UserServices } from "../services/UserServices";
class UserController{
    async create(request:Request, response:Response){
        const {name, email, admin, password} = request.body;
        const userServices = new UserServices();
        const user=await userServices.create({name, email, admin, password});
        return response.json(user);
    }
}
export{ UserController };