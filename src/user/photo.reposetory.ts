import { EntityRepository, Repository } from "typeorm";
import { Photo } from "./photo.entity";

@EntityRepository(Photo)
export class Photorepo extends Repository<Photo>{
    
}