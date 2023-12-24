import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { messages } from '../utils/constants/messages';
import { State, StateDocument } from './schemas/state.schema';
import { mongoDb } from '../utils/constants/mongoDb';

const { STATE } = mongoDb.SCHEMA_NAMES;
const RESPONSE_MESSAGES = messages.RESPONSE_MESSAGES;

@Injectable()
export class StateService {
  private readonly entityName: string = STATE;

  constructor(
    @InjectModel(STATE)
    private readonly stateModel: Model<StateDocument>,
  ) {}

  create(createStateDto: CreateStateDto): Promise<State> {
    return this.stateModel.create(createStateDto);
  }

  findAll(request: Request): Promise<State[]> {
    return this.stateModel.find(request.query);
  }

  async findOne(id: string) {
    const state = await this.stateModel.findById(id);
    if (!state) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }
    return state;
  }

  async update(id: string, updateStateDto: UpdateStateDto) {
    const state = await this.stateModel.findOneAndUpdate(
      { _id: id },
      updateStateDto,
      {
        new: true,
      },
    );
    if (!state) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }

    return state;
  }

  async remove(id: string) {
    const state = await this.stateModel.findByIdAndDelete(id);
    if (!state) {
      throw new NotFoundException(
        RESPONSE_MESSAGES.NOT_FOUND_BY_ID(this.entityName, id),
      );
    }

    return state;
  }
}
