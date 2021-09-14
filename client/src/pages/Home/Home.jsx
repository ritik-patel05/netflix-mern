import './Home.scss';
import Navbar from '../../components/Navbar/Navbar';
import Featured from '../../components/Featured/Featured';

const Home = () => {
	return (
		<div className='home'>
			<Navbar />

			<Featured />
		</div>
	);
};

export default Home;
