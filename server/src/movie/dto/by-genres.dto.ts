import { IsArray, MinLength } from 'class-validator'
import { Types } from 'mongoose'

export class byGenresDto {
	@IsArray()
	genreIds: Types.ObjectId[]
}
