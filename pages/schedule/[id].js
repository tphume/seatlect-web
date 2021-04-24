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

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import MonthCard from './MonthCard';
import DayCard from './DayCard';

const paperHeight = `82vh`

const START_PRESET = `T00:00:00+7000`;
const END_PRESET = `T23:59:59+7000`;
const TIME_ZONE = "+7000"
const SPLITER = "T"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: paperHeight,
    width:`100%`,
  },
	paper_padding: {
    padding: `10px`,
  },
  control: {
    padding: theme.spacing(2),
  },
	row:{
		display : `flex`,
		margin: `10px -20px 10px 0px`
	},
}));

const defaultData = [
	{

	},
	{

	}
];

export default function Schedule() {
	const classes = useStyles();
	const day = ['Sundat','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	const month = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
	
	const [id, setId] = useState('');
	const [value, onChange] = useState(new Date());
	const today = new Date();
	const [view_month,setView_Month] = useState(today.getMonth());
	const [view_year,setView_Year] = useState(today.getFullYear());
	const [viewOption, setViewOption] = React.useState(true)
	const [name,setName] = React.useState("Mr.Anonymous")
	const [startTime,setStartTime] = React.useState("19:00")
	const [endTime,setEndTime] = React.useState("23:00")
	useEffect(() => setId(localStorage.getItem('_id')), []);

	function handleTime(e){
		var ts = new Date("2020-05-20T19:00:00+0700");
		var ts2 = new Date();
		const _time = "2020-05-20T19:00:00+0700";
		// console.log(ts.toLocaleTimeString());
		// console.log(ts.toLocaleDateString());
		// console.log(ts2.toLocaleTimeString());
		// console.log(ts2.toLocaleDateString());
		// console.log(ts2.toISOString());
		// console.log(ts2.toUTCString());
		// console.log(ts2.toJSON());
		console.log(ts2.toString());
		if(value.getMonth() == ts2.getMonth()){
			console.log(month[value.getMonth()])
			console.log("show")
			var time = ts2.toISOString()
			var result = ""
			for(var i=0;i<10;i++){
				result += time[i];
			}
			result += START_PRESET
			console.log(result)
		}

	}

	return (
		<Layout id={id}>
			<Grid container className={classes.root} spacing={2}>
				{/* --- Calendar section --- */}
        <Grid item xs={3}>
					<Paper className={classes.paper}>
						<div>
							<h2>Today : {/*day[today.getDay()]*/} {month[today.getMonth()]}  {today.getDate()}, {today.getFullYear()}</h2>
							<Calendar
								calendarType="US"
								onClickDay={()=>{
									console.log(value.getFullYear())
									console.log(value.getMonth())
									console.log(value)
								}}
								onActiveStartDateChange={({ activeStartDate, value, view }) => {
									console.log(activeStartDate)
									console.log(activeStartDate.getMonth())
									console.log(activeStartDate.getFullYear())
									setView_Month(activeStartDate.getMonth())
									setView_Year(activeStartDate.getFullYear())
									console.log(view_month)
									console.log(view_year)
									// console.log(value)
								}}
								onClick={(e)=>{
									console.log("testestett")
								}}
								onChange={onChange}
								value={value}
							/>
						</div>
						<div></div>
					</Paper>
        </Grid>

				{/* --- Month/Day section --- */}
				<Grid item xs={6}>
					<Paper className={classes.paper}>
						{/* --- Start of Header Section --- */}
						<Grid container spacing={5} className={classes.row}>
							<Grid item xs={4}>
								{/* <Autocomplete
									id="choose_display"
									options={[{title: `Month`}]}
									getOptionLabel={(option) => option.title}
									renderInput={(params) => <TextField {...params} label="Display options" variant="outlined" />}
								/> */}
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
									value= {month[view_month] +', '+ view_year} 
									disabled
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<DateRangeIcon />
											</InputAdornment>
										),
									}}
								/>
							</Grid>
						</Grid>
						{/* --- End of Header Section --- */}

						{ viewOption ? <MonthCard /> : <DayCard /> }
						<p>schedule section</p>
						<h3>Viewing month</h3>
						<p>Current viewing month : {month[view_month]}</p>
						<p>Current viewing year  : {view_year}</p>
					</Paper>
        </Grid>
				
				{/* --- Info section --- */}
				<Grid item xs={3}>
					<Paper className={classes.paper}>
						<p>info section</p>
						<h3>Seleted reservation info</h3>
						<p>Date  : {value.getDate()}</p>
						<p>Month : {month[value.getMonth()]} ==  {value.getMonth()+1}</p>
						<p>Year  : {value.getFullYear()}</p>
						<p>name  : {name}</p> 
						<p>start : {startTime}</p> 
						<p>end   : {endTime}</p>
						<Button variant="contained" onClick={handleTime}>console.log(break down time)</Button> 
						{/*  */}
						{/*  */}
						{/*  */}
					</Paper>
        </Grid>
      </Grid>
		</Layout>
	);
}