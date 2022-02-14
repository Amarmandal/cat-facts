import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Admin } from 'src/common/decorators/metadata/admin.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('facts')
@UseGuards(AuthGuard())
export class FactController {
  @Get()
  async getFact() {
    return 'Fetching fact from database...';
  }

  //own the fact
  @Post()
  @Admin(true)
  @UseGuards(AdminGuard)
  async createFact() {
    return 'Taks created';
  }

  @Patch(':id/status')
  @Admin(true)
  @UseGuards(AdminGuard)
  async updateStatus() {
    return 'Updating status...';
  }

  @Delete(':id')
  @Admin(true)
  @UseGuards(AdminGuard)
  async deleteFact() {
    return 'Deleting Taks....';
  }
}
