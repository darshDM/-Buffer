import React, { useState } from 'react';
import axiosInstance from '../helper/axios';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import "../styles/register.css";
export default function Register() {
	const history = useHistory();
	const [inputField,setInputField] = useState(0);
	
	const initialFormData = Object.freeze({
		email: '',
		username: '',
		password: '',
		re_password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};
	const handleStateChange=(e)=>{
		if(inputField === 1){
			handleSubmit(e);
		}
		else{
			if(formData.email.trim() == ""){
				console.log("empty field");
			}
			else{
				setInputField(1);
			}
		}
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		axiosInstance
			.post(`auth/users/`,JSON.stringify({
				user_name: formData.username,
				email: formData.email,
				password: formData.password,
				re_password: formData.re_password
			}))
			.then((res) => {
				console.log(res.statusText);
				history.push('/login');
				
				console.log(res.data);
			},(error)=>{
				console.log(error);
			});
	};


	
	return (
		<div class = "body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0 bg-gradient-to-r from-pink-400 to-purple-600"  style={{fontFamily:'Lato'}}>
			<header className="max-w-lg mx-auto">
				<h1 class = "text-4xl font-bold text-white text-center">
				Channels
				</h1>
			</header>
			<main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl overflow-hidden overflow-x-hidden">
				<section>
					<h3 className="font-bold text-2xl">Welcome to Channels</h3>
					<p className="text-gray-600 pt-2">Create your account.</p>
				</section>
				<section className="mt-10">
					<form className="flex flex-col">
						<CSSTransition in={inputField===0} timeout={500} classNames="menu-primary" unmountOnExit>
						<div className="menu">
							<div className="mb-6 pt-3 rounded bg-gray-200">
								<label className="block text-gray-700 text-sm font-bold mb-2 ml-3">Email</label>
								<input name="email" onChange={handleChange} type="email" id="email" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-300 px-3 pb-3"></input>
							</div>
							<div className="mb-6 pt-3 rounded bg-gray-200">
								<label className="block text-gray-700 text-sm font-bold mb-2 ml-3">username</label>
								<input name="username" onChange={handleChange} type="username" id="username" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-300 px-3 pb-3"></input>
							</div>
						</div>
						</CSSTransition>
						
						<CSSTransition in={inputField===1} timeout={500} classNames="menu-secondary" unmountOnExit>
						<div className="menu">
							<div className="mb-6 pt-3 rounded bg-gray-200">
								<label className="block text-gray-700 text-sm font-bold mb-2 ml-3">password</label>
								<input name="password" onChange={handleChange} type="password" id="password" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-300 px-3 pb-3"></input>
							</div>
							<div className="mb-6 pt-3 rounded bg-gray-200">
								<label className="block text-gray-700 text-sm font-bold mb-2 ml-3">Confirm-password</label>
								<input name="re_password" onChange={handleChange} type="password" id="re_password" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-300 px-3 pb-3"></input>
							</div>
						</div>
						</CSSTransition>
						<button onClick={handleStateChange} className="self-end w-20 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 focus:outline-none" type="button">
						{inputField == 0 ? <i className="fas fa-angle-right"></i>:"Sign up"}
						</button>
					</form>
				</section>
			</main>
			<div className="max-w-lg mx-auto text-center mt-12 mb-6 ">
				<p className="text-white">Already have an account ? <a href="#" className="font-bold hover:underline">Sign In</a>.</p>
			</div>
		</div>	
	);
}