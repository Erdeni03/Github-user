import { FormEvent } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { githubState } from 'store/github-selectors'
import { loadRepos, loadUser, setStatus } from 'store/slice/user-slice'

import { useAppDispatch } from './useAppDispatch'

type FormFields = {
	username: HTMLInputElement
}

export const useFetchUser = () => {
	const { user } = useSelector(githubState)

	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const handleSubmit = (event: FormEvent<HTMLFormElement & FormFields>) => {
		event.preventDefault()
		const text = event.currentTarget.username.value
		if (text.trim()) {
			dispatch(loadUser(text)).then(res => {
				navigate(`/user/${text}`)
				dispatch(setStatus('idle'))
			})
			dispatch(loadRepos(text))
			event.currentTarget.reset()
		}
	}

	return { handleSubmit, status: user.status }
}
