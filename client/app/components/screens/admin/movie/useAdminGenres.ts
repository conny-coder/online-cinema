import { useQuery } from 'react-query'

import { IOption } from '@/components/ui/Select/select.interface'

import { toastError } from '@/utils/toast-error'

import { GenreService } from '@/services/genre.service'

export const useAdminGenres = () => {
	const queryData = useQuery('List of genres', () => GenreService.getAll(), {
		select: ({ data }) =>
			data.map(
				(genre): IOption => ({
					label: genre.name,
					value: genre._id,
				})
			),
		onError: (error) => {
			toastError(error, 'Actor list')
		},
	})

	return queryData
}
