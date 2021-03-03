import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Photo } from './photo.entity';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userservice: UserService) {

    }
    @Get()
    GetAll(): Promise<User[]> {
        return this.userservice.getall();
    }
    @Get("/:id")
    Getbyid(@Param("id", ParseIntPipe) id: number): Promise<User> {
        return this.userservice.getByid(id);
    }
    @Get("photo/:id")
    Getphoto(@Param("id", ParseIntPipe) id: number): Promise<Photo> {
        return this.userservice.getphoto(id);
    }
    @Post()
    create(
        @Body("name") name: string, @Body("url") photo: string, @Body("url1") photo1: string
    ) {
        console.log(name, photo, photo1);
        this.userservice.create(name, photo, photo1);
    }
    @Delete("/:id")
    Delete(@Param("id", ParseIntPipe) id: number) {
        this.userservice.Delete(id);
    }
    @Put("/:id")
    Update(@Param("id", ParseIntPipe) id: number, @Body("name") name: string, @Body("url") photo: string, @Body("url1") photo1: string) {
        this.userservice.update(id, name, photo, photo1)
    }

}

