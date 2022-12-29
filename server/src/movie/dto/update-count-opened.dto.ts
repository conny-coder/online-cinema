import { IsString } from 'class-validator'

export class updateCountOpenedDto {
	@IsString()
	slug: string
}
