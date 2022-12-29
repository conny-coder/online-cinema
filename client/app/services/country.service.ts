import axios from 'api/interceptors'

import { ICountry } from '@/shared/types/movie.types'

export const CountryService = {
	async getAll() {
		return axios.get<ICountry[]>('/countries/')
	},
}
