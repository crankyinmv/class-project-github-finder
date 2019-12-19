import React, {useState,Fragment} from 'react';
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
	const [alert, setAlert] = useState(null);

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
						setAlert={showAlert} 
					/>
					<Users />
							</Fragment>
						)} 
					/>
					<Route exact path='/about' component={About} />
					<Route exact path='/user/:login' component={User} /> 
				</Switch>
			</div>
			<h2>Fuck Off</h2>
		</div>
		</Router>
		</GithubState>
	);
}

export default App;
