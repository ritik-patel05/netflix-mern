import './List.scss';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ListItem from '../ListItem/ListItem';
import { useState, useRef } from 'react';

const List = () => {
	const [isMoved, setIsMoved] = useState(false);
	const [slideNumber, setSlideNumber] = useState(0);

	const listRef = useRef();

	const handleClick = (direction) => {
		setIsMoved(true);
		let distance = listRef.current.getBoundingClientRect().x - 50;
		console.log(distance);
		if (direction === 'left' && slideNumber > 0) {
			setSlideNumber(slideNumber - 1);
			listRef.current.style.transform = `translateX(${230 + distance}px)`;
		} else if (direction === 'right' && slideNumber < 5) {
			setSlideNumber(slideNumber + 1);
			listRef.current.style.transform = `translateX(${
				-230 + distance
			}px)`;
		}
	};

	return (
		<div className='list'>
			<span className='list-title'>Continue to Watch</span>
			<div className='wrapper'>
				<ArrowBackIosOutlinedIcon
					className='slider-arrow left'
					onClick={() => handleClick('left')}
					style={{ display: !isMoved && 'none' }}
				/>
				<div className='container' ref={listRef}>
					<ListItem index={0} />
					<ListItem index={1} />
					<ListItem index={2} />
					<ListItem index={3} />
					<ListItem index={4} />
					<ListItem index={5} />
					<ListItem index={6} />
					<ListItem index={7} />
					<ListItem index={8} />
					<ListItem index={9} />
				</div>
				<ArrowForwardIosOutlinedIcon
					className='slider-arrow right'
					onClick={() => handleClick('right')}
				/>
			</div>
		</div>
	);
};

export default List;
