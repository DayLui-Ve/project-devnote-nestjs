import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { State } from 'src/app.service';

@Schema({
  collection: 'courses',
})
class CourseModel extends Document {
  @Prop({
        type: String,
        required: true,
  })
  name: string;

  @Prop({
        type: String,
        required: true,
        enum: [ 'completed', 'progress', 'wait' ]
  })
  state: State;
}

const CourseSchema = SchemaFactory.createForClass(CourseModel);

export {
    CourseModel, 
    CourseSchema
}
