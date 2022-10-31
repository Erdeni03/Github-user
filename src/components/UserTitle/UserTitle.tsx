import { GithubUser } from 'types/user.types'

import s from './UserTitle.module.scss'

interface UserTitleProps
	extends Pick<GithubUser, 'name' | 'login' | 'created_at'> {}

const localDate = new Intl.DateTimeFormat('en-GB', {
	day: 'numeric',
	month: 'short',
	year: 'numeric'
})

const UserTitle = ({ created_at, name, login }: UserTitleProps) => {
	const joinedDate = localDate.format(new Date(created_at))

	return (
		<div className={s.userTitle}>
			<h2>{name}</h2>
			<h3>{login}</h3>
			<span>{joinedDate}</span>
		</div>
	)
}

export default UserTitle
