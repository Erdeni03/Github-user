import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { GithubRepos, GithubUser } from 'types/user.types'

import { isGithubUser } from 'utils/github.utils'

import { BASE_URL, getReposUrl, getUsersUrl } from 'configs/api.config'

export const loadUser = createAsyncThunk(
	'@@github/load-user',
	async (payload: string) => {
		const res = await fetch(`${BASE_URL}${getUsersUrl(payload)}`)
		return (await res.json()) as GithubUser
	}
)

export const loadRepos = createAsyncThunk(
	'@@github/load-repos',
	async (payload: string, { rejectWithValue }) => {
		try {
			const res = await fetch(`${BASE_URL}${getReposUrl(payload)}`)
			return (await res.json()) as GithubRepos[]
		} catch (e) {
			rejectWithValue('Failed to fetch user')
		}
	}
)

interface IUser {
	status: 'idle' | 'success' | 'loading' | 'error'
	user: GithubUser | null
	repos: GithubRepos[]
}

const initialState: IUser = {
	status: 'idle',
	user: null,
	repos: []
}
const userSlice = createSlice({
	name: '@@github',
	initialState,
	reducers: {
		setStatus: (state, action) => {
			state.status = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(loadUser.pending, state => {
				state.status = 'loading'
			})
			.addCase(loadUser.rejected, (state, action) => {
				state.status = 'error'
				state.user = null
			})
			.addCase(loadUser.fulfilled, (state, action) => {
				if (isGithubUser(action.payload)) {
					state.status = 'success'
					state.user = action.payload
				} else {
					state.status = 'error'
					state.user = null
				}
			})

			.addCase(loadRepos.pending, state => {
				state.status = 'loading'
			})
			.addCase(loadRepos.rejected, (state, action) => {
				state.status = 'error'
				state.repos = []
			})
			.addCase(loadRepos.fulfilled, (state, action) => {
				if (Array.isArray(action.payload)) {
					state.status = 'success'
					state.repos = action.payload.map(
						({ id, name, language, description, stargazers_count }) => {
							return {
								id,
								name,
								language,
								description,
								stargazers_count
							}
						}
					)
				}
			})
	}
})
export const { setStatus } = userSlice.actions
export const userReducer = userSlice.reducer
