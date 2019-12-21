import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import
{
	SEARCH_USERS,
	GET_USER,
	CLEAR_USERS,
	GET_REPOS,
	SET_LOADING
} from '../types';

const GithubState = props =>
{
	var gcId, gcSecret;

//	if(process.env.NODE_ENV !== 'production')
//	{
		gcId = process.env.REACT_APP_GITHUB_CLIENT_ID;
		gcSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
//	}
//	else
//	{
//		gcId = process.env.GITHUB_CLIENT_ID;
//		gcSecret = process.env.GITHUB_CLIENT_SECRET;
//	}

	const gh_auth = `client_id=${gcId}&client_secret=${gcSecret}`;

	const initialState =
	{
		users: [],
		user: {},
		repos: [],
		loading: false
	};

	const [state,dispatch] = useReducer(GithubReducer, initialState);

	const searchUsers = async text =>
	{
		setLoading();
		const res = await axios.get(`https://api.github.com/search/users?q=${text}&${gh_auth}`);
		dispatch({type:SEARCH_USERS, payload: res.data.items});
	};



	const getUser = async username =>
	{
		setLoading();
		const res = await axios.get(`https://api.github.com/users/${username}?${gh_auth}`);
		dispatch({type: GET_USER, payload:res.data});
	};

	const clearUsers = () => dispatch({type: CLEAR_USERS});
	const getUserRepos = async username => 
	{
		setLoading();
		const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&${gh_auth}`);
		dispatch({type: GET_REPOS, payload:res.data});
	};
	const setLoading = () => dispatch({type: SET_LOADING});



	return <GithubContext.Provider
		value = 
		{{
			users:state.users,
			user:state.user,
			repos:state.repos,
			loading:state.loading,
			searchUsers,
			clearUsers,
			getUser,
			getUserRepos
		}}
		>
			{props.children}
		</GithubContext.Provider>;
};

export default GithubState;
