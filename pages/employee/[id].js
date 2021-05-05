import React, { useState, useEffect } from 'react';
import Layout from 'src/components/layout';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		height: `500px`,
		width: `100%`
	},
	control: {
		padding: theme.spacing(2)
	}
}));

export default function Employee() {
	const classes = useStyles();
	const [id, setId] = useState('');

	useEffect(() => setId(localStorage.getItem('_id')), []);

	return (
		<Layout id={id}>
			<div>
				<h1>Hi, you are at Employee</h1>
			</div>
		</Layout>
	);
}
