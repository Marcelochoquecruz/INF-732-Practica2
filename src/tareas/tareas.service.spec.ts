// src/tareas/tareas.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TareasService } from './tareas.service';
import { Repository } from 'typeorm';
import { Tarea } from './entities/tarea.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';

describe('TareasService', () => {
  let service: TareasService;
  let repository: Repository<Tarea>;

  const mockTarea: Tarea = {
    id: 1,
    title: 'Título de prueba',
    content: 'Contenido de prueba',
    completed: false,
    created_at: new Date(),
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockTarea),
    save: jest.fn().mockResolvedValue(mockTarea),
    find: jest.fn().mockResolvedValue([mockTarea]),
    findOneBy: jest.fn().mockResolvedValue(mockTarea),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TareasService,
        {
          provide: getRepositoryToken(Tarea),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TareasService>(TareasService);
    repository = module.get<Repository<Tarea>>(getRepositoryToken(Tarea));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear una nueva tarea', async () => {
    const dto: CreateTareaDto = { title: 'Nueva', content: 'Contenido' };
    const result = await service.create(dto);

    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalledWith(mockTarea);
    expect(result).toEqual(mockTarea);
  });

  it('debería devolver todas las tareas', async () => {
    const result = await service.findAll();
    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual([mockTarea]);
  });

  it('debería devolver una tarea por ID', async () => {
    const result = await service.findOne(1);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(result).toEqual(mockTarea);
  });

  it('debería lanzar error si no encuentra la tarea (findOne)', async () => {
    repository.findOneBy = jest.fn().mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('debería actualizar una tarea existente', async () => {
    const dto: UpdateTareaDto = { title: 'Actualizada' };
    repository.findOneBy = jest.fn().mockResolvedValue(mockTarea);

    const result = await service.update(1, dto);

    expect(repository.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual(mockTarea);
  });

  it('debería lanzar error si no encuentra la tarea (update)', async () => {
    repository.update = jest.fn().mockResolvedValue({ affected: 0 });

    await expect(service.update(999, { title: 'x' })).rejects.toThrow(NotFoundException);
  });

  it('debería eliminar una tarea existente', async () => {
    const result = await service.remove(1);

    expect(repository.delete).toHaveBeenCalledWith(1);
    expect(result).toBeUndefined();
  });

  it('debería lanzar error si no encuentra la tarea (remove)', async () => {
    repository.delete = jest.fn().mockResolvedValue({ affected: 0 });

    await expect(service.remove(999)).rejects.toThrow(NotFoundException);
  });
});
