import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import CreateCourseDto from './course/create-course-dto';
import UpdateCourseDto from './course/update-course-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getCourses() {
    return this.appService.getCourses();
  }

  @Get(':id')
  findCourse(@Param('id') id: string) {
    return this.appService.findCourse(id);
  }

  @Post()
  createCourse(@Body() course: CreateCourseDto) {
    return this.appService.createCourse(course);
  }

  @Put(':id')
  updateCourse(@Param('id') id: string, @Body() course: UpdateCourseDto) {
    return this.appService.updateCourse(id, course);
  }

  @Delete(':id')
  deleteCourse(@Param('id') id: number) {
    return this.appService.deleteCourse(id);
  }
}
