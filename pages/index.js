import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Layout from 'src/components/layout';

import CircularProgress from '@material-ui/core/CircularProgress';

// This root page should not be accessed by user - will redirect to homepage
export default function Home() {
	const router = useRouter();

	// Get Business ID from localStorage
	const [id, setId] = useState('');
	useEffect(() => setId(localStorage.getItem('_id')), []);

	// This route will redirect to real home page
	if (process.browser) {
		router.push('/home/' + id);
	}

	return (
		<div
			style={{
				display: `flex`,
				flexDirection: `column`,
				justifyContent: `center`,
				alignItems: `center`,
				height: `100vh`
			}}
		>
			<CircularProgress size={320} />
		</div>
	);
}
