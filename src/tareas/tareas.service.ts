// src/tareas/tareas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './entities/tarea.entity';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';


@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
  ) {}

  async create(createTareaDto: CreateTareaDto): Promise<Tarea> {
    const nuevaTarea = this.tareaRepository.create(createTareaDto);
    return await this.tareaRepository.save(nuevaTarea);
  }

  async findAll(): Promise<Tarea[]> {
    return await this.tareaRepository.find();
  }

  async findOne(id: number): Promise<Tarea> {
    const tarea = await this.tareaRepository.findOneBy({ id });
    if (!tarea) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    return tarea;
  }

  async update(id: number, updateTareaDto: UpdateTareaDto): Promise<Tarea> {
    const result = await this.tareaRepository.update(id, updateTareaDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tareaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
  }
}