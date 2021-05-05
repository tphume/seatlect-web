import React, { useState, useEffect } from 'react';
import Layout from 'src/components/layout';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		backgroundColor: `#F2D5F1`,
		margin: `10px`
	},
	paper_padding: {
		padding: `10px`
	},
	control: {
		padding: theme.spacing(2)
	},
	row: {
		display: `flex`,
		margin: `10px -20px 10px 0px`
	}
}));

export default function Time({ time }) {
	const classes = useStyles();
	// console.log(time)
	var startTime = time.start.slice(0, 16);
	var endTime = time.end.slice(0, 16);

	var seat = '';
	for (let i = 0; i < time.placement.seats.length; i++) {
		if (time.placement.seats[i].status === 'TAKEN') {
			if (seat === '') {
				seat += time.placement.seats[i].name;
			} else {
				seat += ', ' + time.placement.seats[i].name;
			}
		}
	}

	return (
		<Paper className={classes.paper}>
			<p>
				<b>Start: </b> {startTime}
				<br></br>
				<b>End: </b> {endTime}
			</p>
			<p>
				<b>Reserved table :</b> {seat}{' '}
			</p>
		</Paper>
	);
}
