import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { url } from 'inspector';
import { getConnection } from 'typeorm';
import { Photo } from './photo.entity';
import { Photorepo } from './photo.reposetory';
import { User } from './user.entity';
import { Userrepo } from './user.reposetory';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Userrepo)
        private userrepo: Userrepo,
        @InjectRepository(Photorepo)
        private photorepo: Photorepo

    ) { }
    async getByid(id:number): Promise<User> {
        //   return this.userrepo.find();
        const users=await this.userrepo.findOne(id,{relations:['photos']})
            
        return users;

    }
    async getphoto(id:number):Promise<Photo>{
        const users1=await this.photorepo.findOne(id,{relations:['user']});
        return users1;
    }
    async getall(): Promise<User[]> {
        //   return this.userrepo.find();
        const users = await this.userrepo
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.photos", "photo")
            
            .getMany();
        return users;

    }

    async create(name: string, url: string, url1: string) {
        const photo1 = new Photo();
        photo1.url = url;
        await this.photorepo.save(photo1);

        const photo2 = new Photo();
        photo2.url = url1;
        await this.photorepo.save(photo2);

        const user = new User();
        user.name = name;
        user.photos = [photo1, photo2];
        await this.userrepo.save(user);

        /*const photo3 = new Photo();
        photo3.url = "this.jpg";
        await this.photorepo.save(photo3);

        const photo4 = new Photo();
        photo4.url = "bears.jpg";
        await this.photorepo.save(photo4);

        const user1 = new User();
        user1.name = "Ahmed";
        user1.photos = [photo3, photo4];
        await this.userrepo.save(user1);*/

    }

    async Delete(id: number) {
        console.log(id)
      const delete1=await this.userrepo.
      createQueryBuilder("user")
      .innerJoin("user.photos", "photo")
      .delete()
      .from(User)
      .where("id = :id", { id: id })
      .execute();

     const users1=await this.userrepo.findOne(id,{relations:['photos']});
            
        //console.log(users1);
        const num = users1.photos;
        num.forEach(async element => {
            console.log(element.id)
            const delete1=await this.photorepo
            .createQueryBuilder("photo")
            .innerJoin("photo.user", "user")
            .delete()
            .from(User)
            .where("id = :id", { id: element.id })
            .execute();
            

        })

      
    }
    async update(id:number,name: string, photo: string, photo1: string) {
      //  console.log(id,name,photo,photo1)
        var num2=1;
        const users = await 
            this.userrepo
            .createQueryBuilder("user")
            .innerJoin("user.photos", "photo")
            .update()
            .set({"name": name })
            .where("id = :id", { id: id })
            .execute();

            /*this.photorepo
            .createQueryBuilder("photo")
            .innerJoin("photo.user", "user")
            .update()
            .set({"url":[photo,photo1]})
            .where("userId = :userId", { userId: id })
            .execute();*/
            const users1=await this.userrepo.findOne(id,{relations:['photos']});
            
            //console.log(users1);
            const num = users1.photos;
            num.forEach(element => {
                console.log(element.id);
         
          if(num2===1){
          console.log(num2)

                this.photorepo
                .createQueryBuilder("photo")
                .innerJoin("photo.user", "user")
                .update()
                .set({"url":photo})
                
                .where("id = :id", { id: element.id })
                .execute();
                num2=num2*0;
          }
          else if (num2===0){
          console.log(num2)
            this.photorepo
            .createQueryBuilder("photo")
            .innerJoin("photo.user", "user")
            .update()
            .set({"url":photo1})
            
            .where("id = :id", { id: element.id })
            .execute();
   
      }
            });
            /*
            this.photorepo
            .createQueryBuilder("photo")
            .innerJoin("photo.user", "user")
            .update()
            .set({"url":photo})
            .where("id = :id", { id: users1.id })
            .execute();
           // console.log(users1.id)
            


            this.photorepo
            .createQueryBuilder("photo")
            .innerJoin("photo.user", "user")
            .update()
            .set({"url":photo1})
            .where("id = :id", { id: users1.id+1 })
            .execute();
            //console.log(users1.id+1)
*/
    }

}


