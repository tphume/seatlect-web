import React, { useState, useEffect } from 'react';
import Layout from 'src/components/layout';

export default function Placement() {
	const [id, setId] = useState('');

	useEffect(() => setId(localStorage.getItem('_id')), []);

	return (
		<Layout id={id}>
			<div>
				<h1>Hi, you are at Placement</h1>
			</div>
		</Layout>
	);
}
