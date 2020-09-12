import { Injectable } from '@nestjs/common';

// Recomendación pasar enum e interfaces a archivos dedicados a tal fin
export enum State {
  wait,
  progress,
  completed
}

export interface ICourseKey {
  id:number;
}

export interface ICourseAttributes {
  name: string;
  state: State;
}

export interface ICourse extends ICourseKey, ICourseAttributes {}

@Injectable()
export class AppService {

  private courses: ICourse[] = []

  async getCourses(): Promise<ICourse[]>{
    return this.courses
  }

  async findCourse( id: number): Promise<ICourse>{
    return this.courses.find((item) => item.id == <number>id)
  }

  async createCourse( course: ICourseAttributes ): Promise<ICourse>{

    const idNext = (this.courses.length)? this.courses[this.courses.length - 1].id + 1: 1
    const newLength = this.courses.push({ id:idNext, ...course })

    return this.courses[newLength - 1]
  }

  async updateCourse( id: number, course: ICourseAttributes ): Promise<ICourse>{

    const updateIndex: number = this.courses.findIndex(item => item.id == <number>id)
    this.courses[updateIndex].name = course.name
    this.courses[updateIndex].state = course.state

    return this.courses[updateIndex]
  }

  async deleteCourse(id: number): Promise<ICourse> {

    const startIndex:number = this.courses.findIndex(item => item.id === id)
    const deleteCourse = this.courses.splice(startIndex, 1)

    return deleteCourse[0]
  }
  
}

