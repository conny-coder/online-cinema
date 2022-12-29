import { FC } from 'react'

interface ISubHeading {
	title: string
}

const SubHeading: FC<ISubHeading> = ({ title }) => {
	return <h1 className={`text-white text-xl mb-5 font-semibold`}>{title}</h1>
}
export default SubHeading
