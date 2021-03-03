import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userrepo } from './user.reposetory';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Photorepo } from './photo.reposetory';



@Module({
    imports:[TypeOrmModule.forFeature([Userrepo,Photorepo]),

    ],
    providers: [UserService],
    controllers: [UserController],
    
})
export class UserModule {
    
}
