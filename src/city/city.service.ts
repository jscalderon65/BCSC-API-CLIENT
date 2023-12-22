import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City, CityDocument } from './schemas/city.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { messages } from '../utils/constants/messages';
import { Request } from 'express';
import { StateService } from '../state/state.service';
import { State } from '../state/schemas/state.schema';

const RESPONSE_MESSAGES = messages.RESPONSE_MESSAGES;

@Injectable()
export class CityService {
  private readonly entityName: string = City.name;

  constructor(
    @InjectModel(City.name)
    private readonly cityModel: Model<CityDocument>,
    private readonly stateService: StateService,
  ) {}

  async isValidStateId(stateId: string): Promise<boolean> {
    try {
      const state = await this.stateService.findOne(stateId);
      return !!state;
    } catch (error) {
      return false;
    }
  }

  async create(createCityDto: CreateCityDto): Promise<City> {
    const stateValidation = await this.isValidStateId(createCityDto.state_id);
    if (!stateValidation) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(State.name, createCityDto.state_id),
      );
    }
    const newCity = await this.cityModel.create(createCityDto);

    return this.findOne(newCity._id);
  }

  findAll(request: Request): Promise<City[]> {
    return this.cityModel.find(request.query).populate('state_id');
  }

  async findOne(id: string) {
    const city = await this.cityModel.findById(id).populate('state_id');
    if (!city) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }
    return city;
  }

  async update(id: string, updateCityDto: UpdateCityDto) {
    const city = await this.cityModel
      .findOneAndUpdate({ _id: id }, updateCityDto, {
        new: true,
      })
      .populate('state_id');
    if (!city) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }

    return city;
  }

  async remove(id: string) {
    const city = await this.cityModel
      .findByIdAndDelete(id)
      .populate('state_id');
    if (!city) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }

    return city;
  }
}
