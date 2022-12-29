import GenreEdit from '@/components/screens/admin/genre/GenreEdit'
import { NextPageAuth } from 'providers/AuthProvider/auth.types'

const GenreEditPage: NextPageAuth = () => {
	return <GenreEdit />
}

GenreEditPage.isOnlyAdmin = true

export default GenreEditPage
