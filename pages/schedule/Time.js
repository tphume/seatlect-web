import React, { useState, useEffect } from 'react';
import Layout from 'src/components/layout';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    backgroundColor: `#F2D5F1`,
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

export default function DayCard2({ time}) {
  const classes = useStyles();
  // console.log(time)
  var dateStart = new Date(time.start)
  var dateEnd = new Date(time.end)
  var startTime = dateStart.getHours() + " : "+ dateStart.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
  var endTime = dateEnd.getHours() + " : "+ dateEnd.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
  var seat = time.placement.seats[0].name

  // console.log(dateStart)
  // console.log(dateEnd)
  var i;
  for (i = 1; i < time.placement.seats.length; i++) {
    seat += ", "+time.placement.seats[i].name
  }

  return (
    <Paper className={classes.paper}> 
      <p><b>Time: </b> {startTime}-{endTime}</p>
      <p><b>Reserved table :</b> {seat} </p >
    </Paper>
  );
}