// src/tareas/dto/create-tarea.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTareaDto {
  @IsString()
  @IsNotEmpty({ message: 'El título es requerido' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'El contenido es requerido' })
  content: string;
}