import {
  Req,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { ParseObjectIdPipe } from '../utils/pipes/parse-object-id-pipe.pipe';
import { ApiTags } from '@nestjs/swagger';

@Controller('state')
@ApiTags('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  create(@Body() createStateDto: CreateStateDto) {
    return this.stateService.create(createStateDto);
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.stateService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.stateService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateStateDto: UpdateStateDto,
  ) {
    return this.stateService.update(id, updateStateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.stateService.remove(id);
  }
}
