import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { getModelToken } from '@nestjs/mongoose';
import { StateService } from '../state/state.service';
import { CreateCityDtoWithObjectIdStub } from '../utils/stubs/city.stub';
import { NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { mongoDb } from '../utils/constants/mongoDb';

const { CITY } = mongoDb.SCHEMA_NAMES;

describe('CityService', () => {
  let service: CityService;
  const globalDocumentMock = CreateCityDtoWithObjectIdStub();
  const validId = 'validStateId';
  const inValidId = 'inValidStateId';

  const mockDocumentCity = {
    create: jest.fn(),
    find: () => ({
      populate: jest.fn().mockImplementation(() => {
        return [{ name: globalDocumentMock.dto.name, state_id: validId }];
      }),
    }),
    findById: () => ({
      populate: jest.fn().mockImplementation(() => {
        return { name: globalDocumentMock.dto.name, state_id: validId };
      }),
    }),
    findOneAndUpdate: () => ({
      populate: jest.fn().mockImplementation(() => {
        return { name: globalDocumentMock.dto.name, state_id: validId };
      }),
    }),
    findByIdAndDelete: () => ({
      populate: jest.fn().mockImplementation(() => {
        return { name: globalDocumentMock.dto.name, state_id: validId };
      }),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: getModelToken(CITY),
          useValue: mockDocumentCity,
        },
        {
          provide: StateService,
          useValue: {
            findOne: jest.fn().mockImplementation(async (stateId: string) => {
              return stateId === validId;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return true if state exists', async () => {
    const isValid = await service.isValidStateId(validId);
    expect(isValid).toBe(true);
  });

  it('should return false if state does not exist', async () => {
    const isValid = await service.isValidStateId(inValidId);
    expect(isValid).toBe(false);
  });

  it('should create a city when state exists', async () => {
    const createdDocumentDto = globalDocumentMock;

    const createdDocumentDtoValue = {
      name: createdDocumentDto.dto.name,
      state_id: validId,
    };

    const mockCreatedCity: CreateCityDto = {
      name: createdDocumentDtoValue.name,
      state_id: createdDocumentDtoValue.state_id,
    };

    mockDocumentCity.create.mockResolvedValue(mockCreatedCity);

    const result = await service.create(createdDocumentDtoValue);

    expect(mockDocumentCity.create).toHaveBeenCalledWith(
      createdDocumentDtoValue,
    );
    expect(result).toEqual(mockCreatedCity);
  });

  it('should throw NotFoundException when document is not found in findOne service', async () => {
    const createdDocumentDto = CreateCityDtoWithObjectIdStub();
    const createdDocumentDtoValue = createdDocumentDto.dto;
    mockDocumentCity.create.mockResolvedValue(null);
    try {
      await service.create(createdDocumentDtoValue);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should find all cities', async () => {
    const mockQuery = {};
    const mockFoundCities: CreateCityDto[] = [
      { name: globalDocumentMock.dto.name, state_id: validId },
    ];

    mockDocumentCity.find().populate.mockResolvedValue(mockFoundCities);

    const result = await service.findAll({ query: mockQuery } as any);

    expect(result).toEqual(mockFoundCities);
  });

  it('should find one city by id', async () => {
    const id = globalDocumentMock.dto.state_id;
    const mockFoundState: CreateCityDto = {
      name: globalDocumentMock.dto.name,
      state_id: validId,
    };

    mockDocumentCity.findById().populate(mockFoundState);

    const result = await service.findOne(id);

    expect(result).toEqual(mockFoundState);
  });

  it('should throw NotFoundException when document is not found in findOne service', async () => {
    const id = globalDocumentMock.dto.state_id;
    mockDocumentCity.findById().populate.mockResolvedValue(null);
    try {
      await service.findOne(id);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should update a city', async () => {
    const id = globalDocumentMock.dto.state_id;
    const updateStateDto = CreateCityDtoWithObjectIdStub().dto;

    const mockUpdatedCity: CreateCityDto = {
      name: globalDocumentMock.dto.name,
      state_id: validId,
    };

    mockDocumentCity.findOneAndUpdate().populate();

    const result = await service.update(id, updateStateDto);

    expect(result).toEqual(mockUpdatedCity);
  });

  it('should throw NotFoundException when document is not found in update service', async () => {
    const id = globalDocumentMock.dto.state_id;
    mockDocumentCity.findOneAndUpdate().populate.mockResolvedValue(null);

    try {
      await service.update(id, CreateCityDtoWithObjectIdStub().dto);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should remove a city', async () => {
    const id = globalDocumentMock.dto.state_id;
    const mockDeletedDocument: CreateCityDto = {
      name: globalDocumentMock.dto.name,
      state_id: validId,
    };

    mockDocumentCity.findByIdAndDelete().populate();

    const result = await service.remove(id);

    expect(result).toEqual(mockDeletedDocument);
  });

  it('should throw NotFoundException when document is not found in remove service', async () => {
    const id = globalDocumentMock.dto.state_id;
    mockDocumentCity.findByIdAndDelete().populate.mockResolvedValue(null);

    try {
      await service.remove(id);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
