import { useQuery } from 'react-query'

import { UserService } from '@/services/user.service'

export const useFavorites = () => {
	const {
		isLoading,
		data: favoriteMovies,
		refetch,
	} = useQuery('favorite movies', () => UserService.getFavorites(), {
		// onSuccess: () => {
		// 	console.log(favoriteMovies)
		// },
		select: ({ data }) => data,
	})

	return {
		isLoading,
		favoriteMovies,
		refetch,
	}
}
