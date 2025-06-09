// src/tareas/tareas.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TareasController } from './tareas.controller';
import { TareasService } from './tareas.service';
import { Tarea } from './entities/tarea.entity';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { NotFoundException } from '@nestjs/common';

describe('TareasController', () => {
  let controller: TareasController;
  let service: TareasService;

  const mockTarea: Tarea = {
    id: 1,
    title: 'Título de prueba',
    content: 'Contenido de prueba',
    completed: false,
    created_at: new Date(),
  };

  const mockTareasService = {
    create: jest.fn().mockResolvedValue(mockTarea),
    findAll: jest.fn().mockResolvedValue([mockTarea]),
    findOne: jest.fn().mockResolvedValue(mockTarea),
    update: jest.fn().mockResolvedValue(mockTarea),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TareasController],
      providers: [
        {
          provide: TareasService,
          useValue: mockTareasService,
        },
      ],
    }).compile();

    controller = module.get<TareasController>(TareasController);
    service = module.get<TareasService>(TareasService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('debería crear una nueva tarea', async () => {
      const createTareaDto: CreateTareaDto = {
        title: 'Título de prueba',
        content: 'Contenido de prueba',
      };

      const result = await controller.create(createTareaDto);

      expect(service.create).toHaveBeenCalledWith(createTareaDto);
      expect(result).toEqual(mockTarea);
    });
  });

  describe('findAll', () => {
    it('debería devolver un arreglo de tareas', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockTarea]);
    });
  });

  describe('findOne', () => {
    it('debería devolver una tarea por ID', async () => {
      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockTarea);
    });

    it('debería lanzar error si no encuentra la tarea', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new NotFoundException());

      await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debería actualizar una tarea existente', async () => {
      const updateTareaDto: UpdateTareaDto = { title: 'Título actualizado' };
      
      const result = await controller.update('1', updateTareaDto);

      expect(service.update).toHaveBeenCalledWith(1, updateTareaDto);
      expect(result).toEqual(mockTarea);
    });

    it('debería lanzar error si no encuentra la tarea para actualizar', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new NotFoundException());

      await expect(controller.update('999', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('debería eliminar una tarea existente', async () => {
      await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('debería lanzar error si no encuentra la tarea para eliminar', async () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new NotFoundException());

      await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
    });
  });
});
