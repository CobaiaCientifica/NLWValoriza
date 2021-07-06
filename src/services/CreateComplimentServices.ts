import { getRepository } from "typeorm";
import { Compliment } from "../entities/Compliments";
import { User } from "../entities/User";

interface IComplimentRequest{
    tag_id:string;
    user_sender:string;
    user_receiver:string;
    message:string;
}
class CreateComplimentService{
    async execute({tag_id,user_sender,user_receiver,message}:IComplimentRequest){
        const complimentsRepositories = getRepository(Compliment);
        const usersRepositories = getRepository(User);
        if(user_sender===user_receiver){
            throw new Error("Incorrect User Receiver");
        }
        const userReceiverExists=await usersRepositories.findOne(user_receiver);
        if(!userReceiverExists){
            throw new Error("User Receiver does not exists!");
        }
        const compliment=complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        });
        await complimentsRepositories.save(compliment);
        return compliment;
    }
}
export {CreateComplimentService};