import './Navbar.scss';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useEffect, useState } from 'react';

const Navbar = () => {
	const [top, setTop] = useState(true);

	// check if user has scrolled the page down by 10px
	useEffect(() => {
		const scrollHandler = () => {
			window.pageYOffset > 10 ? setTop(false) : setTop(true);
		};
		window.addEventListener('scroll', scrollHandler);
		return () => window.removeEventListener('scroll', scrollHandler);
	}, [top]);

	return (
		<div className={`navbar ${!top && 'scrolled'}`}>
			<div className='container'>
				<div className='left'>
					<img
						src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png'
						alt='Netflix logo'
					/>
					<span>Homepage</span>
					<span>Series</span>
					<span>Movies</span>
					<span>New and Popular</span>
					<span>My List</span>
				</div>
				<div className='right'>
					<SearchIcon className='icon' />
					<span>KID</span>
					<NotificationsIcon className='icon' />
					<img
						src='https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
						alt='Profile'
					/>
					<div className='profile'>
						<ExpandMoreIcon className='icon' />
						<div className='options'>
							<span>Settings</span>
							<span>Logout</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
