import { DeleteResult, getRepository } from "typeorm";
import { hash } from "bcryptjs";
import { User } from "../entities/User";
import { v4 } from "uuid";
import { classToPlain } from "class-transformer";
import { BaseError } from "./ErrorServices";

interface IUserRequest{
    name?:string;
    email?:string;
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
    async delete({email}:IUserRequest): Promise<DeleteResult>{
        if(!email){
            throw new BaseError(400, "Invalid e-mail");
        }
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOne({
            email
        });
        if(user){
            return await usersRepository.delete({email});
        } else {
            throw new BaseError(400, "User not found");
        }
    }
    async read({name, email, admin}: IUserRequest): Promise<Record<string, User>>{
        const usersRepository = getRepository(User);
        let readTarget = {};
        if(name){
            readTarget["name"] = name;
        }
        if(email){
            readTarget["email"] = email;
        }
        if(admin){
            readTarget["admin"] = admin;
        }
        if(readTarget){
            return classToPlain(usersRepository.find(readTarget));
        } else {
            throw new BaseError(400, "Nothing to find");
        }
    }
    async update(target: IUserRequest, {name, email, admin, password}: IUserRequest): Promise<Record<string, User>>{
        if(!target.email){
            throw new BaseError(400, "Invalid user");
        }
        const usersRepository = getRepository(User);
        const targetFound = await usersRepository.findOne({
            email: target.email
        });
        if(targetFound){
            if(name){
                targetFound.name = name;
            }
            if(email){
                targetFound.email = email;
            }
            if(admin){
                targetFound.admin = admin;
            }
            if(password){
                targetFound.password = await hash(password, 8);
            }
            return classToPlain(await usersRepository.save(targetFound));
        } else {
            throw new BaseError(400, "Invalid user");
        }
    }
}
export{ UserServices };