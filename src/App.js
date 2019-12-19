import React, {useState,Fragment} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';
import './App.css';

const App = () =>
{
	const [users, setUsers] = useState([]),
	[user, setUser] = useState({}),
	[repos, setRepos] = useState([]),
	[loading, setLoading] = useState(false),
	[alert, setAlert] = useState(null);

	const gh_auth = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
console.log(gh_auth);
	const getUser = async username =>
	{
//console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
//console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
//console.log('getUser called');
		setLoading(true);
//		const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
		const res = await axios.get(`https://api.github.com/users/${username}?${gh_auth}`);
console.log(`Got https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
		setUser(res.data);
		setLoading(false);
//		console.log('End of getUsers');
	};

	const getUserRepos = async username => 
	{
//console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
//console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
//console.log('getUserRepos called');
		setLoading(true);
//		const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
		const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&${gh_auth}`);

//console.log(`Also got: https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

		setRepos(res.data);
		setLoading(false);
	};

	const clearUsers = ()=> 
	{
		setUsers([]);
		setLoading(false);
	};

	const showAlert = (msg, type)=>
	{
		setAlert({msg, type});
		setTimeout(()=>setAlert(null), 5000);
	};

	const name = 'Mike';

//	if(loading)
//		return <h4>Loading ...</h4>;

  	return (
		<GithubState>
		<Router>
		<div className='App'>
			<h1>Hi {name}</h1>
			<Navbar />
			<div className='container'>
				<Alert alert={alert} />
				<Switch>
					<Route 
						exact 
						path='/' 
						render={props=>	(
							<Fragment>
					<Search 
						clearUsers={clearUsers} 
						showClear={users.length > 0} 
						setAlert={showAlert} 
					/>
					<Users loading={loading} users={users} />
							</Fragment>
						)} 
					/>
					<Route exact path='/about' component={About} />
					<Route 
						exact 
						path={`/user/:login`} 
						render=					{						props=>						(
							<User 
								{...props} 
								getUser={getUser} 
								getUserRepos={getUserRepos} 
								repos={repos} 
								user={user} 
								loading={loading} 
							/>
						)} 
					/>
				</Switch>
			</div>
			<h2>Fuck Off</h2>
		</div>
		</Router>
		</GithubState>
	);
}

export default App;
