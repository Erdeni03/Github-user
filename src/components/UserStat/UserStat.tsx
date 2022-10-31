import { GithubUser } from 'types/user.types'

import s from './UserStat.module.scss'

export interface UserStatProps
	extends Pick<GithubUser, 'public_repos' | 'followers' | 'following'> {
	public_repos: number
	followers: number
	following: number
}
const UserStat = ({ public_repos, followers, following }: UserStatProps) => {
	return (
		<div className={s.user}>
			<div className={s.info}>
				<div className={s.infoTitle}>Repos</div>
				<div className={s.infoNumber}>{public_repos}</div>
			</div>
			<div className={s.info}>
				<div className={s.infoTitle}>Following</div>
				<div className={s.infoNumber}>{following}</div>
			</div>
			<div className={s.info}>
				<div className={s.infoTitle}>Followers</div>
				<div className={s.infoNumber}>{followers}</div>
			</div>
		</div>
	)
}

export default UserStat
