import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { GithubCommits } from 'types/user.types'

import { BASE_URL, getCommitsUrl } from 'configs/api.config'

export const loadCommits = createAsyncThunk(
	'@@commits/load-commits',
	async (payload: string[]) => {
		const res = await fetch(`${BASE_URL}${getCommitsUrl(payload[0], payload[1])}`)
		return (await res.json()) as GithubCommits[]
	}
)

interface ICommits {
	status: 'idle' | 'success' | 'loading' | 'error'
	commits: GithubCommits[]
}

const initialState: ICommits = {
	status: 'idle',
	commits: []
}
const commitsSlice = createSlice({
	name: '@@commits',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(loadCommits.pending, state => {
				state.status = 'loading'
			})
			.addCase(loadCommits.fulfilled, (state, action) => {
				state.status = 'success'
				state.commits = action.payload.map(({ node_id, sha, commit }) => {
					return {
						node_id,
						sha,
						commit
					}
				})
			})
	}
})
export const commitsReducer = commitsSlice.reducer
