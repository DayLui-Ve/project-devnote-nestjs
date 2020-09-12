import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AppService, ICourseAttributes } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get()
  getCourses(){
    return this.appService.getCourses()
  }
  
  @Get(':id')
  findCourse(@Param('id') id:number){
    return this.appService.findCourse(id)
  }

  @Post()
  createCourse(@Body() course:ICourseAttributes){
    return this.appService.createCourse(course)
  }

  @Put(':id')
  updateCourse(@Param('id') id:number, @Body() course:ICourseAttributes){
    return this.appService.updateCourse(id, course)
  }

  @Delete(':id')
  deleteCourse(@Param('id') id:number){
    return this.appService.deleteCourse(id)
  }
}
