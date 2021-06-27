import { getRepository } from "typeorm";
import { hash } from "bcryptjs";
import { User } from "../entities/User";
import { v4 } from "uuid";
import { classToPlain } from "class-transformer";
import { BaseError } from "./ErrorServices";

interface IUserRequest{
    name?:string;
    email:string;
    admin?:boolean;
    password?:string;
}
class UserServices{
    async create({name, email, password}:IUserRequest): Promise<Record<string, User>>{
        if(!name){
            throw new BaseError(400, "Invalid name");
        }
        if(!email){
            throw new BaseError(400, "Invalid e-mail");
        }
        const usersRepository = getRepository(User);
        const userAlreadyExists = await usersRepository.findOne({
            email
        });
        if(userAlreadyExists){
            throw new BaseError(400, "User already exists");
        }
        const passwordHash = await hash(password,8);
        const user = usersRepository.create({
            id:v4(),
            name,
            email,
            admin: false,
            password: passwordHash
        });
        await usersRepository.save(user);
        return classToPlain(user);
    }
    async delete({email}:IUserRequest): Promise<void>{
        if(!email){
            throw new BaseError(400, "Invalid e-mail");
        }
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOne({
            email
        });
        if(user){
            const result = await usersRepository.delete(user);
        } else {
            throw new BaseError(500, "Unable to delete user");
        }
    }
}
export{ UserServices };