import { Request,Response,NextFunction } from "express";
export function ensureAdmin(request:Request,response:Response,next:NextFunction){
    //Verificar se usuário é administrador
    const admin=true;
    if(admin){
        return next();
    }
    return response.status(401).json({
        error:"Unauthorized"
    })
}