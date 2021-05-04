import React, { useState, useEffect } from 'react';
import Layout from 'src/components/layout';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Modal from '@material-ui/core/Modal';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import MonthCard from './MonthCard';
import DayCard from './DayCard';
import CreateScheduleModal from './createScheduleModal';

const paperHeight = `82vh`;

const START_PRESET = `T00:00:00+7000`;
const END_PRESET = `T23:59:59+7000`;
const TIME_ZONE = '+7000';
const SPLITER = 'T';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		height: paperHeight,
		width: `100%`
	},
	paper2: {
		width: `100%`,
		paddingBottom: `15px`
	},
	paper_padding: {
		padding: `10px`
	},
	control: {
		padding: theme.spacing(2)
	},
	row: {
		display: `flex`,
		margin: `15px -40px -20px 0px`
	},
	createButton: {
		display: `flex`,
		justifyContent: `flex-end`
	},
	modal: {
		width: `500px`
	},
	flex: {
		display: `flex`,
		justifyContent: `center`
	},
	todayHaeader: {
		padding: `10px 25px 0px 25px`
	}
}));

const defaultData = [{}, {}];

const initialDatas = [
	{
		name: 'Mr.Bright',
		start: '2021-05-20T11:00:00+0700',
		end: '2021-05-20T14:30:00+0700',
		placement: {
			width: 0,
			height: 0,
			seats: [
				{
					name: 'A3',
					floor: 0,
					type: 'string',
					space: 0,
					user: 'string',
					status: 'string',
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					rotation: 0
				},
				{
					name: 'A4',
					floor: 0,
					type: 'string',
					space: 0,
					user: 'string',
					status: 'string',
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					rotation: 0
				}
			]
		}
	},
	{
		name: 'Mr.Gribio',
		start: '2021-05-20T18:00:00+0700',
		end: '2021-05-20T22:00:00+0700',
		placement: {
			width: 0,
			height: 0,
			seats: [
				{
					name: 'A1',
					floor: 0,
					type: 'string',
					space: 0,
					user: 'string',
					status: 'string',
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					rotation: 0
				},
				{
					name: 'A2',
					floor: 0,
					type: 'string',
					space: 0,
					user: 'string',
					status: 'string',
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					rotation: 0
				}
			]
		}
	},
	{
		name: 'Mr.Pawaris',
		start: '2021-05-21T19:40:00+0700',
		end: '2021-05-21T23:00:00+0700',
		placement: {
			width: 0,
			height: 0,
			seats: [
				{
					name: 'A2',
					floor: 0,
					type: 'string',
					space: 0,
					user: 'string',
					status: 'string',
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					rotation: 0
				}
			]
		}
	},
	{
		name: 'Mr.Phume',
		start: '2021-05-21T18:15:00+0700',
		end: '2021-05-21T23:00:00+0700',
		placement: {
			width: 0,
			height: 0,
			seats: [
				{
					name: 'A5',
					floor: 0,
					type: 'string',
					space: 0,
					user: 'string',
					status: 'string',
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					rotation: 0
				}
			]
		}
	}
];

export default function Schedule() {
	const classes = useStyles();
	const day = ['Sundat', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const month = [
		'January',
		'Febuary',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const [id, setId] = useState('');
	const [value, onChange] = useState(new Date());
	const today = new Date();
	const [view_month, setView_Month] = useState(today.getMonth());
	const [view_year, setView_Year] = useState(today.getFullYear());
	const [viewOption, setViewOption] = React.useState(true);
	const [reservations, setReservation] = useState(initialDatas);
	const [name, setName] = React.useState('Mr.Anonymous');
	const [startTime, setStartTime] = React.useState('19:00');
	const [endTime, setEndTime] = React.useState('23:00');

	const [openCreate, setOpenCreate] = React.useState(false);
	const handleOpenCreate = () => {
		setOpenCreate(true);
	};

	const handleCloseCreate = () => {
		setOpenCreate(false);
	};
	useEffect(() => setId(localStorage.getItem('_id')), []);

	function handleTime(e) {
		var ts = new Date('2020-05-20T19:00:00+0700');
		var ts2 = new Date();
		var ts3 = new Date();
		const _time = '2020-05-20T19:00:00+0700';
		console.log(ts.toLocaleTimeString());
		console.log(ts.toLocaleDateString());
		console.log(ts2.toLocaleTimeString());
		console.log(ts2.toLocaleDateString());
		console.log(ts2.toISOString());
		console.log(ts2.toUTCString());
		console.log(ts2.toJSON());
		console.log(ts2.toString());
		// -------------------------------
		// if(value.getMonth() == ts2.getMonth()){
		// 	console.log(month[value.getMonth()])
		// 	console.log("show")
		// 	var time = ts2.toISOString()
		// 	var result = ""
		// 	for(var i=0;i<10;i++){
		// 		result += time[i];
		// 	}
		// 	result += START_PRESET
		// 	console.log(result)
		// }

		ts3.setHours(20, 30, 0);

		var result = ts2.toISOString().substring(0, 11);
		result += ts2.getHours() + ':' + ts2.getMinutes() + ':' + ts2.getSeconds() + TIME_ZONE;
		console.log(result);

		var result3 = ts3.toISOString().substring(0, 11);
		result3 += ts3.getHours() + ':' + ts3.getMinutes() + ':' + ts3.getSeconds() + TIME_ZONE;
		console.log(result3);
	}

	return (
		<Layout id={id}>
			<Grid container className={classes.root} spacing={2}>
				{/* --- Create button ---*/}
				<Grid item xs={12} className={classes.createButton}>
					<Button color="primary" variant="contained" onClick={() => handleOpenCreate()}>
						Create
					</Button>
				</Grid>
				{/*   ----- Modal create section -----   */}
				<Modal
					open={openCreate}
					onClose={handleCloseCreate}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				>
					<CreateScheduleModal
						className={classes.modal}
						date={today}
						// ------------------------------------------------------------------------origjvnoetpowqi
						onClickClose={() => {
							handleCloseCreate();
						}}
					/>
				</Modal>
				{/* --- Calendar section --- */}
				<Grid item xs={3}>
					<Paper className={classes.paper}>
						<h2 className={classes.todayHaeader}>
							Today : {/*day[today.getDay()]*/} {month[today.getMonth()]} {today.getDate()},{' '}
							{today.getFullYear()}
						</h2>
						<div className={classes.flex}>
							<Calendar
								calendarType="US"
								onClickDay={() => {
									console.log(value.getFullYear());
									console.log(value.getMonth());
									console.log(value);
								}}
								onActiveStartDateChange={({ activeStartDate, value, view }) => {
									// console.log(activeStartDate)
									// console.log(activeStartDate.getMonth())
									// console.log(activeStartDate.getFullYear())
									setView_Month(activeStartDate.getMonth());
									setView_Year(activeStartDate.getFullYear());
									// console.log(view_month)
									// console.log(view_year)
									// new data go rewrite reservation
									console.log('fetch new data');
								}}
								onClick={(e) => {
									console.log('....');
								}}
								onChange={onChange}
								value={value}
							/>
						</div>
						<div></div>
					</Paper>
				</Grid>

				{/* --- Month/Day section --- */}
				<Grid item xs={9}>
					<Paper className={classes.paper2}>
						{/* --- Start of Header Section --- */}
						<Grid container spacing={5} className={classes.row}>
							<Grid item xs={4}>
								<TextField
									disabled
									id="outlined-disabled"
									label="Display"
									defaultValue="Month"
									variant="outlined"
								/>
							</Grid>
							<Grid item xs={7}>
								<TextField
									className={classes.margin}
									id="input-with-icon-textfield"
									label="Viewing month"
									value={month[view_month] + ', ' + view_year}
									disabled
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<DateRangeIcon />
											</InputAdornment>
										)
									}}
								/>
							</Grid>
						</Grid>
						{/* --- End of Header Section --- */}

						{viewOption ? <MonthCard reservations={reservations} /> : <DayCard />}
					</Paper>
				</Grid>
			</Grid>
		</Layout>
	);
}
