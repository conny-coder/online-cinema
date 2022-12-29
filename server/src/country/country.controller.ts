import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CountryService } from './country.service'

@Controller('countries')
export class CountryController {
	constructor(private readonly countryService: CountryService) {}

	@Post()
	@Auth('admin')
	async create(@Body('name') name: string) {
		return this.countryService.create(name)
	}

	@UsePipes(new ValidationPipe())
	@Get(':id')
	async getCountry(@Param('id') _id: Types.ObjectId) {
		return this.countryService.getCountry(_id)
	}

	@Get()
	async getAll() {
		return this.countryService.getAll()
	}
}
