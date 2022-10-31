import { GithubUser } from 'types/user.types'

export const isGithubUser = (user: any): user is GithubUser => 'id' in user
