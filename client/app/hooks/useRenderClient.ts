import { useEffect, useState } from 'react'

export const useRenderClient = () => {
	const [isRenderClient, setIsRendeRClient] = useState(false)

	useEffect(() => {
		!isRenderClient && setIsRendeRClient(true)
	}, [isRenderClient])

	return { isRenderClient }
}
