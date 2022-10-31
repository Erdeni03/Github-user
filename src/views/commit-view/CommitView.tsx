import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import Card from 'components/Card/Card'
import Table from 'components/Table/Table'

import { useAppDispatch } from 'hooks/useAppDispatch'

import { githubState } from 'store/github-selectors'
import { loadCommits } from 'store/slice/commits-slice'

import { formatDate } from 'utils/formatDate.utils'

const CommitView: FC = () => {
	const navigate = useNavigate()
	const {
		commits: { commits }
	} = useSelector(githubState)
	const dispatch = useAppDispatch()
	const { id, repo } = useParams()

	useEffect(() => {
		dispatch(loadCommits([id || '', repo || '']))
	}, [])

	const tableBodyRender =
		commits &&
		commits.map(item => (
			<tr key={item.node_id}>
				<td className='text-center'>{item.commit.author.name || '-'}</td>
				<td className='text-center'>{item.sha || '-'}</td>
				<td className='text-center'>
					{formatDate(item.commit.author.date) || '-'}
				</td>
			</tr>
		))

	return (
		<Card className='block'>
			<button
				className='h-full py-3 px-6 border-none text-sm shadow cursor-pointer bg-red-400 transition text-white hover:bg-red-300'
				onClick={() => navigate(-1)}
			>
				Go Back
			</button>
			<Table heading={['Author', 'Hash Commit', 'Date']} className='w-full'>
				{tableBodyRender}
			</Table>
		</Card>
	)
}

export default CommitView
