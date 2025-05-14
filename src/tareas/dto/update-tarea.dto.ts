// src/tareas/dto/update-tarea.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateTareaDto } from './create-tarea.dto';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateTareaDto extends PartialType(CreateTareaDto) {
  @IsString()
  @IsNotEmpty({ message: 'El título es requerido' })
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty({ message: 'El contenido es requerido' })
  @IsOptional()
  content?: string;

  @IsOptional()
  completed?: boolean;
}