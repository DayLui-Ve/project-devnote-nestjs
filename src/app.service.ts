import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseModel } from './course/course-schema';

// Recomendación pasar enum e interfaces a archivos dedicados a tal fin
export enum State {
  wait,
  progress,
  completed
}

export interface ICourseKey {
  // id:number;
  _id:string;
}

export interface ICourseAttributes {
  name: string;
  state: State;
}

export interface ICourse extends ICourseKey, ICourseAttributes {}

@Injectable()
export class AppService {
  
  constructor(@InjectModel(CourseModel.name) private courseModel: Model<CourseModel>) {}

  async getCourses(): Promise<ICourse[]> {
    return this.courseModel.find({});
  }

  async findCourse(id: string): Promise<ICourse> {
    return this.courseModel.findById(id);
  }

  async createCourse(course: ICourseAttributes): Promise<ICourse> {
    const createdCourse = new this.courseModel(course);
    return createdCourse.save();
  }

  async updateCourse(id: string, course: ICourseAttributes): Promise<ICourse> {
    const updateResult = await this.courseModel.updateOne({ _id: id }, course);
    if (updateResult.ok == 0) {
      throw new HttpException('Error al actualizar curso', 400);
    }
    if (updateResult.ok == 1 && updateResult.nModified == 0) {
      throw new HttpException('Curso no actualizado o no existe', 400);
    }
    return this.courseModel.findById(id);
  }

  async deleteCourse(id: number): Promise<ICourse> {
    const course = await this.courseModel.findById(id);
    if (course) {
      const deleteResult = await this.courseModel.deleteOne({ _id: id });
      if ( deleteResult.deletedCount != 1  ) {
        throw new HttpException('Error al eliminar curso', 400);
      }
      return course;
    }

    throw new HttpException('Curso no existe', 400);
  }
}

