import { Photo } from "src/user/photo.entity";
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable} from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Photo, photos => photos.user)
    photos: Photo[];

}