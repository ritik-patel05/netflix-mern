import { useRef, useState } from 'react';
import './SignUp.scss';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const emailRef = useRef();
	const passwordRef = useRef();

	const handleStart = () => {
		setEmail(emailRef.current.value);
	};

	const handleFinish = () => {
		setPassword(passwordRef.current.value);
	};

	return (
		<div className='signup'>
			<div className='top'>
				<div className='wrapper'>
					<img
						className='logo'
						src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png'
						alt=''
					/>
					<button className='login-button'>Sign In</button>
				</div>
			</div>
			<div className='container'>
				<h1>Unlimited movies, TV shows, and more</h1>
				<h2>Watch anywhere. Cancel anytime.</h2>
				<p>
					Ready to watch? Enter your email to create or restart your
					membership.
				</p>
				{!email ? (
					<div className='input'>
						<input
							type='email'
							placeholder='Email Address'
							ref={emailRef}
						/>
						<button className='signup-button' onClick={handleStart}>
							Get Started
						</button>
					</div>
				) : (
					<form className='input'>
						<input
							type='password'
							placeholder='password'
							ref={passwordRef}
						/>
						<button
							className='signup-button'
							onClick={handleFinish}>
							Start
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default SignUp;
