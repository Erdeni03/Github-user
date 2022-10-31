import classNames from 'classnames'
import { FC, ReactNode } from 'react'

import { GithubRepos } from 'types/user.types'

import s from './Table.module.scss'

interface TableProps {
	heading: string[]
	children: ReactNode
	className?: string
}

const Table: FC<TableProps> = ({ heading, children, className }) => {
	return (
		<table
			className={classNames(
				'table-auto mt-10 border-collapse border-slate-400',
				className
			)}
		>
			<thead className='bg-indigo-300 h-10 text-gray-100'>
				<tr>
					{heading.map((head, idx) => (
						<th key={idx} className='border border-slate-300 w-24 text-center'>
							{head}
						</th>
					))}
				</tr>
			</thead>
			<tbody className={s.body}>{children}</tbody>
		</table>
	)
}

export default Table
