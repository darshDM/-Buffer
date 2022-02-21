import React, { useEffect } from 'react';
import axiosInstance from '../helper/axios';
import { useHistory } from 'react-router-dom';

export default function Logout(props) {
	const {handleLoginFromApp} = props
	const history = useHistory();

	useEffect(() => {
		const response = axiosInstance.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;
		handleLoginFromApp(false)
		history.push('/login');
	});
	return <div>Logout</div>;
}