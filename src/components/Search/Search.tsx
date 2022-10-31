import { FC, useRef } from 'react'
import { HiSearch } from 'react-icons/hi'

import { useFetchUser } from 'hooks/useFetchUser'

import s from './Search.module.scss'

const Search: FC = () => {
	const searchRef = useRef<HTMLInputElement | null>(null)
	const { handleSubmit, status } = useFetchUser()

	return (
		<form onSubmit={handleSubmit}>
			<div className={s.search}>
				<label htmlFor='search' className={s.label}></label>
				<input
					ref={searchRef}
					type='text'
					className={s.textField}
					id='search'
					name='username'
					placeholder='Search Github user...'
				/>
				{status === 'error' && <div className={s.error}>No result</div>}
				{status === 'loading' && <div className={s.loading}>Loading...</div>}
				<button className={s.button}>
					<HiSearch />
				</button>
			</div>
		</form>
	)
}

export default Search
