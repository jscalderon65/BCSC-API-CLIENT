import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { StateService } from './state.service';
import { State, nameSchema } from './schemas/state.schema';
import { CreateStateDtoStub } from '../utils/stubs/state.stub';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';

describe('StateService', () => {
  let service: StateService;

  const mockDocumentState = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        {
          provide: getModelToken(nameSchema),
          useValue: mockDocumentState,
        },
      ],
    }).compile();

    service = module.get<StateService>(StateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a state', async () => {
    const createDocumentDto = CreateStateDtoStub();

    const mockCreatedState: State = {
      name: createDocumentDto.name,
    };

    mockDocumentState.create.mockResolvedValue(mockCreatedState);

    const result = await service.create(createDocumentDto);

    expect(mockDocumentState.create).toHaveBeenCalledWith(createDocumentDto);

    expect(result).toEqual(mockCreatedState);
  });

  it('should find all states', async () => {
    const mockQuery = {};
    const mockFoundStates: State[] = [
      CreateStateDtoStub(),
      CreateStateDtoStub(),
    ];

    mockDocumentState.find.mockResolvedValue(mockFoundStates);

    const result = await service.findAll({ query: mockQuery } as any);

    expect(result).toEqual(mockFoundStates);
  });

  it('should find one state by id', async () => {
    const id = faker.string.uuid();
    const mockFoundState: State = CreateStateDtoStub();

    mockDocumentState.findById.mockResolvedValue(mockFoundState);

    const result = await service.findOne(id);

    expect(result).toEqual(mockFoundState);
  });

  it('should throw NotFoundException when document is not found in findOne service', async () => {
    const id = faker.string.uuid();
    mockDocumentState.findById.mockResolvedValue(null);
    try {
      await service.findOne(id);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should update a state', async () => {
    const id = faker.string.uuid();
    const updateStateDto = CreateStateDtoStub();
    const mockUpdatedState: State = CreateStateDtoStub();

    mockDocumentState.findOneAndUpdate.mockResolvedValue(mockUpdatedState);

    const result = await service.update(id, updateStateDto);

    expect(mockDocumentState.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: id },
      updateStateDto,
      { new: true },
    );
    expect(result).toEqual(mockUpdatedState);
  });

  it('should throw NotFoundException when document is not found in update service', async () => {
    const id = faker.string.uuid();
    mockDocumentState.findOneAndUpdate.mockResolvedValue(null);

    try {
      await service.update(id, CreateStateDtoStub());
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should remove a state', async () => {
    const id = faker.string.uuid();
    const mockDeletedDocument: State = CreateStateDtoStub();

    mockDocumentState.findByIdAndDelete.mockResolvedValue(mockDeletedDocument);

    const result = await service.remove(id);

    expect(result).toEqual(mockDeletedDocument);
  });

  it('should throw NotFoundException when document is not found in remove service', async () => {
    const id = faker.string.uuid();
    mockDocumentState.findByIdAndDelete.mockResolvedValue(null);

    try {
      await service.remove(id);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
