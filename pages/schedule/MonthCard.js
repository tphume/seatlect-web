import React, { useState, useEffect } from 'react';
import Layout from 'src/components/layout';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DayCard from './DayCard';
import DayCard2 from './DayCard2';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    backgroundColor: `#ffffff`,
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
    "start": "2020-05-20T11:00:00+0700",
    "end":   "2020-05-20T14:30:00+0700",
    "placement": {
      "width": 0,
      "height": 0,
      "seats": [
        {
          "name": "A3",
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
          "name": "A4",
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
    "name": "Mr.Gribio",
    "start": "2020-05-20T18:00:00+0700",
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
  var dict = {}

  for(var i=0;i<reservations.length;i++){
    try{
      var date = new Date(reservations[i].start)
      console.log(date.getDate())
      var num = date.getDate()
      var oldReservation = dict[num]
      if(oldReservation == undefined){
        throw(undefined)
      }
      oldReservation.push(reservations[i])
      console.log(oldReservation)
      // console.log(newReservation)
      dict[num] = oldReservation
    }catch(e){
      console.log(e)
      dict[num] = [reservations[i]]
    }
  }
  console.log(dict[20])
  console.log(dict[21])
  console.log(dict)
	useEffect(() => setId(localStorage.getItem('_id')), []);

	return (
		<div className={classes.paper}>
      {/* {reservations.map((reservation,i)=>{
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
      })} */}
      {Object.keys(dict).map((key, i)=>{
        return(
          <DayCard2 
            key={i}
            reservation={dict[key]}
          />
        )
      })}
    </div>
	);
}