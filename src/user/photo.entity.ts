import {Entity, ManyToOne, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, JoinTable} from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Photo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToOne(() => User, user => user.photos)
    @JoinTable()
    user: User;

}