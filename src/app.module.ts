import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModel, CourseSchema } from './course/course-schema';

function getConectionMongo(): string {
  return `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost/${process.env.DB_DATABASE}`;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV
        ? `.${process.env.NODE_ENV}.env`
        : '.development.env',
    }),
    MongooseModule.forRoot(getConectionMongo(), {
      useNewUrlParser: true,
    }),
    MongooseModule.forFeature([{ name: CourseModel.name, schema: CourseSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
