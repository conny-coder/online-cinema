import Heading from '@/components/ui/Heading/Heading'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

import Meta from '@/utils/meta/Meta'

import { useAuth } from '@/hooks/useAuth'

import FavoriteItem from './FavoriteItem'
import styles from './Favorites.module.scss'
import { useFavorites } from './useFavorites'

const Favorites = () => {
	const { favoriteMovies, isLoading } = useFavorites()

	const { user } = useAuth()

	if (!user) return null

	return (
		<Meta title="Favorites">
			<Heading title="Favorites" />
			<section className={styles.favorites}>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						className={styles.skeletonLoader}
						containerClassName={styles.containerLoader}
					/>
				) : (
					favoriteMovies?.map((movie) => (
						<FavoriteItem key={movie._id} movie={movie} />
					))
				)}
			</section>
		</Meta>
	)
}
export default Favorites
