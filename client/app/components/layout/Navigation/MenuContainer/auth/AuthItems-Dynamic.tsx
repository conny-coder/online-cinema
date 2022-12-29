import dynamic from 'next/dynamic'

const AuthItemsDynamic = dynamic(() => import('./AuthItems'), { ssr: false })
export default AuthItemsDynamic
