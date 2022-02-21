import React, { useState } from 'react';
import axiosInstance from '../helper/axios';
import { useHistory } from 'react-router-dom';
export default function Login(props) {
	const {handleLoginFromApp} = props
	const history = useHistory();
	const initialFormData = Object.freeze({
		email: '',
		password: '',
	});
	const [formData, updateFormData] = useState(initialFormData);
	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axiosInstance
			.post(`auth/jwt/create`, {
				email: formData.email,
				password: formData.password,
			})
			.then((res) => {
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
				history.push('/');
				handleLoginFromApp(true);
			});
	};
	return (
		<div class = "overflow-hidden body-bg h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0 bg-gradient-to-r from-pink-400 to-purple-600"  style={{fontFamily:'Lato'}}>
			<header class="max-w-lg mx-auto">
				<h1 class = "text-4xl font-bold text-white text-center">
				Channels
				</h1>
			</header>
			<main class="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
				<section>
					<h3 class="font-bold text-2xl">Welcome to Channels</h3>
					<p class="text-gray-600 pt-2">Sign in to your account.</p>
				</section>
				<section class="mt-10">
					<form class="flex flex-col">
						<div class="mb-6 pt-3 rounded bg-gray-200">
							<label class="block text-gray-700 text-sm font-bold mb-2 ml-3">Email</label>
							<input name="email" onChange={handleChange} type="email" id="email" class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-300 px-3 pb-3"></input>
						</div>
						<div class="mb-6 pt-3 rounded bg-gray-200">
							<label class="block text-gray-700 text-sm font-bold mb-2 ml-3">Password</label>
							<input name="password" onChange={handleChange} type="password" id="password" class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-300 px-3 pb-3"></input>
						</div>
						<div class="flex justify-end">
							<a href="#" class="text-sm text-purple-600 hover:text-purple-800 mb-6">Forgot password ?</a>
						</div>
						<button onClick={handleSubmit} class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Sign In</button>
					</form>
				</section>
			</main>
			<div class="max-w-lg mx-auto text-center mt-10 mb-6 ">
				<p class="text-white">Don't have an account ? <a href="#" class="font-bold hover:underline">Sign up</a>.</p>
			</div>
		</div>
	);
}