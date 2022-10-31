import classNames from 'classnames'
import { FC, ReactNode } from 'react'

import s from './Card.module.scss'

const Card: FC<{ children: ReactNode; className?: string }> = ({
	children,
	className
}) => {
	return <div className={classNames(s.card, className)}>{children}</div>
}

export default Card
