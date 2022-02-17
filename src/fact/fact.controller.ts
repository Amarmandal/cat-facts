import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Admin } from 'src/common/decorators/metadata/admin.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { CreateFactDto } from './dto/create-fact.dto';
import { FilterFactDto } from './dto/filter-fact.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Fact } from './fact.entity';
import { FactService } from './fact.service';

@Controller('facts')
@UseGuards(AuthGuard())
export class FactController {
  constructor(private readonly factService: FactService) {}

  @Get()
  async getFact(@Query() filterFactDto: FilterFactDto): Promise<Fact[]> {
    return this.factService.getFacts(filterFactDto);
  }

  //own the fact
  @Post()
  @Admin(true)
  @UseGuards(AdminGuard)
  async createFact(
    @GetUser() user: User,
    @Body() createFactDto: CreateFactDto,
  ): Promise<Fact> {
    return this.factService.createFact(createFactDto, user);
  }

  @Patch(':id/status')
  @Admin(true)
  @UseGuards(AdminGuard)
  updateStatus(
    @Body() updateStatusDto: UpdateStatusDto,
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<string> {
    return this.factService.updateFactStatus(updateStatusDto, id, user);
  }

  @Delete(':id')
  @Admin(true)
  @UseGuards(AdminGuard)
  async deleteFact(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<string> {
    return this.factService.deleteFact(id, user);
  }
}
