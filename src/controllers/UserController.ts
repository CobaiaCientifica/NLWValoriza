import {Request,Response} from "express";
import { UserServices } from "../services/UserServices";
class UserController{
    async create(request: Request, response: Response){
        const {name, email, admin, password} = request.body;
        const userServices = new UserServices();
        const user = await userServices.create({name, email, admin, password});
        return response.status(201).json(user);
    }
    async delete(request: Request, response: Response){
        const {email} = request.body;
        const usersServices = new UserServices();
        const result = await usersServices.delete({email});
        return response.json(result);
    }
    async read(request: Request, response: Response){
        const {name, email, admin} = request.body;
        const usersServices = new UserServices();
        const result = await usersServices.read({name, email, admin});
        return response.json(result);
    }
    async update(request: Request, response: Response){
        const {targetEmail} = request.body;
        const {name, email, admin, password} = request.body;
        const usersServices = new UserServices();
        const result = await usersServices.update({email:targetEmail}, {name, email, admin, password});
        return response.json(result);
    }
}
export{ UserController };