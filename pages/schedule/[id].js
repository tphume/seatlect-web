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

export default function Schedule() {
	const classes = useStyles();
	const [id, setId] = useState('');

	useEffect(() => setId(localStorage.getItem('_id')), []);

	return (
		<Layout id={id}>
			<div>
				<h1>Hi, you are at schedule</h1>
			</div>
			<Grid container className={classes.root} spacing={2}>
				<Grid item xs={3}>
					<Paper className={classes.paper}>
						<div>
							<h2>April 2021</h2>
						</div>
						<div></div>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper className={classes.paper}>
						<p>schedule section</p>
					</Paper>
				</Grid>
				<Grid item xs={3}>
					<Paper className={classes.paper}>
						<p>info section</p>
					</Paper>
				</Grid>
			</Grid>
		</Layout>
	);
}
