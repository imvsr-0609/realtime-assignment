import { FC, ReactElement, useState, TouchEventHandler } from 'react';

type SwipeWrapperProps = {
	children: ReactElement;
	onDelete: () => void;
};

const SwipeWrapper: FC<SwipeWrapperProps> = ({ children, onDelete }) => {
	const [isSwiping, setIsSwiping] = useState(false);
	const [startX, setStartX] = useState(0);

	const handleTouchStart: TouchEventHandler = (e) => {
		setStartX(e.touches[0].clientX);
	};

	const handleTouchMove: TouchEventHandler = (e) => {
		const currentX = e.touches[0].clientX;
		const diffX = currentX - startX;

		if (diffX < 0) {
			setIsSwiping(true);
		} else {
			setIsSwiping(false);
		}
	};

	const handleTouchEnd = () => {
		if (isSwiping) {
			onDelete();
		}
		setIsSwiping(false);
	};

	return (
		<div
			className={`swipe-to-delete ${isSwiping ? 'swiping' : ''}`}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			{children}
		</div>
	);
};

export default SwipeWrapper;
