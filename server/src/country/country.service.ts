import { Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { CountryModel } from './country.model'

@Injectable()
export class CountryService {
	constructor(
		@InjectModel(CountryModel)
		private readonly CountryModel: ModelType<CountryModel>
	) {}

	async create(name: string) {
		return this.CountryModel.create({
			name,
		})
	}

	async getAll() {
		return this.CountryModel.find().exec()
	}

	async getCountry(_id: Types.ObjectId) {
		return this.CountryModel.findById(_id).exec()
	}
}
