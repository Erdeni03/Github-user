import classNames from 'classnames'
import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import Card from 'components/Card/Card'
import Table from 'components/Table/Table'
import UserStat from 'components/UserStat/UserStat'
import UserTitle from 'components/UserTitle/UserTitle'

import { useAppDispatch } from 'hooks/useAppDispatch'

import { githubState } from 'store/github-selectors'
import { loadRepos, loadUser, setStatus } from 'store/slice/user-slice'

import s from './UserView.module.scss'

const UserView: FC = () => {
	const {
		user: { user, repos }
	} = useSelector(githubState)

	const navigate = useNavigate()
	const { id } = useParams()
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (id) {
			dispatch(loadUser(id))
			dispatch(loadRepos(id))
			dispatch(setStatus('idle'))
		}
	}, [id])

	const tableBodyRender =
		repos &&
		repos.map(item => (
			<tr
				key={item.id}
				onClick={() => navigate(`/user/${user?.login}/${item.name}`)}
			>
				<td className='text-center'>{item.name || '-'}</td>
				<td className='text-center'>{item.language || '-'}</td>
				<td className='text-center'>{item.description || '-'}</td>
				<td className='text-center'>{item.stargazers_count}</td>
			</tr>
		))
	return (
		<>
			{user && (
				<Card>
					<img src={user?.avatar_url} alt={user.login} className={s.avatar} />
					<UserTitle
						login={user.login}
						name={user.name}
						created_at={user.created_at}
					/>
					<p
						className={classNames(s.bio, {
							[s.empty]: user.bio
						})}
					>
						{user.bio || 'This profile has no bio'}
					</p>
					<UserStat
						public_repos={user.public_repos}
						followers={user.followers}
						following={user.following}
					/>
					{repos.length > 0 && (
						<Table heading={['name', 'Language', 'Description', 'Star']}>
							{tableBodyRender}
						</Table>
					)}
				</Card>
			)}
		</>
	)
}

export default UserView
