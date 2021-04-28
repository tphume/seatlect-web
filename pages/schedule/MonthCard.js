import React, { useState, useEffect } from 'react';
import Layout from 'src/components/layout';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DayCard from './DayCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    backgroundColor: `#E2C5E1`,
    margin: `10px`
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

// GET data
// initialDatas = data.reservations
const initialDatas = [
  {
    "name": "Mr.Bright",
    "start": "2020-05-20T19:00:00+0700",
    "end":   "2020-05-20T22:00:00+0700",
    "placement": {
      "width": 0,
      "height": 0,
      "seats": [
        {
          "name": "A1",
          "floor": 0,
          "type": "string",
          "space": 0,
          "user": "string",
          "status": "string",
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0,
          "rotation": 0
        },{
          "name": "A2",
          "floor": 0,
          "type": "string",
          "space": 0,
          "user": "string",
          "status": "string",
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0,
          "rotation": 0
        }
      ]
    }
  },
  {
    "name": "Mr.Pawaris",
    "start": "2020-05-21T19:40:00+0700",
    "end":   "2020-05-21T23:00:00+0700",
    "placement": {
      "width": 0,
      "height": 0,
      "seats": [
        {
          "name": "A2",
          "floor": 0,
          "type": "string",
          "space": 0,
          "user": "string",
          "status": "string",
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0,
          "rotation": 0
        }
      ]
    }
  },
  {
    "name": "Mr.Phume",
    "start": "2020-05-21T18:15:00+0700",
    "end":   "2020-05-21T23:00:00+0700",
    "placement": {
      "width": 0,
      "height": 0,
      "seats": [
        {
          "name": "A5",
          "floor": 0,
          "type": "string",
          "space": 0,
          "user": "string",
          "status": "string",
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0,
          "rotation": 0
        }
      ]
    }
  }
];

export default function MonthCard() {
	const classes = useStyles();
	const [id, setId] = useState('');
	const [reservations, setReservation] = useState(initialDatas);
	const today = new Date();
	const [view_month,setView_Month] = useState(today.getMonth());
	const [view_year,setView_Year] = useState(today.getFullYear());
  const [sidebarINFO, setSidebarInfo] = useState();
  
	useEffect(() => setId(localStorage.getItem('_id')), []);

	return (
		<Paper className={classes.paper}>
      {reservations.map((reservation,i)=>{
        return(
          <DayCard 
            key={i}
            name={reservation.name}
            start={reservation.start}
            end={reservation.end}
            seats={reservation.placement.seats}
            onSelect={()=>{
              setSidebarInfo()
              setSidebarInfo(reservation)
            }}
          />
        )
      })}
    </Paper>
	);
}