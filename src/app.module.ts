import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '9145',
    database: 'arbaz1',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
