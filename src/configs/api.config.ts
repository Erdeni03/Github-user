export const BASE_URL = 'https://api.github.com'

export const getUsersUrl = (string: string) => `/users/${string}`
export const getReposUrl = (string: string) => `/users/${string}/repos`
export const getCommitsUrl = (name: string, repo: string) =>
	`/repos/${name}/${repo}/commits`
