import { useRef, useState } from 'react';
import './Login.scss';

const SignUp = () => {
	return (
		<div className='login'>
			<div className='top'>
				<div className='wrapper'>
					<img
						className='logo'
						src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png'
						alt=''
					/>
				</div>
			</div>
			<div className='container'>
				<form>
					<h1>Sign In</h1>
					<input type='email' placeholder='Email' />
					<input type='password' placeholder='Password' />
					<button className='login-button'>Sign In</button>
					<span>
						New to Netflix? <strong>Sign up now.</strong>
					</span>
					<p>
						<small>
							This page is protected by Google reCAPTCHA to ensure
							you're not a bot. <strong>Learn more</strong>.
						</small>
					</p>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
