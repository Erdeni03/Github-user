import { FC } from 'react'
import { Provider } from 'react-redux'
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes
} from 'react-router-dom'

import Views from 'views/Views'
import CommitView from 'views/commit-view/CommitView'
import UserView from 'views/user-view/UserView'

import 'assets/styles/globals.scss'

import { store } from './store/store'

const App: FC = () => {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path='/' element={<Views />}>
						<Route path='user/:id' element={<UserView />} />
						<Route path='user/:id/:repo' element={<CommitView />} />
					</Route>
					<Route path='*' element={<Navigate replace to='/' />} />
				</Routes>
			</Router>
		</Provider>
	)
}

export default App
