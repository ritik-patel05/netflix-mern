import './ListItem.scss';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AddIcon from '@material-ui/icons/Add';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import { useState } from 'react';

const ListItem = ({ index }) => {
	const [isHovered, setIsHovered] = useState(false);
	const trailer =
		'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761';
	return (
		<div
			className='list-item'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}>
			<img
				src='https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee'
				alt=''
			/>
			{isHovered && (
				<>
					<video src={trailer} autoPlay={true} loop />
					<div className='item-info'>
						<div className='icons'>
							<PlayArrowIcon className='icon' />
							<AddIcon className='icon' />
							<ThumbUpOutlinedIcon className='icon' />
							<ThumbDownOutlinedIcon className='icon' />
						</div>

						<div className='item-info-top'>
							<span>1 hour 14 mins</span>
							<span className='limit'>+16</span>
							<span>1999</span>
						</div>

						<div className='desc'>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Natus veritatis perferendis harum tempora
							pariatur obcaecati ipsum, accusantium voluptatibus
							numquam ratione? Dolorem dolorum vel dignissimos
							ullam minima, minus eveniet nostrum ipsam.
						</div>

						<div className='genre'>Action</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ListItem;
