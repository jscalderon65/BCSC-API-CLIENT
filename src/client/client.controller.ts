import { Request } from 'express';
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
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '../utils/pipes/parse-object-id-pipe.pipe';
import { CreateBankingAccountDto } from '../banking_account/dto/create-banking_account.dto';
@Controller('client')
@ApiTags('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Post('/new-banking-account')
  associateBankingAccount(
    @Body() createBankingAccountDto: CreateBankingAccountDto,
  ) {
    return this.clientService.createBankingAccountForClient(
      createBankingAccountDto,
    );
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.clientService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.clientService.remove(id);
  }
}
