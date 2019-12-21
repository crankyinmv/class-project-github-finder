import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const UserItem = ({user:{login,avatar_url,html_url}}) =>
{
	return (
		<div className='card text-center' style={{marginLeft:'5px', marginRight:'5px'}}>
			<img src={avatar_url} alt='' className='round-img' style={{border:'1px solid black',width:'60px',height:'60px'}} />
			<h3>{login}</h3>
			<div>
				<Link to={`/user/${login}`} className='btn btn-dark btn-sm my-1'>
					More
				</Link>
			</div>
		</div>
	);
};

UserItem.propTypes =
{
	user: PropTypes.object.isRequired
};

export default UserItem;
