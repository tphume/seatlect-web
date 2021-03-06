import React, { useState } from 'react';

import { getReservationRepo } from 'src/reservationRepo';
import Layout from 'src/components/layout';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'absolute',
		left: `30vw`,
		top: `30vh`,
		width: `40vw`,
		height: `45vh`,
		backgroundColor: `white`,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	},
	heroImage: {
		width: 62.6953125,
		height: 40.0593471810089
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: theme.palette.primary.main,
		padding: `1rem`
	},
	drawerContainer: {
		overflow: 'auto'
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	whiteColor: {
		color: `white`
	},
	primaryColor: {
		color: theme.palette.primary.main
	},
	item: {
		'&.Mui-selected, &.Mui-selected:hover': {
			backgroundColor: 'white'
		}
	},
	logoutButton: {
		'&.MuiListItem-button': {
			backgroundColor: theme.palette.error.main
		}
	},
	displayImage: {
		height: 200
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	},
	label: {
		color: `rgba(0, 0, 0, 0.87)`,
		fontWeight: `900`,
		fontSize: `1rem`,
		marginRight: `1rem`
	},
	textField: {
		width: `150px`
	},
	Button: {
		width: `6.5rem`
	},
	cancelButton: {
		width: `6.5rem`,
		marginRight: `1.25rem`
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		margin: '0 0px 20px -10px'
	},
	textField2: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	row: {
		display: `flex`,
		margin: `15px 0px -20px 0px`
	},
	marginRightBot: {
		margin: `0px 0px 15px 0px`
	},
	marginBot: {
		margin: `60px 0px 0px 0px`
	},
	showError: {
		color: `red`,
		margin: `30px 10px -50px 0`
	}
}));

export default function CreateScheduleModal({ date, id, onClickClose, onFinishCreate }) {
	const classes = useStyles();
	const _date = new Date(date);
	const TIME_ZONE = '+0000';
	const SECOND = '00';
	const [_day, setDay] = useState(null);
	const [_start, setStart] = useState(null);
	const [_end, setEnd] = useState(null);
	const [_showRequired, setShowRequired] = useState(false);
	const [_showText, setShowText] = useState(false);
	// const [open, setOpen] = React.useState(false);

	// setup repo
	const repo = getReservationRepo({
		env: process.env.NEXT_PUBLIC_ENV,
		url: process.env.NEXT_PUBLIC_BE,
		id: id
	});

	function timeConverter(day, time) {
		var result = '';
		result += day + 'T' + time + TIME_ZONE;
		return result;
	}

	// setup handlers
	function dayHandler(day) {
		setDay(day);
	}
	function startHandler(time) {
		setStart(time + ':' + SECOND);
	}
	function endHandler(time) {
		setEnd(time + ':' + SECOND);
	}

	async function appendItem(e) {
		e.preventDefault();

		try {
			if (_day == null || _start == null || _end == null) {
				throw 'Please fill up all the information';
			} else {
				setShowRequired(false);
				onClickClose();

				var startTime = timeConverter(_day, _start);
				var endTime = timeConverter(_day, _end);

				var time1 = new Date(startTime);
				var time2 = new Date(endTime);
				if (time2 - time1 < 0) {
					throw 'Invalid time';
				}

				await repo.createReservation({ name: '', start: startTime, end: endTime });
			}
		} catch (e) {
			setShowRequired(true);
			setShowText(e);
			console.log(e);
		}

		onFinishCreate();
	}

	return (
		<Card className={classes.root}>
			<h1>New Schedule</h1>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					{/* --- Date --- */}
					<InputLabel className={`${classes.label} ${classes.marginRightBot}`}>Date</InputLabel>
					<form className={classes.container} noValidate>
						<TextField
							id="datetime-local"
							variant="outlined"
							size="small"
							label="Schedule date"
							type="date"
							className={classes.textField2}
							onChange={(e) => {
								// console.log(e.target.value)
								dayHandler(e.target.value);
							}}
							InputLabelProps={{
								shrink: true
							}}
							focused
						/>
					</form>
					{/* -------------------------------------------------------- */}
					<InputLabel className={classes.label}>Time</InputLabel>
					<div className={classes.row}>
						{/* --- Start time --- */}
						<TextField
							variant="outlined"
							size="small"
							fullWidth
							label="Start time"
							type="time"
							defaultValue="123"
							className={classes.textField}
							onChange={(e) => {
								startHandler(e.target.value);
							}}
							focused
						/>{' '}
						-{/* --- End time --- */}
						<TextField
							variant="outlined"
							size="small"
							fullWidth
							label="End time"
							type="time"
							defaultValue="321"
							className={classes.textField}
							onChange={(e) => {
								endHandler(e.target.value);
							}}
							focused
						/>
					</div>
					{_showRequired ? <div className={classes.showError}>{_showText}</div> : ''}
					{/* --- Cancel button --- */}
					<Box className={classes.marginBot} display="flex" justifyContent="flex-end">
						<Button
							variant="contained"
							className={classes.cancelButton}
							color="primary"
							size="large"
							disableElevation
							onClick={() => {
								onClickClose();
								onFinishCreate();
							}}
						>
							Cancel
						</Button>
						<Button
							variant="contained"
							className={classes.Button}
							color="primary"
							size="large"
							disableElevation
							onClick={appendItem}
						>
							Save
						</Button>
					</Box>
				</Grid>
			</Grid>
			<Box display="flex" justifyContent="space-between">
				{/* <img alt="food image" /> */}
			</Box>
		</Card>
	);
}
