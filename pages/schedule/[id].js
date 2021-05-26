import React, { useState, useEffect } from 'react';
import { getReservationRepo } from 'src/reservationRepo';
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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import MonthCard from './MonthCard';
import CreateScheduleModal from './createScheduleModal';

const paperHeight = `82vh`;
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
	todayHeader: {
		padding: `10px 25px 0px 25px`
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff'
	},
	loadingSpace: {
		width: `1rem`
	}
}));

// helper function
function formatDate(date) {
	// initial
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hours = date.getHours();
	let minutes = date.getMinutes();

	// format 0 in front
	month = month < 10 ? '0' + month : month;
	day = day < 10 ? '0' + day : day;
	hours = hours < 10 ? '0' + hours : hours;
	minutes = minutes < 10 ? '0' + minutes : minutes;

	return `${year}-${month}-${day}T${hours}:${minutes}:00%2B0000`;
}

export default function Schedule({ initialData }) {
	const classes = useStyles();
	const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const month = [
		'January',
		'February',
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

	// setup state
	const [id, setId] = useState('');
	const [value, onChange] = useState(new Date());
	const today = new Date();
	const [view_month, setView_Month] = useState(today.getMonth());
	const [view_year, setView_Year] = useState(today.getFullYear());
	const [viewOption, setViewOption] = React.useState(true);
	const [reservations, setReservation] = useState(initialData);
	const [openCreate, setOpenCreate] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	// setup repo
	const repo = getReservationRepo({
		env: process.env.NEXT_PUBLIC_ENV,
		url: process.env.NEXT_PUBLIC_BE,
		id: id
	});

	// setup handlers
	const handleOpenCreate = () => {
		setOpenCreate(true);
	};

	const handleCloseCreate = () => {
		setOpenCreate(false);
		handleToggle();
		console.log('open back drop for 2 sec');
	};

	const handleFinishCreate = () => {
		handleClose();
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleToggle = () => {
		setOpen(!open);
	};

	const updateOnCancel = (id) => {
		let tmp = [...reservations].filter((r) => r.id != id);
		setReservation(tmp);
	};

	useEffect(() => setId(localStorage.getItem('_id')), []);

	async function fetchReservations({ start, end }) {
		try {
			const reservations = await repo.listReservation({ start, end });
			setReservation(reservations);
		} catch (e) {
			// TODO handle error
		}
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
						id={id}
						onClickClose={() => {
							handleCloseCreate();
						}}
						onFinishCreate={() => {
							handleFinishCreate();
						}}
					/>
				</Modal>
				{/* --- Calendar section --- */}
				<Grid item xs={3}>
					<Paper className={classes.paper}>
						<h2 className={classes.todayHeader}>
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
									setView_Month(activeStartDate.getMonth());
									setView_Year(activeStartDate.getFullYear());

									fetchReservations({
										start: formatDate(activeStartDate),
										end: formatDate(
											new Date(
												activeStartDate.getFullYear(),
												activeStartDate.getMonth() + 1,
												0,
												23,
												59,
												59
											)
										)
									});
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
						{viewOption ? (
							<MonthCard reservations={reservations} updateOnCancel={updateOnCancel} />
						) : (
							''
						)}
					</Paper>
				</Grid>
			</Grid>

			{/* --- Loading screen --- */}
			<Backdrop className={classes.backdrop} open={open}>
				<CircularProgress color="inherit" />
				<div className={classes.loadingSpace}></div>
				<h2>Creating new schedule ...</h2>
			</Backdrop>
		</Layout>
	);
}

export async function getServerSideProps(ctx) {
	// Get params
	let env = process.env.NEXT_PUBLIC_ENV;
	let id = ctx.params.id;
	let reservations = {};

	// args
	const startDate = new Date();
	const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59);
	const args = { start: formatDate(startDate), end: formatDate(endDate) };

	// Get initial data
	let resRepo = getReservationRepo({ env, id, url: process.env.NEXT_PUBLIC_BE });
	try {
		reservations = await resRepo.listReservation(args);
	} catch (e) {
		// TODO handle error
	}

	return {
		props: {
			initialData: reservations
		}
	};
}
