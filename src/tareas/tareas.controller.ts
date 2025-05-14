// src/tareas/tareas.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  
  import { TareasService } from './tareas.service';
  import { Tarea } from './entities/tarea.entity';
  import { CreateTareaDto } from './dto/create-tarea.dto';
  import { UpdateTareaDto } from './dto/update-tarea.dto';
  
  @Controller('tareas')
  export class TareasController {
    constructor(private readonly tareasService: TareasService) {}
  
    @Post()
    async create(@Body() createTareaDto: CreateTareaDto): Promise<Tarea> {
      return await this.tareasService.create(createTareaDto);
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Tarea> {
      return await this.tareasService.findOne(+id);
    }
  
    @Get()
    async findAll(): Promise<Tarea[]> {
      return await this.tareasService.findAll();
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateTareaDto: UpdateTareaDto,
    ): Promise<Tarea> {
      return await this.tareasService.update(+id, updateTareaDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
      return await this.tareasService.remove(+id);
    }
  }