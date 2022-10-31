import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { commitsReducer } from 'store/slice/commits-slice'

import { userReducer } from './slice/user-slice'

const rootReducer = combineReducers({
	user: userReducer,
	commits: commitsReducer
})

export const store = configureStore({
	reducer: rootReducer,
	devTools: true
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
