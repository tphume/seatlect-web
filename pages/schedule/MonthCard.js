import React, { useState, useEffect } from 'react';
import Layout from 'src/components/layout';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DayCard2 from './DayCard2';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		backgroundColor: `#ffffff`,
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

// GET data
// initialDatas = data.reservations

export default function MonthCard({ reservations, updateOnCancel }) {
	const classes = useStyles();
	const [id, setId] = useState('');
	const today = new Date();
	const [view_month, setView_Month] = useState(today.getMonth());
	const [view_year, setView_Year] = useState(today.getFullYear());
	const [sidebarINFO, setSidebarInfo] = useState();
	var dict = {};

	for (var i = 0; i < reservations.length; i++) {
		try {
			var date = new Date(reservations[i].start);
			// console.log(date.getDate())
			var num = date.getDate();
			var oldReservation = dict[num];
			if (oldReservation == undefined) {
				throw undefined;
			}
			oldReservation.push(reservations[i]);
			// console.log(oldReservation)
			dict[num] = oldReservation;
		} catch (e) {
			// console.log(e)
			dict[num] = [reservations[i]];
		}
	}
	// console.log(dict[20])
	// console.log(dict[21])
	// console.log(dict)
	useEffect(() => setId(localStorage.getItem('_id')), []);

	return (
		<div className={classes.paper}>
			{Object.keys(dict).map((key, i) => {
				return <DayCard2 key={i} reservation={dict[key]} updateOnCancel={updateOnCancel} />;
			})}
		</div>
	);
}
