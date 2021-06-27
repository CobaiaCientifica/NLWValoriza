import {Entity,PrimaryColumn,Column,CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Exclude} from "class-transformer";

@Entity("users")
export class User {
    @Exclude()
    @PrimaryColumn()
    readonly id:string;
    @Column()
    name:string;
    @Column()
    email:string;
    @Column()
    admin:boolean;
    @Exclude()
    @Column()
    password:string;
    @CreateDateColumn()
    created_at:Date;
    @UpdateDateColumn()
    updated_at:Date;
}
