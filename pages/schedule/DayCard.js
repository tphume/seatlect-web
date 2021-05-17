import React, { useState, useEffect } from 'react';
import Layout from 'src/components/layout';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		height: `800px`,
		width: `100%`
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

export default function DayCard({ name, start, end, seats, onSelect }) {
	const classes = useStyles();
	const [id, setId] = useState('');
	const [value, onChange] = useState(new Date());
	const today = new Date();
	const [view_month, setView_Month] = useState(today.getMonth());
	const [view_year, setView_Year] = useState(today.getFullYear());
	const [show, setShowStatus] = useState(false);
	const [showDetail, setShowDetailStatus] = useState(true);

	var dateStart = new Date(start);
	var dateEnd = new Date(end);
	var startTime =
		dateStart.getHours() +
		' : ' +
		dateStart.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
	var endTime =
		dateEnd.getHours() +
		' : ' +
		dateEnd.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
	var seat = seats[0].name;

	console.log(dateStart);
	console.log(dateEnd);
	var i;
	for (i = 1; i < seats.length; i++) {
		seat += ', ' + seats[i].name;
	}
	useEffect(() => setId(localStorage.getItem('_id')), []);

	function showHandler() {
		if (show) {
			setShowStatus(false);
		} else {
			setShowStatus(true);
		}
	}
	function showDetailHandler() {
		if (showDetail) {
			setShowDetailStatus(false);
		} else {
			setShowDetailStatus(true);
		}
	}
	return (
		<div>
			<h3 onClick={showDetailHandler}>Day</h3>
			{showDetail ? (
				<div>
					<div onClick={showHandler}>
						Resevation : {seat}
						{show ? (
							<div
								onClick={(e) => {
									e.preventDefault();
								}}
							>
								<p>Customer : {name} </p>
								<p
									onClick={() => {
										console.log(seats.length);
									}}
								>
									Table : {seat}{' '}
								</p>
								<p>
									Time : {startTime} - {endTime}
								</p>
								<p></p>
							</div>
						) : (
							''
						)}
					</div>
				</div>
			) : (
				''
			)}
		</div>
	);
}
