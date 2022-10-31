import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import Container from 'components/Container/Container'
import Header from 'components/Header/Header'
import Search from 'components/Search/Search'

const Views: FC = () => {
	return (
		<div>
			<Container>
				<Header />
				<Search />
				<Outlet />
			</Container>
		</div>
	)
}

export default Views
