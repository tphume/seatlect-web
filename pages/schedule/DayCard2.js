import React, { useState, useEffect } from 'react';
import Layout from 'src/components/layout';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import Time from './Time';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    backgroundColor: `#E2C5E1`,
    margin: `10px`,
    padding: `10px`,
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
  header:{
    margin: `5px 0px 5px 0px`,
  },
  headerArrow:{
    margin: `5px 15px -5px 0px`,
  },
  flex:{
    display:`flex`,
    justifyContent:`flex-end`,
  },
}));

export default function DayCard2({ reservation}) {
    const classes = useStyles();
    const [id, setId] = useState('');
    const [value, onChange] = useState(new Date());
    const today = new Date();
    const [view_month,setView_Month] = useState(today.getMonth());
    const [view_year,setView_Year] = useState(today.getFullYear());
    const [show,setShowStatus] = useState(true)
    const [showDetail,setShowDetailStatus] = useState(true)
    const [time,setTime] = useState(reservation)
    

    // console.log(reservation)
    var date = new Date(reservation[0].start)
    var dateSTR = date.toDateString()
    dateSTR = dateSTR.substring(4,)
    var dateList = dateSTR.split(' ')
    // console.log(dateList)
    useEffect(() => setId(localStorage.getItem('_id')), []);

    function showHandler(){
        if(show){
            setShowStatus(false)
        }else{
            setShowStatus(true)
        }
    }

    return (
      <Paper className={classes.paper}>
        <Grid onClick={showHandler} container spacing={2}>
          <Grid item xs={10}><h3 className={classes.header}>Date : {dateList[1]} {dateList[0]} {dateList[2]}</h3></Grid>
          <Grid item xs={2}>
            {show?
              <div className={classes.flex}><ArrowDropDownIcon className={classes.headerArrow}/></div>:
              <div className={classes.flex}><ArrowDropUpIcon className={classes.headerArrow}/></div>
            }
          </Grid>
        </Grid>
        {show ? reservation.map((time,i)=>{
          return(
            <Time 
              key={i}
              time = {time}
            />
          )
        }) : ''}
      </Paper>
    );
}