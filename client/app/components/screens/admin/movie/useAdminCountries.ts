import { useQuery } from 'react-query'

import { IOption } from '@/components/ui/Select/select.interface'

import { toastError } from '@/utils/toast-error'

import { CountryService } from '@/services/country.service'

export const useAdminCountries = () => {
	const queryData = useQuery(
		'List of countries',
		() => CountryService.getAll(),
		{
			select: ({ data }) =>
				data.map(
					(country): IOption => ({
						label: country.name,
						value: country._id,
					})
				),
			onError: (error) => {
				toastError(error, 'Country list')
			},
		}
	)

	return queryData
}
