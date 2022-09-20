/** @format */

import React from 'react';

function Images(images) {
	console.log(images);
	return (
		<div>
			<img src={images} alt='profile picture' height='140' width='240' />
		</div>
	);
}

export default Images;
