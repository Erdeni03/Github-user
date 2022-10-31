export type GithubUser = {
	login: string
	id: number
	avatar_url: string
	name: string
	company: string
	blog: string
	location: string
	bio: string
	twitter_username: string
	public_repos: number
	followers: number
	following: number
	created_at: string
}

export type GithubError = {
	message: string
	documentation_url: string
}

export type GithubRepos = {
	id: number
	name: string
	stargazers_count: string
	language: string
	description: string
}
export type AuthorCommit = {
	name: string
	date: string
}
export type GithubCommits = {
	sha: string
	node_id: string
	commit: {
		author: AuthorCommit
	}
}
