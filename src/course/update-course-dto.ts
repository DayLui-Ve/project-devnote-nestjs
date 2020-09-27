import { IsString, MaxLength, IsNotEmpty, IsEnum } from 'class-validator';
import { State } from '../app.service';

class UpdateCourseDto {
  @IsString({
    message: messageProperty('debe ser una cadena de texto'),
  })
  @MaxLength(20, {
    message: messageProperty('debe ser máximo $constraint1 caracteres'),
  })
  @IsNotEmpty({
    message: messageProperty('es requerido'),
  })
  name: string;

  @IsNotEmpty({
    message: messageProperty('es requerido'),
  })
  @IsEnum(State, {
    message: messageProperty('no es válido'),
  })
  state: State;
}

function messageProperty(message: string): string {
  return `La propiedad $property ${message}`;
}

export default UpdateCourseDto;
