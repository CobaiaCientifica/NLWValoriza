export class BaseError extends Error{
    code:number;
    constructor(code:number, message:string){
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, BaseError.prototype);
    }
}