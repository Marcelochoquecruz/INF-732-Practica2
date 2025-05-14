// src/tareas/tareas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TareasController } from './tareas.controller';
import { TareasService } from './tareas.service';
import { Tarea } from './entities/tarea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tarea])],
  controllers: [TareasController],
  providers: [TareasService],
})
export class TareasModule {}