import { useQuery } from 'react-query'

import { IOption } from '@/components/ui/Select/select.interface'

import { toastError } from '@/utils/toast-error'

import { ActorService } from '@/services/actor.service'

export const useAdminActors = () => {
	const queryData = useQuery('List of Actors', () => ActorService.getAll(), {
		select: ({ data }) =>
			data.map(
				(actor): IOption => ({
					label: actor.name,
					value: actor._id,
				})
			),
		onError: (error) => {
			toastError(error, 'Actor list')
		},
	})

	return queryData
}
