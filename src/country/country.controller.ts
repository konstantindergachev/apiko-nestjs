import { Controller, Get } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('location')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('countries')
  async getAll(): Promise<string[]> {
    return await this.countryService.all();
  }
}
